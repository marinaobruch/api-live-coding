const host = "https://webdev-hw-api.vercel.app/api/v2/todos";

export function getTodos({ token }) {
    return fetch(host, {
        method: "GET",
        headers: {
            Authorization: token,
        },
    })
        .then((response) => {
            if (response.status === 401) {
                throw new Error("Нет авторизации");
            }
            return response.json();
        });
}

export function deleteTodo({ token, id }) {
    return fetch("https://webdev-hw-api.vercel.app/api/todos/" + id, {
        method: "DELETE",
        headers: {
            Authorization: token,
        }
    })
        .then((response) => {
            return response.json()
        })
}


export function addTodo({ text, token }) {
    return fetch(host, {
        method: "POST",
        body: JSON.stringify({
            text,
        }),
        headers: {
            Authorization: token,
        },
    })
        .then((response) => {
            if (response.status === 201) {
                return response.json();
            }
            else {
                // Код, который обработает ошибку
                throw new Error("Сервер упал");
                // return Promise.reject(new Error("Сервер упал"));
            }
        });
}

export function loginUser({ login, password }) {
    return fetch("https://wedev-api.sky.pro/api/user/login", {
        method: "POST",
        body: JSON.stringify({
            login,
            password,
        }),
    })
        .then((response) => {
            if (response.status === 201) {
                return response.json();
            }
            else {
                throw new Error("Неверный логин или пароль");
            }
        });
}

export function registerUser({ login, password, name }) {
    return fetch("https://wedev-api.sky.pro/api/user", {
        method: "POST",
        body: JSON.stringify({
            login,
            password,
            name,
        }),
    })
        .then((response) => {
            if (response.status === 201) {
                return response.json();
            }
            else {
                throw new Error("Такой пользователь уже существует");
            }
        });
}
