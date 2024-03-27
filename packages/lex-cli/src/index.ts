import fs from 'fs';
import path from 'path';
import { Command } from 'commander';
import glob from 'glob';

const program = new Command();
program.version('1.0.0');

program
    .option('-o, --output <outputPath>', 'Output file path')
    .arguments('<lexiconPattern>')
    .action((lexiconPattern: string, options: { output: string }) => {
        const outputPath = options.output || 'output.ts';
        generateTypescriptFromLexicons(lexiconPattern, outputPath);
    });

program.parse(process.argv);

function getPropType(propDef: any): string {
    if (propDef.type === 'array') {
        return `${getPropType(propDef.items)}[]`;
    } else if (propDef.type === 'object') {
        // For nested objects, return the nested interface name
        return Object.keys(propDef.properties)[0];
    } else if (propDef.type === 'integer') {
        return 'number'; // Convert "integer" type to "number" type
    } else {
        return propDef.type;
    }
}

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

            // Generate TypeScript code for each definition in the lexicon
            for (const typeName in lexicon.defs) {
                if (Object.prototype.hasOwnProperty.call(lexicon.defs, typeName)) {
                    const typeDefinition = lexicon.defs[typeName];
                    let typescriptCode = generateTypescriptForDefinition(typeName, typeDefinition);
                    typescriptCode += generateIsTypeFunction(typeName);
                    typescriptCode += generateValidateTypeFunction(typeName, lexiconFile); // Pass the lexicon file path
                    typescriptCode += generateUtilityFunctions(); // Generate utility functions

                    // Determine the output file path based on the relative path of the lexicon file
                    const relativePath = path.relative(process.cwd(), lexiconFile);
                    const outputFile = path.join(outputDir, relativePath.replace('.json', `.${typeName}.ts`));

                    // Write the TypeScript code to the output file
                    writeTypescriptFile(outputFile, typescriptCode);
                }
            }
        });
    });
}

// Function to generate TypeScript code for a definition
function generateTypescriptForDefinition(typeName: string, typeDefinition: any): string {
    let typescriptCode = `/**\n * Interface for ${typeName}\n */\n`;
    typescriptCode += `export interface ${typeName} {\n`;

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
 * Checks if the given value is of type ${typeName}.
 * @param v The value to check.
 * @returns True if the value is of type ${typeName}, false otherwise.
 */
export function is${typeName}(v: unknown): v is ${typeName} {
    return (
        isObj(v) &&
        hasProp(v, '$type') &&
        v.$type === 'app.bsky.actor.defs#${typeName.toLowerCase()}'
    );
}
\n`;
}

// Function to generate utility functions
function generateUtilityFunctions(): string {
    return `
/**
 * Checks if the given value is an object.
 * @param v The value to check.
 * @returns True if the value is an object, false otherwise.
 */
export function isObj(v: unknown): v is Record<string, unknown> {
    return typeof v === 'object' && v !== null;
}

/**
 * Checks if the given object has the specified property.
 * @param data The object to check.
 * @param prop The property to check for.
 * @returns True if the object has the property, false otherwise.
 */
export function hasProp<K extends PropertyKey>(data: object, prop: K): data is Record<K, unknown> {
    return prop in data;
}
\n`;
}

// Function to generate "validateType" function
function generateValidateTypeFunction(typeName: string, lexiconPath: string): string {
    const lexiconImport = "@codestash-lex/lexicon";

    return `
import { ValidationResult } from '${lexiconImport}';
import { isObj, hasProp } from '../../../../util';

/**
 * Validates the given value against the ${typeName} type.
 * @param v The value to validate.
 * @returns The validation result.
 */
export function validate${typeName}(v: unknown): ValidationResult {
    return lexicons.validate('app.bsky.actor.defs#${typeName.toLowerCase()}', v);
}
\n`;
}

// Function to write TypeScript code to a file
function writeTypescriptFile(outputPath: string, typescriptCode: string) {
    // Ensure that the directory structure exists
    const directory = path.dirname(outputPath);
    fs.mkdirSync(directory, { recursive: true });

    // Write the TypeScript code to the output file path
    fs.writeFileSync(outputPath, typescriptCode, 'utf-8');
}