const DateUtilities = {
  formatDate: (date: Date) => {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    const year = date.getFullYear();

    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;

    return month + '/' + day + '/' + year;
  }
};

export default DateUtilities;