export const ituEmailRegexCheck = (email) => {
  const regex = /^([a-zA-Z0-9_\-\.]+)@itu\.edu\.tr$/;
  return regex.test(email);
};
