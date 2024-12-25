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
    removeItemByName(name: string): void {
        this.items = this.items.filter(item => item.name.toLowerCase() !== name.toLowerCase());
    }

    countItemsByCategory(): Record<string, number> {
        return this.items.reduce((acc, item) => {
            acc[item.category] = (acc[item.category] || 0) + item.quantity;
            return acc;
        }, {} as Record<string, number>);
    }
    
    addItem(name: string, quantity: number, category: string): void {
        if (this.items.some(item => item.name.toLowerCase() === name.toLowerCase())) {
            throw new Error('Item já existe na lista.');
        }
        const newItem: Item = {
            id: this.items.length + 1,
            name,
            quantity,
            category,
        };
        this.items.push(newItem);
    }
    

    exportAsCSV(): string {
        const headers = 'ID,Name,Quantity,Category\n';
        const rows = this.items.map(item => `${item.id},${item.name},${item.quantity},${item.category}`).join('\n');
        return headers + rows;
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
