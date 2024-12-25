import { Item } from '../models/Item';

export class ShoppingList {
    private items: Item[] = [];

    addItem(name: string, quantity: number, category: string): void {
        if (!name || quantity <= 0 || !category) {
            throw new Error('Nome, quantidade e categoria são obrigatórios, e a quantidade deve ser maior que 0.');
        }
        const newItem: Item = {
            id: this.items.length + 1,
            name,
            quantity,
            category,
        };
        this.items.push(newItem);
    }

    calculateTotalValue(prices: Record<string, number>): number {
        return this.items.reduce((total, item) => {
            const price = prices[item.name] || 0;
            return total + price * item.quantity;
        }, 0);
    }
    

    getItemById(id: number): Item | undefined {
        return this.items.find(item => item.id === id);
    }
    
    
    getList(): Item[] {
        return this.items;
    }

    removeItem(id: number): void {
        this.items = this.items.filter(item => item.id !== id);
    }

    updateItem(id: number, updatedFields: Partial<Item>): void {
        const item = this.items.find(item => item.id === id);
        if (item) {
            Object.assign(item, updatedFields);
        }
    }

    clearList(): void {
        this.items = [];
    }

    saveToJSON(): string {
        return JSON.stringify(this.items, null, 2);
    }

    loadFromJSON(json: string): void {
        try {
            const parsed = JSON.parse(json) as Item[];
            this.items = parsed.map(item => ({ ...item }));
        } catch (error) {
            console.error('Erro ao carregar JSON:', error);
        }
    }
}
