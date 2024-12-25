import { ShoppingList } from '../src/services/ShoppingList';

describe('ShoppingList', () => {
    let list: ShoppingList;

    beforeEach(() => {
        list = new ShoppingList();
    });

    it('deve adicionar itens à lista', () => {
        list.addItem('Arroz', 2, 'Alimentos');
        expect(list.getList()).toHaveLength(1);
    });

    it('deve remover itens da lista', () => {
        list.addItem('Arroz', 2, 'Alimentos');
        list.removeItem(1);
        expect(list.getList()).toHaveLength(0);
    });

    it('deve atualizar itens da lista', () => {
        list.addItem('Arroz', 2, 'Alimentos');
        list.updateItem(1, { quantity: 5 });
        expect(list.getList()[0].quantity).toBe(5);
    });
});
