/**
 * Sets the value into the local storage with the specified key.
 * @param {string} key - The key to set the value in local storage.
 * @param {object} value - The value to be stored. Must be serializable to JSON.
 */
export const setLocalstorage = (key: string, value: object) => {
  localStorage.setItem(key, JSON.stringify(value));
};

/**
 * Retrieves the value from local storage associated with the specified key.
 * @param {string} key - The key to retrieve the value from local storage.
 * @returns {object | null} The retrieved value if it exists, otherwise null.
 */
export const getLocalstorage = (key: string) => {
  const data = localStorage.getItem(key);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch (err) {
    return data;
  }
};

/**
 * Converts a data URL to a Blob object.
 * @param {string} dataurl - The data URL to be converted.
 * @returns {Blob | null} The Blob object representing the data URL if conversion succeeds, otherwise null.
 */
export function dataURLtoBlob(dataurl: string) {
  var arr = dataurl.split(","),
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  let mime: string | undefined;
  if (arr[0] != null) {
    const matchResult = arr[0].match(/:(.*?);/);
    if (matchResult != null) {
      mime = matchResult[1];
    } else {
      return null;
    }
  } else {
    return null;
  }

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

/**
 * Formats the given date and time into a string with the specified format.
 * @param {Date} date - The date and time to be formatted.
 * @returns {string} The formatted date and time string.
 */
export const formatDateAndTime = (date: Date) => {
  return date
    .toLocaleString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .replace(",", "");
};
