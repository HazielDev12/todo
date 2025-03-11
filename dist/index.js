import { TodoItem } from "./todoItem.js"; // ← Nota el ".js"
import { TodoCollection } from "./todoCollection.js";
let todos = [
    new TodoItem(1, "Comprar flores"),
    new TodoItem(2, "Comprar zapatos"),
    new TodoItem(3, "Recoger boletos"),
    new TodoItem(4, "Llamar a Joe", true)
];
let collection = new TodoCollection("Usuario", todos);
function updateDisplay() {
    let title = document.getElementById("title");
    let taskList = document.getElementById("task-list");
    if (title) {
        title.textContent = `${collection.userName} Todo List (${collection.getItemCounts().incomplete} tareas por hacer)`;
    }
    if (taskList) {
        taskList.innerHTML = "";
        collection.getTodoItems(true).forEach(item => {
            let li = document.createElement("li");
            li.textContent = `${item.id} - ${item.task}`;
            // Aplicar tachado si la tarea está completada
            if (item.complete) {
                li.style.textDecoration = "line-through"; // Tachado
                li.style.color = "gray"; // Opcional: color gris
            }
            let button = document.createElement("button");
            button.textContent = "Completar";
            button.onclick = () => {
                collection.markComplete(item.id);
                updateDisplay(); // Vuelve a renderizar la lista
            };
            li.appendChild(button);
            taskList.appendChild(li);
        });
    }
}
document.addEventListener("DOMContentLoaded", () => {
    updateDisplay();
    let addButton = document.getElementById("add-task");
    let newTaskInput = document.getElementById("new-task");
    addButton.addEventListener("click", () => {
        if (newTaskInput.value.trim() !== "") {
            collection.addTodo(newTaskInput.value);
            newTaskInput.value = "";
            updateDisplay();
        }
    });
});
