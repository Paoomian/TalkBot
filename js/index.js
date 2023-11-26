//判断是否登录 如果未登录返回到登录页面
(async function () {

    const resp = await profile()
    const user = resp.data
    if (!user) {
        alert("未登录或登录已过期,请重新登录")
        location.href = "./login.html"
        return
    }

    const doms = {
        aside: {
            nickname: document.querySelector("#nickname"),
            loginId: document.querySelector("#loginId")
        },
        closeBtn: document.querySelector(".iconfont.icon-close"),
        "chat-container": document.querySelector(".chat-container"),
        txtMsg: document.querySelector("#txtMsg")
    }

    function setUserInfo() {
        doms.aside.nickname.innerText = user.nickname,
            doms.aside.loginId.innerText = user.loginId
    }

    setUserInfo()

    const formDom = document.querySelector(".msg-container")

    formDom.addEventListener("submit", function (e) {
        e.preventDefault()
        sendChat()
    })

    doms.closeBtn.addEventListener("click", function () {
        logOut()
        location.href = "./login.html"
    })


    async function getHistory() {
        const historyArr = (await history()).data
        for (const iterator of historyArr) {
            addChat(iterator)
        }
        scrollBottom()
    }

    getHistory()

    function addChat(chatInfo) {
        const div = document.createElement("div")
        div.classList.add("chat-item")
        if (chatInfo.from) {
            div.classList.add("me")
        }
        const img = document.createElement("img")
        img.classList.add("chat-avatar")
        img.src = chatInfo.from ? "./asset/avatar.png" : "./asset/robot-avatar.jpg"
        const contentDiv = document.createElement("div")
        contentDiv.classList.add("chat-content")
        contentDiv.innerText = chatInfo.content
        const date = document.createElement("div")
        date.classList.add("chat-date")
        date.innerText = formDate(chatInfo.createdAt)

        div.appendChild(img)
        div.appendChild(contentDiv)
        div.appendChild(date)

        doms["chat-container"].appendChild(div)
    }

    function formDate(timestamp) {
        const date = new Date(timestamp)
        const year = date.getFullYear()
        const month = (date.getMonth() + 1).toString().padStart(2, "0")
        const day = date.getDate().toString().padStart(2, "0")
        const hour = date.getHours().toString().padStart(2, "0")
        const minute = date.getMinutes().toString().padStart(2, "0")
        return `${year}-${month}-${day} ${hour}:${minute}`
    }

    function scrollBottom() {
        doms["chat-container"].scrollTop = doms["chat-container"].scrollHeight
    }

    async function sendChat() {
        const msg = doms.txtMsg.value
        if (!msg) {
            return
        }
        addChat({
            from: user.nickname,
            content: msg,
            createdAt: Date.now()
        })
        doms.txtMsg.value = ""
        scrollBottom()
        const resp = await chat(msg)
        console.log(resp);
        addChat({
            from: null,
            createdAt: Date.now(),
            ...resp.data
        })
        scrollBottom()
    }



})()