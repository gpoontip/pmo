export function formatDate({ date, time, string }) {
  if (date instanceof Date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();

    if (month < 10) {
      month = '0' + month;
    }

    if (day < 10) {
      day = '0' + day;
    }

    if (time) {
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    }

    var options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    };

    if (string) {
      options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZoneName: 'short'
      };
    }
    // if (time) {
    //   options.hour = '2-digit';
    //   options.minute = '2-digit';
    // }

    return date.toLocaleDateString('en-CA', options);
  }
  return date;
}
