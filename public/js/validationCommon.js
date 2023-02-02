function resetErrors(inputs, errorTexts) {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].classList.remove("error-input")
    }
    for (let i = 0; i < errorTexts.length; i++) {
        errorTexts[i].innerText = "";
    }
}

function checkRequired(value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    if (value === "") {
        return false;
    }
    return true;
}

function checkTextLengthRange(value, min, max) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    const length = value.length;
    if (length > max) {
        return false;
    }
    if (length < min) {
        return false;
    }
    return true;
}


function checkNumberRange(value, min, max) {
    value = parseFloat(value)
    if (value < min) return false;
    if (value > max) return false;
    return true;
}

function checkName(value) {
    const re = /^[a-zA-Z]+$/;
    return re.test(value);
}

function checkPhoneNumber(value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    const re = /^(\+\d{2} ?)?\d{3} ?\d{3} ?\d{3}$/;
    return re.test(value);
}


function checkDateIfAfter(value, compareTo) {
    if (!value) {
        return false;
    }
    if (!compareTo) {
        return false;
    }
    const pattern = /(\d{4})-(\d{2})-(\d{2})/;
    if (!pattern.test(value)) {
        return false;
    }
    const valueDate = new Date(value);
    const compareToDate = new Date(compareTo);

    if (valueDate.getTime() < compareToDate.getTime()) {
        return false;
    }
    return true;
}

function checkTimeIfBeforeNow(value){
    const inputTime = value.split(":");
    const inputHours = parseInt(inputTime[0]);
    const inputMinutes = parseInt(inputTime[1]);
    const now = new Date();
    const nowHours = now.getHours();
    const nowMinutes = now.getMinutes();
    if (inputHours < nowHours || (inputHours == nowHours && inputMinutes < nowMinutes)) {
        return false;
    }
    return true;
}

function checkTime(from, to) {
    if (from > to) return false;
    return true;
}

function checkDate(value) {
        if (!value) {
            return false;
        }
    const pattern = /(\d{4})-(\d{2})-(\d{2})/;
    return pattern.test(value);
}


