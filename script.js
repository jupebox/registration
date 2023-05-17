document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registration-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const errorDialog = document.getElementById('error-dialog');
    const successDialog = document.getElementById('success-dialog');
    const dialogOverlay = document.querySelector('.dialog__overlay');

    // this seems a little restrictive to me considering foreign languages, special characters, hyphenated names, etc, but don't want to mess with the requirements
    const validateName = name => /^[a-zA-Z]+$/.test(name);

    // Basic email validation, can be improved
    // emails come in so many formats though that it's usually better to just let people do what they want, imo /shrug
    const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // Password must contain at least 8 characters, one uppercase, one lowercase, one digit
    const validatePassword = password => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(password);

    const validateConfirmPassword = (confirmPassword) => {
        const password = passwordInput.value.trim();
        return confirmPassword === password;
    };

    const validations = [
        {
            input: nameInput,
            message: 'Please enter a valid name.',
            validate: validateName
        },
        {
            input: emailInput,
            message: 'Please enter a valid email address.',
            validate: validateEmail
        },
        {
            input: passwordInput,
            message: 'Please enter a valid password (at least 8 characters, one uppercase, one lowercase, one digit).',
            validate: validatePassword
        },
        {
            input: confirmPasswordInput,
            message: 'Passwords do not match.',
            validate: validateConfirmPassword
        }
    ];

    validations.forEach((validation) => {
        const { input, message, validate } = validation;
        input.addEventListener('blur', (e) => {
            input.classList.remove('form__input--valid');
            const { target } = e;
            const { value } = target;
            const trimmedValue = value.trim();
            if (trimmedValue) {
                if (validate(trimmedValue) && !input.classList.contains('form__input--valid')) {
                    input.classList.add('form__input--valid');
                } else {
                    showError(input, message);
                }
            }
        });

        input.addEventListener('keyup', (e) => {
            clearErrorMessage(input);
            const { target } = e;
            const { value } = target;
            const trimmedValue = value.trim();
            if (trimmedValue) {
                if (validate(trimmedValue)) {
                    input.classList.add('form__input--valid');
                }
            }
        });
    });

    document.querySelectorAll('.dialog__button').forEach((element) => {
        element.addEventListener('click', (e) => {
            e.target.parentElement.classList.remove('dialog--visible');
            dialogOverlay.classList.remove('dialog__overlay--visible');
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (form.classList.contains('form--processing')) {
            return;
        }
        clearErrorMessages();
        const errors = [];
        validations.forEach((validation) => {
            const { input, validate } = validation;
            const trimmedValue = input.value.trim();
            if (!trimmedValue || !validate(trimmedValue)) {
                errors.push(validation);
            }
        });

        if (errors.length > 0) {
            errors.forEach((error) => {
                const { input, message } = error;
                showError(input, message);
            });
            return;
        }

        // Form validation successful, do further processing or submit the form
        submitForm(e);
    });

    const submitForm = (e) => {
        form.classList.add('form--processing');
        // (A) GET FORM DATA
        const data = new FormData(e.currentTarget);
        // (B) FETCH
        fetch(e.currentTarget.action, { method: 'post', body: data })
            .then(res => res.text())
            .then(() => {
                form.classList.remove('form--processing');
                form.classList.add('form--submitted');
                dialogOverlay.classList.add('dialog__overlay--visible');
                successDialog.classList.add('dialog--visible');
            })
            .catch((err) => {
                form.classList.remove('form--processing');
                errorDialog.querySelector('.dialog__text').innerText = err.message;
                dialogOverlay.classList.add('dialog__overlay--visible');
                errorDialog.classList.add('dialog--visible');
            });

        // (C) PREVENT HTML FORM SUBMIT
        // not certain this does anything that e.preventDefault isn't already doing
        return false;
    };

    const showError = (input, message) => {
        if (input.classList.contains('form__input--error')) {
            return;
        }
        const formGroup = input.parentElement;
        const errorMessage = document.createElement('p');
        errorMessage.className = 'form__message form__message--error';
        errorMessage.innerText = message;
        errorMessage.setAttribute('for', input.id);
        errorMessage.id = `${input.id}-message`;
        formGroup.appendChild(errorMessage);
        input.classList.add('form__input--error');
    };

    const clearErrorMessage = (input) => {
        if (input.classList.contains('form__input--error')) {
            input.classList.remove('form__input--error');
            const children = Array.prototype.slice.call(input.parentElement.children);
            children.forEach((child) => {
                if (child.classList.contains('form__message--error')) {
                    input.parentElement.removeChild(child);
                }
            });
        }
    };

    const clearErrorMessages = () => {
        validations.forEach((validation) => {
            const { input } = validation;
            clearErrorMessage(input);
        });
    };
});
