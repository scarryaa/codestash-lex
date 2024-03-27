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

let lexiconOutput = '';
let lexiconsDefs: string[] = []; // Array to store lexicon definitions
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
        jsonFiles.forEach((lexiconFile, index) => {
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

                    // Write the TypeScript code to the output file
                    writeTypescriptFile(outputFile, typescriptCode);

                    // Generate util.ts file after processing all lexicon files
                    const utilCode = generateUtilFile(typeName); // Pass the typeName
                    const utilFilePath = path.join(outputDir, '..', 'util.ts');
                    writeTypescriptFile(utilFilePath, utilCode);
                }
            }
        });

        // Generate lexicon file after processing all lexicon files
        generateLexiconFile(jsonFiles.map(lexiconFile => JSON.parse(fs.readFileSync(lexiconFile, 'utf-8'))), outputDir);
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

function generateLexiconFile(lexicons: any[], outputDir: string) {
    let schemaDicts: string[] = []; // Array to store individual schema dictionaries
    let processedIds: string[] = [];

    lexicons.forEach((lexicon, index) => {
        const lexiconId = lexicon.id.split('.').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
        const lexiconVer = lexicon.lexicon;
        const id: any = lexicon.id;

        if (!lexiconId || !lexiconVer || !id) {
            console.error(`Error: Missing or invalid id or version for lexicon in file`);
            return '';
        }

        // Add the ID to the processed IDs array
        processedIds.push(id);

        let schemaDict = `${index > 0 ? ',' : ''}\n${lexiconId}: {\n`;
        schemaDict += `  lexicon: ${lexiconVer},\n`;
        schemaDict += `  id: '${id}',\n`;
        schemaDict += `  defs: {\n`;

        for (const typeName in lexicon.defs) {
            if (Object.prototype.hasOwnProperty.call(lexicon.defs, typeName)) {
                const key = camelCase(typeName.replace(/\./g, '_'));
                schemaDict += `    ${key}: {\n`;
                schemaDict += `      type: 'object',\n`;
                schemaDict += `      required: ${JSON.stringify(lexicon.defs[typeName].required)},\n`;
                schemaDict += `      properties: {\n`;

                for (const propName in lexicon.defs[typeName].properties) {
                    if (Object.prototype.hasOwnProperty.call(lexicon.defs[typeName].properties, propName)) {
                        const camelPropName = camelCase(propName);
                        schemaDict += `        ${camelPropName}: ${JSON.stringify(lexicon.defs[typeName].properties[propName])},\n`;
                    }
                }

                schemaDict += `      },\n`;
                schemaDict += `    },\n`;
            }
        }
        schemaDict += `  }\n`;
        schemaDict += `}`;

        schemaDicts.push(schemaDict); // Append the schema dictionary to the array
    });

    const processedIdsFormatted = processedIds.map(id =>
        id
            .split('.')
            .map((part, index) => (index === 0 ? part : upperFirst(part)))
            .join('')
    );

    // Push all schema dictionaries to the lexiconsDefs array
    lexiconsDefs.push(...schemaDicts);
    console.log(processedIdsFormatted.join(','))

    // Construct the lexicon output from the combined schema dictionaries
    lexiconOutput = `import { LexiconDoc, Lexicons } from '@atproto/lexicon';
export const schemaDict = {\n${lexiconsDefs.join('\n')}};\n
export const schemas: LexiconDoc[] = Object.values(schemaDict) as LexiconDoc[];
export const lexicons: Lexicons = new Lexicons(schemas);
export const ids = {
${processedIdsFormatted.map((formattedId, index) => `    ${formattedId}: '${processedIds[index]}'`).join(',\n')}
};
`;

    // Write the lexicon output to a file
    const lexiconOutputPath = path.join(outputDir, '..', 'lexicons.ts');
    writeTypescriptFile(lexiconOutputPath, lexiconOutput);
}



