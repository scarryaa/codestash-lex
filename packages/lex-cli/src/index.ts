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

function generateTypescriptFromLexicons(lexiconPattern: string, outputDir: string): void {
    const processedFiles: string[] = [];

    glob(lexiconPattern, (err, lexiconFiles) => {
        if (err) {
            console.error('Error finding lexicon files:', err);
            return;
        }

        const jsonFiles = lexiconFiles.filter((file) => fs.statSync(file).isFile() && path.extname(file) === '.json');
        let jsonFilePath: string = '';
        let combinedTypescriptCode = '';
        let importsAppended = false;

        jsonFiles.forEach((lexiconFile, index) => {
            const splitPaths = jsonFiles[index].split('/');
            jsonFilePath = splitPaths.slice(3, splitPaths.length - 1).join('/');
            const lexicon = JSON.parse(fs.readFileSync(lexiconFile, 'utf-8'));

            if (!importsAppended) {
                combinedTypescriptCode += getImportStatements();
                importsAppended = true;
            }

            for (const typeName in lexicon.defs) {
                if (Object.prototype.hasOwnProperty.call(lexicon.defs, typeName)) {
                    combinedTypescriptCode += generateTypescriptForDefinition(typeName, lexicon.defs[typeName]);
                    combinedTypescriptCode += generateValidationFunctions(typeName);
                }
            }

            const relativePath = path.join(jsonFilePath, 'defs');
            processedFiles.push(relativePath)
        });

        const parentDir = path.dirname(outputDir);
        writeTypescriptFile(path.join(outputDir, `${jsonFilePath}`, 'defs.ts'), combinedTypescriptCode);
        writeTypescriptFile(path.join(parentDir, 'index.ts'), generateIndexFile(processedFiles));
        writeTypescriptFile(path.join(outputDir, '..', 'util.ts'), generateUtilFile());
        generateLexiconFile(jsonFiles.map(lexiconFile => JSON.parse(fs.readFileSync(lexiconFile, 'utf-8'))), outputDir);
    });
}

function getImportStatements(): string {
    return `import { ValidationResult, BlobRef } from '@atproto/lexicon';
import { lexicons } from '../../../../lexicons';
import { isObj, hasProp } from '../../../../util';\n\n`;
}

function generateTypescriptForDefinition(typeName: string, typeDefinition: any): string {
    let typescriptCode = `export interface ${makeFirstCharUpper(typeName)} {\n`;

    for (const [propName, propDef] of Object.entries(typeDefinition.properties)) {
        const propType = getPropType(propDef);
        const isRequired = typeDefinition.required.includes(propName);
        // @ts-ignore
        typescriptCode += `  ${propName}${isRequired ? '' : '?'}: ${propType}; ${propDef.description ? `// ${propDef.description}` : ''}\n`;
    }

    typescriptCode += `}\n`;
    return typescriptCode;
}

function getPropType(propDef: any): string {
    if (propDef.type === 'array') {
        return `${getPropType(propDef.items)}[]`;
    } else if (propDef.type === 'object') {
        return upperFirst(camelCase(Object.keys(propDef.properties)[0]));
    } else if (propDef.type === 'integer') {
        return 'number';
    } else {
        return propDef.type;
    }
}

function generateUtilFile(): string {
    return `export function isObj(v: unknown): v is Record<string, unknown> {
    return typeof v === 'object' && v !== null
}

export function hasProp<K extends PropertyKey>(
    data: object,
    prop: K,
): data is Record<K, unknown> {
    return prop in data
}
`;
}

function makeFirstCharUpper(string: string) {
    return string[0].toUpperCase() + string.substring(1);
}

function writeTypescriptFile(outputPath: string, typescriptCode: string) {
    const directory = path.dirname(outputPath);
    createDirectories(directory);

    const header = generatedCodeHeader();
    const codeWithHeader = `${header}\n\n${typescriptCode}`;
    fs.writeFileSync(outputPath, codeWithHeader, 'utf-8');
}

function createDirectories(directory: string) {
    const directories = directory.split(path.sep);
    let currentPath = '';

    directories.forEach((segment) => {
        currentPath = path.join(currentPath, segment);

        if (!fs.existsSync(currentPath)) {
            fs.mkdirSync(currentPath);
        }
    });
}

function generateLexiconFile(lexicons: any[], outputDir: string) {
    const schemaDicts: string[] = [];
    const processedIds: string[] = [];

    lexicons.forEach((lexicon, index) => {
        const lexiconId = lexicon.id.split('.').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
        const lexiconVer = lexicon.lexicon;
        const id: any = lexicon.id;

        if (!lexiconId || !lexiconVer || !id) {
            console.error(`Error: Missing or invalid id or version for lexicon in file`);
            return '';
        }

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

        schemaDicts.push(schemaDict);
    });

    const processedIdsFormatted = processedIds.map(id =>
        id
            .split('.')
            .map((part, index) => (index === 0 ? part : upperFirst(part)))
            .join('')
    );

    const lexiconOutput = `import { LexiconDoc, Lexicons } from '@atproto/lexicon';
export const schemaDict = {${schemaDicts.join('\n')}};\n
export const schemas: LexiconDoc[] = Object.values(schemaDict) as LexiconDoc[];
export const lexicons: Lexicons = new Lexicons(schemas);
export const ids = {
${processedIdsFormatted.map((formattedId, index) => `    ${formattedId}: '${processedIds[index]}'`).join(',\n')}
};
`;

    const lexiconOutputPath = path.join(outputDir, '..', 'lexicons.ts');
    writeTypescriptFile(lexiconOutputPath, lexiconOutput);
}

function generateValidationFunctions(name: string) {
    const code = `
export function is${upperFirst(name)}(v: unknown): v is ${upperFirst(name)} {
    return (
        isObj(v) &&
        hasProp(v, '$type') &&
        // @ts-ignore
        v.$type === 'app.bsky.actor.defs#${name}'
    )
}
    
export function validate${upperFirst(name)}(v: unknown): ValidationResult {
    return lexicons.validate('app.bsky.actor.defs#${name}', v)
}
`;

    return code;
}

function generatedCodeHeader(): string {
    return `/**
 * GENERATED CODE
 */`;
}

function generateIndexFile(processedFiles: string[]): string {
    const exportStatements = processedFiles.map(relativePath => {
        const moduleName = relativePath.split(/\/|\\/).map(part => upperFirst(part)).join('');
        const moduleNameWithoutBackslashes = moduleName.replace(/\\/g, '');
        return `import * as ${moduleNameWithoutBackslashes} from './types/${relativePath}'; \nexport * as ${moduleNameWithoutBackslashes} from './types/${relativePath}';`.replaceAll('\\', '/');
    });
    return exportStatements.join('\n');
}