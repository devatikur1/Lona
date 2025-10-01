export function passIsValid(password) {
  const rules = [
    {
      id: 1,
      message: "At least 8 characters",
      isValid: password.length >= 8,
    },
    {
      id: 2,
      message: "At least one uppercase letter",
      isValid: /[A-Z]/.test(password),
    },
    {
      id: 3,
      message: "At least one lowercase letter",
      isValid: /[a-z]/.test(password),
    },
    {
      id: 4,
      message: "At least one number",
      isValid: /[0-9]/.test(password),
    },
    {
      id: 5,
      message: "At least one special character",
      isValid: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    },
  ];

  const isValid = rules.every((rule) => rule.isValid);
  return { isValid };
}
