
export const formattedDate = (date: Date): string => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  let minutesStr = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutesStr + ' ' + ampm;
  return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + strTime;
}

