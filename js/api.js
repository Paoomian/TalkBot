const BASE_URL = "https://study.duyiedu.com"
const TOKEN_KEY = "token"

const get = function (path) {
    let header = {}
    const token = localStorage.getItem(TOKEN_KEY)
    if (token) {
        header.Authorization = `Bearer ${token}`
    }
    return fetch(BASE_URL + path, {
        headers: header
    })
}

const post = function (path, bodyObj) {
    let header = { "Content-Type": "application/json" }
    const token = localStorage.getItem(TOKEN_KEY)
    if (token) {
        header.Authorization = `Bearer ${token}`
    }
    return fetch(BASE_URL + path, {
        headers: header,
        method: "POST",
        body: JSON.stringify(bodyObj)
    })
}

const login = async function (loginInfo) {
    const res = await post("/api/user/login", loginInfo)
    const result = await res.json()
    if (result.code === 0) {
        const token = res.headers.get("Authorization")
        localStorage.setItem(TOKEN_KEY, token)
    }
    return result
}

const reg = async function (userInfo) {
    const res = await post("/api/user/reg", userInfo)
    return await res.json()
}

const exists = async function (loginiId) {
    const res = await get("/api/user/exists?loginId=" + loginiId)
    return await res.json()
}

const profile = async function () {
    const res = await get("/api/user/profile")
    return await res.json()
}

const chat = async function (content) {
    const res = await post("/api/chat", { content })
    return await res.json()
}

const history = async function () {
    const res = await get("/api/chat/history")
    return await res.json()
}

const logOut = function () {
    localStorage.removeItem(TOKEN_KEY)
    return "注销成功"
}

