const monthsShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function DDMMMYYYY(time: Date | number) {
  if (typeof time === "number" || typeof time === "string")
    time = new Date(time);

  return `${time.getDate()} ${
    monthsShort[time.getMonth()]
  } ${time.getFullYear()}`;
}

export function DDMMMYYYYTwelveHr(time: Date | number) {
  if (typeof time === "number" || typeof time === "string")
    time = new Date(time);

  return `${time.getDate()} ${
    monthsShort[time.getMonth()]
  } ${time.getFullYear()} ${time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
}

export function MonthYYYY(time: Date | number) {
  if (typeof time === "number" || typeof time === "string")
    time = new Date(time);

  return `${monthsShort[time.getMonth()]} ${time.getFullYear()}`;
}
