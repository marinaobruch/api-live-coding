
// Дефолтные данные
let tasks = [];
let token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";
token = null;

const host = "https://webdev-hw-api.vercel.app/api/v2/todos";

const fetchAndRenderTasks = () => {
    return fetch(host, {
        method: "GET",
        headers: {
            Authorization: token,
        }
    })
        .then((response) => {
            if (response.status === 401) {
                // token = prompt("Введите верный пароль");
                // fetchAndRenderTasks();
                throw new Error("Нет авторизации");
            }
            return response.json();
        })
        .then((responseData) => {
            tasks = responseData.todos;
            renderApp();
        })
}

// Функция рендер
const renderApp = () => {
    const appEl = document.getElementById("app");
    if (!token) {
        const appHTML = `
        <h1>Список задач</h1>
        <div class="form">
                <h3 class="form-title">Форма входа</h3>
                <div class="form-row">
                    Логин
                    <input type="text" id="login-input" class="input" />
                </div>
                <div class="form-row">
                    Пароль
                    <input type="text" id="login-input" class="input" />
                </div>
                <br />
                <button class="button" id="login-button">Войти</button>
            </div >`;

        appEl.innerHTML = appHTML;

        document
            .getElementById("login-button")
            .addEventListener("click", () => {
                token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";
                fetchAndRenderTasks();
            })

        return;
    }


    const tasksHtml = tasks
        .map((task) => {
            return `<li class="task">
    <p class="task-text">
      ${task.text
                    .replaceAll("&", "&amp;")
                    .replaceAll("<", "&lt;")
                    .replaceAll(">", "&gt;")
                    .replaceAll('"', "&quot;")}
      <button data-id="${task.id}" class="button delete-button">Удалить</button>
    </p>
  </li>`;
        }).join("");

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

    const buttonElement = document.getElementById("add-button");
    const listElement = document.getElementById("list");
    const textInputElement = document.getElementById("text-input");

    //Функция удаления задачи из списка задач
    const deleteButtons = document.querySelectorAll(".delete-button");

    for (const deleteButton of deleteButtons) {
        deleteButton.addEventListener("click", (event) => {
            event.stopPropagation();

            const id = deleteButton.dataset.id;

            fetch("https://webdev-hw-api.vercel.app/api/todos/" + id, {
                method: "DELETE",
                headers: {
                    Authorization: token,
                }
            })
                .then((response) => {
                    return response.json()
                })
                .then((responseData) => {
                    tasks = responseData.todos;
                    renderApp();
                    deleteButton.textContent = "Добавить";
                })
        });
    };

    // Добавление новой задачи в список
    buttonElement.addEventListener("click", () => {
        if (textInputElement.value === "") {
            return;
        }

        buttonElement.disabled = true;
        buttonElement.textContent = "Задача добавляется";

        // С помощью функции при ошибке сервера мы перезапустим отправку сообщения в цепочке catch
        fetch(host, {
            method: "POST",
            body: JSON.stringify({
                text: textInputElement.value,
            }),
            headers: {
                Authorization: token,
            }
        })
            .then((response) => {
                if (response.status === 201) {
                    return response.json();
                } else if (response.status === 400) {
                    alert("Задачу 'ничего' создать нельзя, займитесь чем-нибудь полезным");
                }
                else {
                    // Код, который обработает ошибку
                    throw new Error("Сервер упал");
                    // return Promise.reject(new Error("Сервер упал"));
                }
            })
            .then((response) => {
                buttonElement.textContent = "Элемент добавляется";
                return response;
            })
            .then(() => {
                return fetchAndRenderTasks();
            })
            .then(() => {
                buttonElement.disabled = false;
                buttonElement.textContent = "Добавить";
                textInputElement.value = "";
            })
            .catch((error) => {
                buttonElement.disabled = false;
                buttonElement.textContent = "Добавить";
                alert("Something wrong, try later");
                console.warn(error);
            })

        renderApp();
    });

}

// fetchAndRenderTasks();
renderApp();



// Доп задачи с урока

// // Таймер при клике на заголовок
// const pageTitleEl = document.getElementById("page-title");
// pageTitleEl.addEventListener("click", () => {
//     pageTitleEl.textContent = "3";
//     setTimeout(() => {
//         pageTitleEl.textContent = "2";
//         setTimeout(() => {
//             pageTitleEl.textContent = "1";
//             setTimeout(() => {
//                 pageTitleEl.textContent = "Список задач";
//             }, 1000);
//         }, 1000);
//     }, 1000);
// });


// // Добавление заливки на фон из API

// const fetchPromiseColor = () => {
//     return fetch('https://webdev-hw-api.vercel.app/api/tasks/random-red', {
//         method: "GET"
//     })
//         .then((responseColor) => {
//             return responseColor.json();
//         })
//         .then((responseDataColor) => {
//             newColor = responseDataColor.color;
//             console.log(newColor);
//             document.body.style.background = newColor;
//         })
// };

// fetchPromiseColor();

// Преобразование строки в JSON

// JSON — это текстовый формат представления данных. 
// // Мы можем превращать JavaScript-объекты в JSON-строчки, и, наоборот.
// // Представлять данные в виде текстовых строк нам нужно, чтобы передавать эти данные по сети.
// const obj = {
//     name: "asd",
//     list: [{ id: 1 }, { id: 2 }],
// };

// // С помощью встроенного в JS объекта JSON мы можем превращать объекты в JSON и JSON в объекты:
// const jsonObj = JSON.stringify(obj);
// console.log(jsonObj);

// const objFromJson = JSON.parse(jsonObj);
// console.log(objFromJson);