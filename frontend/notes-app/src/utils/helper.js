export const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
};
export const getInitials = (name) => {
  const words = name.split(" ");
  let intials = "";
  for (let i = 0; i < Math.min(words.length, 2); i++) {
    intials += words[i][0];
  }
  return intials.toLocaleUpperCase();
};
