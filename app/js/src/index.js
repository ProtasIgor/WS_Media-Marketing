
(function () {

    /* FORMS HIDDEN */

    let openFormButton = document.querySelector('.analysis__button');

    if (openFormButton) {
        openFormButton.addEventListener('click', () => {

            form.Open();
        });
    }

    /* FORMS VALIDATION */

    let __form = document.querySelector('.analysis__form');

    if (__form) {

        __form.addEventListener('submit', (e) => {

            e.preventDefault();

            if (form.isValid()) {
                console.log('OK');
            } else {
                console.log('NE OK');
            }

        });
    }

    (function () {
        let anchors = document.querySelectorAll('.header__link');

        let sectionConsultation = document.querySelector('.analysis');

        let buttonToConsultatoins = [
            document.querySelector('.header__button'),
            document.querySelector('.header__content-button')
        ];

        let sections = [
            document.querySelector('.header'),
            document.querySelector('.about'),
            document.querySelector('.approach'),
            document.querySelector('.work')
        ];

        let options = { behavior: 'smooth' };

        for (let index = 0; index < anchors.length; index++) {
            const element = anchors[index];
            element.addEventListener('click', () => {
                sections[index].scrollIntoView(options);
            })
        }

        for (let index = 0; index < buttonToConsultatoins.length; index++) {
            const element = buttonToConsultatoins[index];
            element.addEventListener('click', () => {
                sectionConsultation.scrollIntoView(options);
            })
        }
    }());

}());