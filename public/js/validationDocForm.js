function validationDocForm() {
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('surname');
    const salaryInput = document.getElementById('salary');
    const phoneInput = document.getElementById('phoneNumber');
    const passwordInput = document.getElementById('password');

    const errorFirstName = document.getElementById('errorFirstName');
    const errorLastName = document.getElementById('errorLastName');
    const errorSalary = document.getElementById('errorSalary');
    const errorPhone = document.getElementById('errorPhoneNumber');
    const errorPassword = document.getElementById('errorPassword');
    const errorsSummary = document.getElementById('errorsSummary');


    //MP3
    const reqMessage = document.getElementById('errorMessage-required').innerText;
    const char2_30Message = document.getElementById('errorMessage-char2-30').innerText;
    const formatPhoneMessage = document.getElementById('errorMessage-format-phone').innerText;
    const number2k_1kk = document.getElementById('errorMessage-number-value2k_1kk').innerText;
    const formatPasswordMessage = document.getElementById('errorMessage-password-format').innerText;
    const formErrorsMessage = document.getElementById('errorMessage-formErrors').innerText;



    resetErrors([firstNameInput, lastNameInput, salaryInput, phoneInput, passwordInput],
        [errorFirstName, errorLastName, errorSalary, errorPhone, errorPassword], errorsSummary);
    let valid = true;

    if (!checkRequired(firstNameInput.value)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = reqMessage;
    } else if (!checkTextLengthRange(firstNameInput.value, 2, 30)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = char2_30Message;
    }else if(!checkName(firstNameInput.value)){
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Invalid name";
    }


    if (!checkRequired(lastNameInput.value)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = reqMessage;
    } else if (!checkTextLengthRange(lastNameInput.value, 2, 30)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = char2_30Message;
    }else if(!checkName(firstNameInput.value)){
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = "Invalid name";
    }

    if(!checkRequired(salaryInput.value)){
        valid=false;
        salaryInput.classList.add("error-input");
        errorSalary.innerText = reqMessage;
    }
    else if(!checkNumberRange(salaryInput.value, 2000, 1_000_000)){
        valid = false;
        salaryInput.classList.add("error-input");
        errorSalary.innerText = number2k_1kk;
    }

    if (!checkRequired(phoneInput.value)) {
        valid = false;
        phoneInput.classList.add("error-input");
        errorPhone.innerText = reqMessage;
    } else if (!checkPhoneNumber(phoneInput.value)) {
        valid = false;
        phoneInput.classList.add('error-input');
        errorPhone.innerText = formatPhoneMessage;
    }

    if (!checkRequired(passwordInput.value)) {
        valid = false;
        passwordInput.classList.add("error-input");
        errorPassword.innerText = reqMessage;
    }
    else if(!checkTextLengthRange(passwordInput.value, 3, 12)){
        valid = false;
        passwordInput.classList.add("error-input");
        errorPassword.innerText = formatPasswordMessage;
    }

    if(!valid){
        errorsSummary.innerText = formErrorsMessage;
    }
    
    return valid;
}