// utils/helper.js

export const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
};

export function getInitials(name = "") {
  if (!name.trim()) return "U"; // U for Unknown

  return name
    .trim()
    .split(" ")
    .map((word) => word[0]?.toUpperCase() || "")
    .join("")
    .slice(0, 2); // Only take first 2 initials
}
