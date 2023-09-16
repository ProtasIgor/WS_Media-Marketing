(function () {

    let me = {};

    let __form = document.querySelector('.analysis__form');

    let closeFormButton = document.querySelector('.analysis__form-close-button');

    function onClose() {

        me.Close();

        closeFormButton.removeEventListener('click', onClose)
    }

    me.Open = function Open() {

        __form.classList.remove('is-hidden');

        if (closeFormButton) {
            closeFormButton.addEventListener('click', onClose)
        }
    }

    me.Close = function Close() {
        __form.classList.add('is-hidden');
    }

    me.isValid = function () {

        let requiredFields = document.
            querySelectorAll('[data-valid=required]');

        let email = document.
            querySelector('[data-email]').value;

        let number = document.
            querySelector('[data-number]').value;


        if (!me.isAllComplited(requiredFields)) {
            return;

        } else if (!validation.isEmail(email)) {
            return;

        }
        else if (!validation.isNumber(number)) {
            return;

        }

        return true;
    }

    me.isAllComplited = function (data) {
        let result = true;

        for (const item of data) {

            if (!validation.isNotEmpty(item.value)) {
                result = false;
                break;
            }
        }

        return result;
    }

    window.form = me;

}());