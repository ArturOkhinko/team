const { body } = require('express-validator')

const MAX_LENGTH_ALIAS = 20
function aliasValidation() {
    return body('alias')
        .custom(value => {
            if (!value) {
                return true
            }

            if (value.length <= MAX_LENGTH_ALIAS) {
                return true
            }
            throw new Error('Собственный alias должен быть не более 20 символов в длину')
        });
}

module.exports = aliasValidation()
