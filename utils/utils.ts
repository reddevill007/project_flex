export function removeTags(str: string): string {
  if (str === null || str === "") return "";
  else str = str.toString();

  return str.replace(/(<([^>]+)>)/gi, "");
}

export function getInitials(fullName?: string | null): string {
  if (!fullName) {
    return "";
  }

  const names = fullName.split(" ");

  if (names.length === 0) {
    return "";
  }

  const initials = names.map((name) => name.charAt(0).toUpperCase()).join("");

  return initials;
}

export const calculateMinuteRead = (text: string): number => {
  // Assuming an average reading speed of 200 words per minute
  const wordsPerMinute = 200;

  // Counting the number of words in the input text
  const wordCount = text.split(/\s+/).length;

  // Calculating the estimated minute read
  const minuteRead = Math.ceil(wordCount / wordsPerMinute);

  return minuteRead;
};
