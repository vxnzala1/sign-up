const submitBtn = document.querySelector('.submit-btn'),
      phone = document.querySelector('#phone'),
      password = document.querySelector('#user-password'),
      passwordConfirm = document.querySelector('#user-password-confirm'),
      email = document.querySelector('#mail'),
      errorDisplayers = document.getElementsByClassName('error'),
      inputFields = document.querySelectorAll('input'),
      cardContainer = document.querySelector('.card-container'),
      outroOverlay = document.querySelector('.outro-overlay');

let validCount = 0;

function onValidation(current, messageString, isValid) {
    current.textContent = messageString;
    isValid ? validCount++ : validCount--;
    validCount = Math.max(0, validCount); // Asegurar que el contador no sea negativo
}

inputFields.forEach((field, index) => {
    field.addEventListener('keyup', () => {
        const message = errorDisplayers[index];
        field.value !== "" ? onValidation(message, '', true) : onValidation(message, '*This field is Required', false);
    });
});

phone.addEventListener('keyup', () => {
    const message = errorDisplayers[3];
    /^\d+$/.test(phone.value) ? onValidation(message, '', true) : onValidation(message, '*Please enter valid number', false);
});

email.addEventListener('keyup', () => {
    const message = errorDisplayers[2];
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value) ? onValidation(message, '', true) : onValidation(message, '*Please provide a valid Email', false);
});

password.addEventListener('keyup', () => {
    const message = errorDisplayers[4];
    password.value.length >= 8 ? onValidation(message, '', true) :  onValidation(message, 'Password requires minimum 8 characters', false);
});

passwordConfirm.addEventListener('keyup', () => {
    const message = errorDisplayers[5];
    password.value === passwordConfirm.value ? onValidation(message, '', true) : onValidation(message, '*Password did not match', false);
});

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (validCount >= inputFields.length) {
        cardContainer.style.display = 'none';
        outroOverlay.classList.remove('disabled');
    } else {
        Array.from(errorDisplayers).forEach(displayer => displayer.textContent = '*This field is Required');
    }
});
