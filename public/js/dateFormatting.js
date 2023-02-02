const zeroPad = (num, places) => String(num).padStart(places, '0');
const formatDate = (value) => {
    if(!value) return "";
    if(value instanceof Date){
        const year = value.getFullYear();
        const yearZ = zeroPad(year, 4);

        const month = value.getMonth() + 1;
        const monthZ = zeroPad(month, 2);

        const day = value.getDate();
        const dayZ = zeroPad(day, 2);

        const res = `${yearZ}-${monthZ}-${dayZ}`;
        return res;
    } else return value;
}
let fmt = {};
fmt.formatDate = formatDate;
module.exports = fmt;