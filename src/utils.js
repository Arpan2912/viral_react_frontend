const monthObj = {
  1: "Jan",
  2: "Feb",
  3: "Mar",
  4: "Apr",
  5: "May",
  6: "Jun",
  7: "Jul",
  8: "Aug",
  9: "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec"
}


export function formatDate(date) {
  date = new Date(date);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear().toString();
  year = getYearString(year);
  if (day < 10) {
    day = `0` + day
  }
  month = monthObj[month];
  return `${day} ${month}${year}`
}

function getYearString(year) {
  if (!year) {
    year = new Date().getFullYear().toString();
  }
  return "'" + year.slice(2);
}
