
export function validateEmailFormat(email) {
  if (!email) {
    return { isValid: false, message: "You must provide an email address." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, message: "Please enter a valid email address." };
  }

  return { isValid: true, message: "" };
}
