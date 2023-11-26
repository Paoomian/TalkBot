//表单项通用验证

class FieldValidator {

    constructor(txtId, validatorFn) {
        this.input = document.querySelector(`#` + txtId)
        this.p = this.input.nextElementSibling
        this.validatorFn = validatorFn
        this.input.onblur = () => {
            this.validate()
        }
    }

    /**
     * 验证 成功返回 true 失败返回false
     */
    async validate() {
        const err = await this.validatorFn(this.input.value)
        if (err) {
            this.p.innerText = err
            return false
        } else {
            this.p.innerText = ""
            return true
        }
    }

    static async validateAll(...args) {
        const promises = args.map(p => p.validate())
        const res = await Promise.all(promises)
        return res.every(i => i)
    }

}



