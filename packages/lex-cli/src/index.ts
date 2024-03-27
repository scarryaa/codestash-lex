import fs from 'fs';
import path from 'path';
import { Command } from 'commander';
import glob from 'glob';
import { camelCase, upperFirst } from 'lodash';

const program = new Command();
program.version('1.0.0');

program
    .option('-o, --output <outputPath>', 'Output directory path')
    .arguments('<lexiconPattern>')
    .action((lexiconPattern: string, options: { output: string }) => {
        const outputDir = options.output || 'output';
        generateTypescriptFromLexicons(lexiconPattern, outputDir);
    });

program.parse(process.argv);

function getPropType(propDef: any): string {
    if (propDef.type === 'array') {
        return `${getPropType(propDef.items)}[]`;
    } else if (propDef.type === 'object') {
        // For nested objects, return the nested interface name
        return upperFirst(camelCase(Object.keys(propDef.properties)[0]));
    } else if (propDef.type === 'integer') {
        return 'number'; // Convert "integer" type to "number" type
    } else {
        return propDef.type;
    }
}

let dir = '';
export function generateTypescriptFromLexicons(lexiconPattern: string, outputDir: string): void {
    // Find all JSON files matching the pattern
    glob(lexiconPattern, (err, lexiconFiles) => {
        if (err) {
            console.error('Error finding lexicon files:', err);
            return;
        }

        // Filter out directories from the list of files
        const jsonFiles = lexiconFiles.filter((file) => fs.statSync(file).isFile() && path.extname(file) === '.json');

        // Generate TypeScript code for each JSON file
        jsonFiles.forEach((lexiconFile) => {
            const lexicon = JSON.parse(fs.readFileSync(lexiconFile, 'utf-8'));

            // Get the relative directory path of the lexicon file
            const relativeDir = path.dirname(path.relative(process.cwd(), lexiconFile));

            // Remove the first directory name "lexicons"
            const [, ...remainingDirs] = relativeDir.split(path.sep);
            const newRelativeDir = remainingDirs.join(path.sep).replace('lexicons', 'types');

            // Generate TypeScript code for each definition in the lexicon
            for (const typeName in lexicon.defs) {
                if (Object.prototype.hasOwnProperty.call(lexicon.defs, typeName)) {
                    const typeDefinition = lexicon.defs[typeName];
                    let typescriptCode = generateTypescriptForDefinition(typeName, typeDefinition);
                    typescriptCode += generateIsTypeFunction(typeName);
                    typescriptCode += generateValidateTypeFunction(typeName); // Pass the lexicon file path

                    // Construct the output file path based on the directory structure
                    const outputFileDir = path.join(outputDir, newRelativeDir);
                    const outputFile = path.join(outputFileDir, `${typeName}.ts`);
                    dir = outputFileDir;

                    // Write the TypeScript code to the output file
                    writeTypescriptFile(outputFile, typescriptCode);

                    // Generate util.ts file after processing all lexicon files
                    const utilCode = generateUtilFile(typeName); // Pass the typeName
                    const utilFilePath = path.join(outputDir, '../', 'types', '..', 'util.ts');
                    writeTypescriptFile(utilFilePath, utilCode);
                }
            }

            const lexiconCode = generateLexiconFile(lexicon, lexiconFile, dir);
            const lexiconFilePath = path.join(outputDir, '../', 'types', '..', 'lexicons.ts');
            writeTypescriptFile(lexiconFilePath, lexiconCode);
        });
    });
}

// Function to generate TypeScript code for a definition
function generateTypescriptForDefinition(typeName: string, typeDefinition: any): string {
    let typescriptCode = `import { ValidationResult, BlobRef } from '@atproto/lexicon';
import { lexicons } from '../../../../lexicons';
import { isObj, hasProp } from '../../../../util';\n\n`;

    typescriptCode += `export interface ${makeFirstCharUpper(typeName)} {\n`;

    for (const [propName, propDef] of Object.entries(typeDefinition.properties)) {
        const propType = getPropType(propDef);
        const isRequired = typeDefinition.required.includes(propName);

        //@ts-ignore
        typescriptCode += `  ${propName}${isRequired ? '' : '?'}: ${propType}; // ${propDef.description}\n`;
    }

    typescriptCode += `}\n\n`;
    return typescriptCode;
}

