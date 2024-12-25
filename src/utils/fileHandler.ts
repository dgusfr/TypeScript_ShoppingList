import fs from 'fs';

export const saveToFile = (filePath: string, data: string): void => {
    fs.writeFileSync(filePath, data, 'utf-8');
};

export const loadFromFile = (filePath: string): string => {
    return fs.readFileSync(filePath, 'utf-8');
};
