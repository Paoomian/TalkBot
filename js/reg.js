
const loginIdValidator = new FieldValidator("txtLoginId", async function (val) {
    if (val === "") {
        return "请填写账号"
    }
    const resp = await exists(val)
    // console.log(resp);
    if (resp.data) {
        return " 账号已存在"
    }
})


const nickNameValidator = new FieldValidator("txtNickname", function (val) {
    if (val === "") {
        return "请填写昵称"
    }
})

const passWordValidator = new FieldValidator("txtLoginPwd", function (val) {
    if (val === "") {
        return "请填写密码"
    }
})

const passWordConfirmValidator = new FieldValidator("txtLoginPwdConfirm", function (val) {
    if (val === "") {
        return "请填写确认密码"
    }
    const pwd = passWordValidator.input.value
    if (val !== pwd) {
        return "确认密码与密码不一致，请重新填写"
    }
})

const form = document.querySelector(".user-form")

form.onsubmit = async function (e) {
    e.preventDefault()

    const result = await FieldValidator.validateAll(
        loginIdValidator,
        nickNameValidator,
        passWordValidator,
        passWordConfirmValidator
    )
    if (!result) {
        return
    }

    const formData = new FormData(form)
    const bodyObj = Object.fromEntries(formData.entries());

    const resp = await reg(bodyObj)
    if (resp.code === 0) {
        alert("注册成功,点击确认跳转到登录页!")
        location.href = "./login.html"
    }

}