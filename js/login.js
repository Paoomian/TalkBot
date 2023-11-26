const loginIdValidator = new FieldValidator("txtLoginId", async function (val) {
    if (val === "") {
        return "请填写账号"
    }
})

const passWordValidator = new FieldValidator("txtLoginPwd", function (val) {
    if (val === "") {
        return "请填写密码"
    }
})


const form = document.querySelector(".user-form")

form.onsubmit = async function (e) {
    e.preventDefault()

    const result = await FieldValidator.validateAll(
        loginIdValidator,
        passWordValidator
    )
    if (!result) {
        return
    }

    const formData = new FormData(form)
    const bodyObj = Object.fromEntries(formData.entries());

    const resp = await login(bodyObj)
    if (resp.code === 0) {
        location.href = "./index.html"
    } else {
        loginIdValidator.input.value = ""
        passWordValidator.input.value = ""
        loginIdValidator.p.innerText = "账号或密码错误"
    }

}