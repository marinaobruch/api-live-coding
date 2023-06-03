import { loginUser } from "/api.js";

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
                <input type="password" id="password-input" class="input" />
            </div>
            <br />
            <button class="button" id="login-button">Войти</button>
        </div >`;

    appEl.innerHTML = appHTML;

    document.getElementById("login-button").addEventListener("click", () => {

        const login = document.getElementById("login-input").value;
        const password = document.getElementById("password-input").value;

        if (!login) {
            alert("Введите логин");
            return;
        }

        if (!password) {
            alert("Введите пароль");
            return;
        }

        loginUser({
            login: login,
            password: password,
        })
            .then((user) => {
                setToken(`Bearer ${user.user.token}`);
                fetchAndRenderTasks();
            })
            .catch((error) => {
                alert(error.message);
            });
    });
}