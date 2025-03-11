import { TodoItem } from "./todoItem.js"; // ← Nota el ".js" en la importación

export class TodoCollection {
    private nextId: number = 1;
    private itemMap = new Map<number, TodoItem>();

    constructor(public userName: string, todoItems: TodoItem[] = []) {
        this.itemMap = new Map<number, TodoItem>();
        todoItems.forEach(item => this.itemMap.set(item.id, item));
    }

    markComplete(id: number): void {
        let item = this.itemMap.get(id);
        if (item) {
            item.complete = true; // Marca la tarea como completada
        }
    }

    addTodo(task: string): number {
        while (this.getTodoById(this.nextId)) {
            this.nextId++;
        }
        this.itemMap.set(this.nextId, new TodoItem(this.nextId, task));
        return this.nextId;
    }

    getTodoById(id: number): TodoItem | undefined {
        return this.itemMap.get(id);
    }

    getTodoItems(includeComplete: boolean): TodoItem[] {
        return [...this.itemMap.values()].filter(item => includeComplete || !item.complete);
    }

    getItemCounts(): { total: number; incomplete: number } {
        return {
            total: this.itemMap.size,
            incomplete: this.getTodoItems(false).length
        };
    }
}