function generateIsTypeFunction(typeName: string): string {
    return `
/**
 * Checks if the given value is of type ${makeFirstCharUpper(typeName)}.
 * @param v The value to check.
 * @returns True if the value is of type ${makeFirstCharUpper(typeName)}, false otherwise.
 */
export function is${makeFirstCharUpper(typeName)}(v: unknown): v is ${makeFirstCharUpper(typeName)} {
    return (
        isObj(v) &&
        hasProp(v, '$type') &&
        v.$type === 'app.bsky.actor.defs#${makeFirstCharUpper(typeName)}'
    );
}
\n`;
}

// Function to generate "validateType" function
function generateValidateTypeFunction(typeName: string): string {
    return `
/**
 * Validates the given value against the ${makeFirstCharUpper(typeName)} type.
 * @param v The value to validate.
 * @returns The validation result.
 */
export function validate${makeFirstCharUpper(typeName)}(v: unknown): ValidationResult {
    return lexicons.validate('app.bsky.actor.defs#${typeName}', v);
}
\n`;
}

function generateUtilFile(typeName: string): string {
    return `
export function isObj(v: unknown): v is Record<string, unknown> {
    return typeof v === 'object' && v !== null
}

export function hasProp<K extends PropertyKey>(
    data: object,
    prop: K,
): data is Record<K, unknown> {
    return prop in data
}
`
}

let lexiconIds: Record<string, string> = {};
function generateIndexFile(types: string[]): string {
    let exportStatements = types.map(type => `export * from './${path.basename(type, '.ts')}';`).join('\n');
    return exportStatements;
}

function generateLexiconFile(lexicon: any, lexiconFilePath: string, outputDir: string): string {
    let schemaDict = '';
    let lexiconId = lexicon.id.split('.').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
    lexiconIds[lexiconId] = lexicon.id; // Store lexicon ID in lexiconIds object

    let lexiconVer = lexicon.lexicon;
    let id = lexicon.id;
    if (!lexiconId || !lexiconVer || !id) {
        console.error(`Error: Missing or invalid id or version for lexicon in file: ${lexiconFilePath}`);
        return '';
    }

    schemaDict += `lexicon: ${lexiconVer},\n`;
    schemaDict += `id: '${id}',\n`;
    schemaDict += `defs: {\n`;

    const types: string[] = [];

    for (const typeName in lexicon.defs) {
        if (Object.prototype.hasOwnProperty.call(lexicon.defs, typeName)) {
            types.push(typeName);
            const key = camelCase(typeName.replace(/\./g, '_'));
            schemaDict += `${key}: {\n`;
            schemaDict += `  type: 'object',\n`;
            schemaDict += `  required: ${JSON.stringify(lexicon.defs[typeName].required)},\n`;
            schemaDict += `  properties: {\n`;

            for (const propName in lexicon.defs[typeName].properties) {
                if (Object.prototype.hasOwnProperty.call(lexicon.defs[typeName].properties, propName)) {
                    const camelPropName = camelCase(propName);
                    schemaDict += `    ${camelPropName}: ${JSON.stringify(lexicon.defs[typeName].properties[propName])},\n`;
                }
            }

            schemaDict += `  },\n`;
            schemaDict += `},\n`;
        }
    }
    schemaDict += `},\n`;

    const uppercasedLexiconId = makeFirstCharUpper(lexiconId); // Make the first character uppercase

    // Construct the output for export
    const output = `
import { LexiconDoc, Lexicons } from '@atproto/lexicon'

export const schemaDict = {
    ${uppercasedLexiconId}: {
        ${schemaDict}
    }
}

export const schemas: LexiconDoc[] = Object.values(schemaDict) as LexiconDoc[];
export const lexicons: Lexicons = new Lexicons(schemas);
export const ids = ${JSON.stringify(lexiconIds)};
`;

    // Write index.ts file
    const indexFilePath = path.join(outputDir, 'index.ts');
    writeTypescriptFile(indexFilePath, generateIndexFile(types));

    return output;
}

// Function to write TypeScript code to a file
function writeTypescriptFile(outputPath: string, typescriptCode: string) {
    // Ensure that the directory structure exists
    const directory = path.dirname(outputPath);
    fs.mkdirSync(directory, { recursive: true });

    // Write the TypeScript code to the output file path
    fs.writeFileSync(outputPath, typescriptCode, 'utf-8');
}

function makeFirstCharUpper(string: string) {
    return string[0].toUpperCase() + string.substring(1);
}
