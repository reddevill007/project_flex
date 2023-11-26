export function removeTags(str: string): string {
  if (str === null || str === "") return "";
  else str = str.toString();

  return str.replace(/(<([^>]+)>)/gi, "");
}

export function getInitials(fullName?: string): string {
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
