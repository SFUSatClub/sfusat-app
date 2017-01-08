const monthNames = [
  "January", "February", "March",
  "April", "May", "June", "July",
  "August", "September", "October",
  "November", "December"
];

export default {
  
  formattedDateFromUTC(utcMS) {
    var date = new Date(utcMS);
    var monthIndex = date.getMonth();
    return `${monthNames[monthIndex]} ${date.getDate()}, ${date.getFullYear()}`;
  }, 

}

