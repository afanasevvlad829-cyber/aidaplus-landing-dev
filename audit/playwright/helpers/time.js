function pad(number) {
  return String(number).padStart(2, "0");
}

function toRunFolderTimestamp(date) {
  return [
    date.getFullYear(),
    "-",
    pad(date.getMonth() + 1),
    "-",
    pad(date.getDate()),
    "_",
    pad(date.getHours()),
    "-",
    pad(date.getMinutes()),
    "-",
    pad(date.getSeconds())
  ].join("");
}

function toIsoTimestamp(date) {
  return date.toISOString();
}

module.exports = {
  toRunFolderTimestamp,
  toIsoTimestamp
};
