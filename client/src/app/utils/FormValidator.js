export class FormValidator {
  constructor(selector, onSubmit, bookId = null) {
    this.form = document.querySelector(selector);
    this.inputsWithErrors = new Set();
    this.fields = {};
    this.bookId = bookId;

    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!this.hasErrors) {
        onSubmit(this.fields, e, bookId);
      }
    });
  }

  get hasErrors() {
    return this.inputsWithErrors.size > 0;
  }

  register(selector, check) {
    const inputField = this.form.querySelector(selector);
    const errorElement = inputField.nextElementSibling;
    const execute = (hideErrors) => {
      const { pass, errorMessage } = check(inputField.value, this.fields['password']);
      errorElement.textContent = hideErrors ? '' : errorMessage;
      hideErrors
        ? inputField.classList.remove('invalid')
        : inputField.classList.add('invalid');
      if (!pass) {
        this.inputsWithErrors.add(inputField);
        delete this.fields[inputField.name];
      } else {
        inputField.classList.remove('invalid');
        this.inputsWithErrors.delete(inputField);
        this.fields[inputField.name] = inputField.value;
      }
    };

    inputField.addEventListener('blur', () => execute());
    this.form.addEventListener('submit', () => execute());
    execute(true);
  }
}

export const validateLength = (value) => {
  if (!value.length) {
    return {
      pass: false,
      errorMessage: 'Field is required*',
    };
  }
  return {
    pass: true,
  };
};
export const validateRepeatPassword = (currValue, prevValue) => {
  if (currValue !== prevValue) {
    return {
      pass: false,
      errorMessage: 'Passwords doesn\'t match',
    };
  }
  return {
    pass: true,
  };
};

export default FormValidator;
