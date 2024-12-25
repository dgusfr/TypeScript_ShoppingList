import { saveToFile, loadFromFile } from '../src/utils/fileHandler';
import fs from 'fs';

jest.mock('fs');

describe('fileHandler', () => {
    it('deve salvar dados em um arquivo', () => {
        const data = '{"key": "value"}';
        saveToFile('./test.json', data);
        expect(fs.writeFileSync).toHaveBeenCalledWith('./test.json', data, 'utf-8');
    });

    it('deve carregar dados de um arquivo', () => {
        const data = '{"key": "value"}';
        (fs.readFileSync as jest.Mock).mockReturnValue(data);
        const result = loadFromFile('./test.json');
        expect(result).toBe(data);
    });
});
