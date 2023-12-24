export const richTextEditorModules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

export const categoryMap: Record<string, string> = {
  "web-development": "Web Development",
  "frontend-development": "Frontend Development",
  "backend-development": "Backend Development",
  "desktop-application-development": "Desktop Application Development",
  "mobile-app-development": "Mobile App Development",
  "cloud-computing": "Cloud Computing",
  "application-development": "Application Development",
  "full-stack-development": "Full Stack Development",
};

export const convertToTitleCase = (inputString: string): string => {
  const words = inputString.split("-");
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  const resultString = capitalizedWords.join(" ");
  return resultString;
};
