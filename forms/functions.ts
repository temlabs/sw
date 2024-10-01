export const validateEmail = (
  email: string
): [result: boolean, error: string] => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const result = emailRegex.test(email);
  const error = result ? "" : "Please enter a valid email";
  return [result, error];
};

export const validateUsername = (
  username: string
): [result: boolean, error: string] => {
  const result = username.length >= 3;
  const error = result
    ? ""
    : "Please enter a username longer than 3 characters";
  return [result, error];
};

export const validatePassword = (
  password: string
): [result: boolean, error: string] => {
  const result = password.length >= 8;
  const error = result
    ? ""
    : "Please enter a password longer than 8 characters";
  return [result, error];
};
