function validationProjectForm() {
    const dateStartInput = document.getElementById('dateStart');
    const dateEndInput = document.getElementById('dateEnd');
    const nameInput = document.getElementById('name');
    const mainTask = document.getElementById('mainTask');


    const errorDateStart = document.getElementById("errorDateStart");
    const errorDateEnd = document.getElementById("errorDateEnd");
    const errorName = document.getElementById("errorProjectName");
    const errorMainTask = document.getElementById("errorMainTask");
    const errorsSummary = document.getElementById("errorsSummary");

    //MP3
    const reqMessage = document.getElementById('errorMessage-required').innerText;
    const formatDateMessage = document.getElementById('errorMessage-formatDate').innerText;
    const dateInPastError = document.getElementById('errorMessage-date-in-past').innerText;
    const charError = document.getElementById('errorMessage-char2-30').innerText;
    const formErrorsMessage = document.getElementById('errorMessage-formErrors').innerText;


    resetErrors([dateStartInput, dateEndInput, nameInput, mainTask], [errorDateStart, errorDateEnd, errorName, errorMainTask], errorsSummary);


    let valid = true;
    let nowDate = new Date(),
        month = '' + (nowDate.getMonth() + 1),
        day = '' + nowDate.getDate(),
        year = '' + nowDate.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    const nowString = [year, month, day].join('-');


    if (!checkRequired(dateStartInput.value)) {
        valid = false;
        dateStartInput.classList.add('error-input');
        errorDateStart.innerText = formatDateMessage;
    } else if (!checkDate(dateStartInput.value)) {
        valid = false;
        dateStartInput.classList.add('error-input');
        errorDateStart.innerText = formatDateMessage;
    }else if(!checkDateIfAfter(dateStartInput.value, nowString)){
        valid = false;
        dateStartInput.classList.add('error-input');
        errorDateStart.innerText = dateInPastError;
    }

    if (!checkDate(dateEndInput.value)) {
        valid = false;
        dateEndInput.classList.add('error-input');
        errorDateEnd.innerText = formatDateMessage;
    } else if (!checkDateIfAfter(dateEndInput.value,dateStartInput.value)){
        valid = false;
        dateEndInput.classList.add('error-input');
        errorDateEnd.innerText = dateInPastError;
    }

        if (!checkRequired(nameInput.value)) {
            valid = false;
            nameInput.classList.add('error-input');
            errorName.innerText = reqMessage;
        } else if (!checkTextLengthRange(nameInput.value, 2, 30)) {
            valid = false;
            nameInput.classList.add('error-input');
            errorName.innerText = charError;
        }

    if (!checkRequired(mainTask.value)) {

        valid = false;
        mainTask.classList.add('error-input');
        errorMainTask.innerText = reqMessage;
    } else if (!checkTextLengthRange(mainTask.value, 2, 30)) {
        valid = false;
        mainTask.classList.add('error-input');
        errorMainTask.innerText = charError;
    }

    if (!valid) {
        errorsSummary.innerText = formErrorsMessage;
    }

    return valid;
}
