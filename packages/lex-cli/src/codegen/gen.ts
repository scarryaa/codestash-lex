import fs from 'fs';

const parseLexicons = (lexiconPaths: string[]): any[] => {
    const lexicons: any = [];
    for (const lexiconPath of lexiconPaths) {
        const lexicon = JSON.parse(fs.readFileSync(lexiconPath, 'utf-8'));
        lexicons.push(lexicon);
    }
    return lexicons;
}

const generateTypescriptTypes = (lexicons: any[]): string => {
    let typescriptCode = '';
    for (const lexicon of lexicons) {
        const typeName = Object.keys(lexicon.defs)[0];
        const typeDefinition = lexicon.defs[typeName];
        typescriptCode += `export interface ${typeName} ${JSON.stringify(typeDefinition, null, 4)}\n\n`;
    }
    return typescriptCode;
}

const writeTypescriptFile = (outputPath: string, typescriptCode: string) => {
    fs.writeFileSync(outputPath, typescriptCode, 'utf-8');
}

export const generateTypescriptFromLexicons = (lexiconPaths: string[], outputPath: string): void => {
    const lexicons = parseLexicons(lexiconPaths);
    const typescriptCode = generateTypescriptTypes(lexicons);
    writeTypescriptFile(outputPath, typescriptCode);
}