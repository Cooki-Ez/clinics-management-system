function validationAppointmentForm() {
    const dateInput = document.getElementById('date');
    const timeToInput = document.getElementById('timeTo');
    const timeFromInput = document.getElementById('timeFrom');
    const doctorInput = document.getElementById('doctor_id');
    const patientInput = document.getElementById('patient_id');

    const errorDateInput = document.getElementById('errorDate');
    const errorTimeFromInput = document.getElementById('errorTimeFrom');
    const errorTimeToInput = document.getElementById('errorTimeTo');
    const errorDoctor = document.getElementById('errorDoctor');
    const errorPatient = document.getElementById('errorPatient');

    const errorsSummary = document.getElementById('errorsSummary');

    //MP3
    const reqMessage = document.getElementById('errorMessage-required').innerText;
    const formatDateMessage = document.getElementById('errorMessage-formatDate').innerText;
    const dateInPastMessage = document.getElementById('errorMessage-date-in-past').innerText;
    const timeFromLaterThanTimeToMessage = document.getElementById('errorMessage-time-from-later-than-time-to').innerText;
    const formErrorsMessage = document.getElementById('errorMessage-formErrors').innerText;


    resetErrors([dateInput, timeFromInput, timeToInput, doctorInput, patientInput], [errorDateInput, errorTimeFromInput, errorTimeToInput, errorDoctor, errorPatient], errorsSummary);

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

    if (!checkDate(dateInput.value)) {
        valid = false;
        dateInput.classList.add('error-input');
        errorDateInput.innerText = formatDateMessage;
    }else if (!checkDateIfAfter(dateInput.value,nowString)) {
        valid = false;
        dateInput.classList.add('error-input');
        errorDateInput.innerText = dateInPastMessage;
    }

    if (!checkRequired(timeFromInput.value)) {
        valid = false;
        timeFromInput.classList.add("input-error");
        errorTimeFromInput.innerText = reqMessage;
    }

    if (!checkRequired(timeToInput.value)) {
        valid = false;
        timeToInput.classList.add("input-error");
        errorTimeToInput.innerText = reqMessage;
    }

    if (!checkRequired(patientInput.value) || patientInput.value === "-1") {
        valid = false;
        patientInput.classList.add("input-error");
        errorPatient.innerText = reqMessage;
    }

    if (!checkRequired(doctorInput.value) || doctorInput.value === "-1") {
        valid = false;
        doctorInput.classList.add("input-error");
        errorDoctor.innerText = reqMessage;
    }
    // validate time from
    if (!checkRequired(timeFromInput.value)) {
        valid = false;
        timeFromInput.classList.add("error-input");
        errorTimeFromInput.innerText = reqMessage;
    }

    if (!checkRequired(timeToInput.value)) {
        valid = false;
        timeToInput.classList.add("error-input");
        errorTimeToInput.innerText = reqMessage;
    }

    //if the appointment from and to are correct, we check the order of the dates
    else if (checkTime(timeToInput.value, timeFromInput.value)) {
        valid = false;
        timeToInput.classList.add("error-input");
        errorTimeToInput.innerText = timeFromLaterThanTimeToMessage;
    }

    if (!valid) {
        errorsSummary.innerText = formErrorsMessage;
    }

    return valid;
}