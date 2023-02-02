function validationPatientForm() {

    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('surname');
    const phoneInput = document.getElementById('phoneNumber')

    const errorFirstName = document.getElementById('errorFirstName');
    const errorLastName = document.getElementById('errorLastName');
    const errorPhone = document.getElementById('errorPhoneNumber');
    const errorsSummary = document.getElementById('errorsSummary');

    //MP3
    const reqMessage = document.getElementById('errorMessage-required').innerText;
    const char2_30Message = document.getElementById('errorMessage-char2-30').innerText;
    const formatPhoneMessage = document.getElementById('errorMessage-number-format').innerText;
    const formErrorsMessage = document.getElementById('errorMessage-formErrors').innerText;
    

    resetErrors([firstNameInput, lastNameInput,phoneInput], [errorFirstName, errorLastName, errorPhone], errorsSummary);
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



    if (!checkRequired(phoneInput.value)) {
        valid = false;
        phoneInput.classList.add("error-input");
        errorPhone.innerText = reqMessage;
    } else if (!checkPhoneNumber(phoneInput.value)) {
        valid = false;
        phoneInput.classList.add('error-input');
        errorPhone.innerText = formatPhoneMessage;
    }

    if(!valid){
        errorsSummary.innerText = formErrorsMessage;
    }

    return valid;
}