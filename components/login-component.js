import { login } from "/api.js";

export function renderLoginComponent({ appEl, setToken, fetchAndRenderTasks }) {
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

    document.getElementById("login-button").addEventListener("click", () => {

        login({
            login: "admin",
            password: "admin",
        })
            .then((user) => {
                setToken(`Bearer ${user.user.token}`);
                fetchAndRenderTasks();
            });
    });
}