(function () {

    let me = {};

    me.isEmail = function (value) {
        let regex = new RegExp('^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$');

        return regex.test(value);
    };

    me.isNumber = function (number) {
        let re = /^\d+$/;

        return re.test(number);

    }

    me.isNotEmpty = function (str) {
        return str;
    }

    window.validation = me;

}());