import { ShoppingList } from './services/ShoppingList';
import { saveToFile, loadFromFile } from './utils/fileHandler';

const list = new ShoppingList();

// Adicionando itens à lista
list.addItem('Arroz', 2, 'Alimentos');
list.addItem('Detergente', 1, 'Limpeza');
list.addItem('Café', 1, 'Alimentos');

// Imprimindo a lista
console.log('Lista de compras:', list.getList());

// Salvando em um arquivo JSON
const json = list.saveToJSON();
saveToFile('./shoppingList.json', json);

// Carregando do arquivo JSON
const loadedJson = loadFromFile('./shoppingList.json');
list.loadFromJSON(loadedJson);

// Imprimindo após carregar
console.log('Lista carregada do arquivo:', list.getList());
