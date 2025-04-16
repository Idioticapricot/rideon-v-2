export const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
};
export const getInitials = (name) => {
  if (!name) return "";  // Check for undefined or empty name

  const words = name.split(" ");
  return words.slice(0, 2).map(word => word[0].toUpperCase()).join('');
};
