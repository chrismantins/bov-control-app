export const formIsValid = (formData: any) => {
  if (!formData) return false;
  console.log(formData);
  const invalidKeys = Object.keys(formData)
    .map((key) => !formData[key] && key)
    .filter((item) => !!item);

  return invalidKeys;
};

// const emptyKeys = Object.keys(obj)
//   .map((key) => (!obj[key] ? key : null))
//   .filter((key) => !!key);
// const isValid = Object.values(formData).every(
//   (value) => value && value != undefined && value != ''
// );
