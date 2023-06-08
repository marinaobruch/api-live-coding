import { addTodo, deleteTodo, getTodos } from "/api.js";
import { renderLoginComponent } from "/components/login-component.js";
import { formatDateToRu, formatDateToUs } from "/lib/formatDate/formatDate.js";
import { format } from "date-fns";


let tasks = [];
let token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";
token = null;

const getFetch = () => {
    return getTodos({ token })
        .then((responseData) => {
            tasks = responseData.todos;
            renderApp();
        });
};

// Функция рендер
const renderApp = () => {
    const appEl = document.getElementById("app");
    if (!token) {
        renderLoginComponent({
            appEl,
            setToken: (newToken) => {
                token = newToken;
            },
            getFetch,
        });
        return;
    }

    const tasksHtml = tasks
        .map((task) => {
            // Вызываем функцию format из date-fns, первый параметр — это дата, которую
            // хотим отформатировать, второй параметр — это строка: к какому формату
            // желаем привести дату. Обратите внимание MM — это номер месяца,
            // mm — это минуты
            const createDate = format(new Date(task.created_at), 'dd/MM/yyyy HH:mm');
            return `
            <li class="task">
              <p class="task-text">
                ${task.text} (Создал: ${task.user?.name ?? "Неизвестно"})
                <button data-id="${task.id
                }" class="button delete-button">Удалить</button>
              </p>
              <p><i>Задача создана: ${createDate}</i></p>
            </li>`;
        })
        .join("");

    const appHTML = `
                    <h1>Список задач</h1>
                    <ul class="tasks" id="list">
                    ${tasksHtml}
                        </ul>
                        <br />
                        <div class="form">
                            <h3 class="form-title">Форма добавления</h3>
                            <div class="form-row">
                                Что нужно сделать:
                                <input type="text" id="text-input" class="input" placeholder="Выпить кофе" />
                            </div>
                            <br />
                            <button class="button" id="add-button">Добавить</button>
                        </div>`

    appEl.innerHTML = appHTML;

    const addButton = document.getElementById("add-button");
    const listElement = document.getElementById("list");
    const textInputElement = document.getElementById("text-input");

    //Функция удаления задачи из списка задач
    const deleteButtons = document.querySelectorAll(".delete-button");

    for (const deleteButton of deleteButtons) {
        deleteButton.addEventListener("click", (event) => {
            event.stopPropagation();

            const id = deleteButton.dataset.id;

            return deleteTodo({ token, id })
                .then((responseData) => {
                    tasks = responseData.todos;
                    renderApp();
                    deleteButton.textContent = "Добавить";
                })
        });
    };

    // Добавление новой задачи в список
    addButton.addEventListener("click", () => {
        if (textInputElement.value === "") {
            return;
        }

        addButton.disabled = true;
        addButton.textContent = "Задача добавляется";

        addTodo({
            text: textInputElement.value,
            token
        })
            .then((response) => {
                addButton.textContent = "Элемент добавляется";
                return response;
            })
            .then(() => {
                return getFetch();
            })
            .then(() => {
                addButton.disabled = false;
                addButton.textContent = "Добавить";
                textInputElement.value = "";
            })
            .catch((error) => {
                addButton.disabled = false;
                addButton.textContent = "Добавить";
                alert("Something wrong, try later");
                console.warn(error);
            })
    });

}

renderApp();