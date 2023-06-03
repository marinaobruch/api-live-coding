import { loginUser } from "/api.js";

export function renderLoginComponent({ appEl, setToken, fetchAndRenderTasks }) {
    let isLogMode = true;

    const renderForm = () => {
        const appHTML = `
        <h1>Список задач</h1>
        <div class="form">
                <h3 class="form-title">Форма ${isLogMode ? "входа" : "регистрации"}</h3>
                <div class="form-row">
                ${isLogMode
                ? ""
                : `Имя
                    <input type="text" id="name-input" class="input" />
                    <br />`}
                Логин
                <input type="text" id="login-input" class="input" />
                <br />
                Пароль
                    <input type="password" id="password-input" class="input" />
            </div >
            <br />
            <button class="button" id="login-button">${isLogMode ? "Войти" : "Зарегистрироваться"}</button>
                <br />
                <br />
            <button class="button" id="reg-button">Перейти ${isLogMode ? "к регистрации" : "ко входу"}</button>
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

        document.getElementById("reg-button").addEventListener("click", () => {
            isLogMode = !isLogMode;
            renderForm();
        });
    }

    renderForm();

}