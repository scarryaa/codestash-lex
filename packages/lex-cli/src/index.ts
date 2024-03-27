import fs from 'fs';
import path from 'path';
import { Command } from 'commander';

const program = new Command();
program.version('1.0.0');

program
    .option('-o, --output <outputPath>', 'Output file path')
    .arguments('<lexiconDirectory>')
    .action((lexiconDirectory: string, options: { output: string }) => {
        const outputPath = options.output || 'output.ts';
        generateTypescriptFromLexicons(lexiconDirectory, outputPath);
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

function readDirectoryRecursive(directory: string, callback: (err: NodeJS.ErrnoException | null, files?: string[]) => void) {
    let files: string[] = [];
    fs.readdir(directory, { withFileTypes: true }, function (err, entries) {
        if (err) {
            callback(err);
            return;
        }
        entries.forEach((entry) => {
            const fullPath = path.join(directory, entry.name);
            if (entry.isDirectory()) {
                readDirectoryRecursive(fullPath, (err, subFiles) => {
                    if (err) {
                        callback(err);
                        return;
                    }
                    if (subFiles) {
                        files = files.concat(subFiles);
                    }
                });
            } else if (entry.isFile() && path.extname(entry.name) === '.json') {
                files.push(fullPath);
            }
        });
        callback(null, files);
    });
}

function writeTypescriptFile(outputPath: string, typescriptCode: string) {
    // Ensure that the directory structure exists
    const directory = path.dirname(outputPath);
    fs.mkdirSync(directory, { recursive: true });

    // Write the TypeScript code to the output file path
    fs.writeFileSync(outputPath, typescriptCode, 'utf-8');
}

export function generateTypescriptFromLexicons(lexiconDirectory: string, outputDir: string): void {
    // Read the directory recursively
    readDirectoryRecursive(lexiconDirectory, (err, lexiconFiles) => {
        if (err) {
            console.error('Error reading lexicon files:', err);
            return;
        }

        // Check if lexiconFiles is defined
        if (!lexiconFiles) {
            console.error('No lexicon files found.');
            return;
        }

        // Generate TypeScript code for each lexicon file
        lexiconFiles.forEach((lexiconFile) => {
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

function generateValidateTypeFunction(typeName: string, lexiconPath: string): string {
    const lexiconImport = "@codestash-lex/lexicon";
    const codeStashImport = "@codestash-lex/codestash";

    return `
import { ValidationResult } from '${lexiconImport}';
import { lexicons } from '${codeStashImport}';

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