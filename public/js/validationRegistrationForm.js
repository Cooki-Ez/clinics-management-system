function validationRegistrationForm() {
    const dateReg = document.getElementById('registrationDate');
    const timeInput = document.getElementById('registrationTime');
    const doctorTaskInput = document.getElementById('doctorTask');
    const projectInput = document.getElementById('project_id');
    const doctorInput = document.getElementById('doctor_id');

    const errorDate = document.getElementById('errorDate');
    const errorTime = document.getElementById('errorTime');
    const errorDoctorTask = document.getElementById('errorDoctorTask');
    const errorProject = document.getElementById('errorProject');
    const errorDoctor = document.getElementById('errorDoctor');
    const errorsSummary = document.getElementById('errorsSummary')

    //MP3
    const reqMessage = document.getElementById('errorMessage-required').innerText;
    const formatDateMessage = document.getElementById('errorMessage-formatDate').innerText;
    const dateInPastError = document.getElementById('errorMessage-date-in-pastError').innerText
    const charError = document.getElementById('errorMessage-char2-30').innerText;
    const formErrorsMessage = document.getElementById('errorMessage-formErrors').innerText;
    const timeInPastError = document.getElementById('errorMessage-timeInPastError').innerText
    const nameFormatError = document.getElementById('errorMessage-nameFormatError').innerText;

    resetErrors([dateReg, timeInput, doctorTaskInput, projectInput, doctorInput], [errorDate, errorTime, errorDoctorTask, errorProject, errorDoctor], errorsSummary);


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



    if (!checkRequired(dateReg.value)) {
        valid = false;
        dateReg.classList.add('error-input');
        errorDate.innerText = formatDateMessage;
    } else if (!checkDate(dateReg.value)) {
        valid = false;
        dateReg.classList.add('error-input');
        errorDate.innerText = formatDateMessage;
    } else if(!checkDateIfAfter(dateReg.value, nowString)){
        valid = false;
        dateReg.classList.add('error-input');
        errorDate.innerText = dateInPastError;
    }

    if (!checkRequired(timeInput.value)) {
        valid = false;
        timeInput.classList.add('error-input');
        errorTime.innerText = reqMessage;
    }else if(!checkTimeIfBeforeNow(timeInput.value)){
        valid = false;
        timeInput.classList.add('error-input');
        errorTime.innerText = timeInPastError;
    }

    if (!checkRequired(doctorTaskInput.value)) {
        valid = false;
        doctorTaskInput.classList.add('error-input');
        errorDoctorTask.innerText = reqMessage;
    } else if (!checkTextLengthRange(doctorTaskInput.value, 2, 30)) {
        valid = false;
        doctorTaskInput.classList.add('error-input');
        errorDoctorTask.innerText = charError;
    } else if(!checkName(doctorTaskInput.value)){
        valid = false;
        doctorTaskInput.classList.add('error-input');
        errorDoctorTask.innerText = nameFormatError;
    }


    if (!checkRequired(projectInput.value) || (projectInput.value === '-1')) {
        valid = false;
        projectInput.classList.add('error-input');
        errorProject.innerText = reqMessage;
    }

    if (!checkRequired(doctorInput.value) || (doctorInput.value === '-1')) {
        valid = false;
        doctorInput.classList.add('error-input');
        errorDoctor.innerText = reqMessage;
    }

    if (!valid) {
        errorsSummary.innerText = formErrorsMessage;
    }

    return valid;
}