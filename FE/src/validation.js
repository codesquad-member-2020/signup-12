const id = /^[a-z0-9_-]{5,20}$/;
const password = {
  LENGTH: /^\s*(?:\S\s*){8,16}/,
  UPPERCASE : /^(?=.*[A-Z])/,
  NUMBER: /^(?=.*[0-9])/,
  SPECIALCHARACTERS: /^(?=.*[!@#$%^*+=-])/
}
const email = /^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/;
const phone = /^010[0-9]{7,8}$/;

const regExp = {
  id,
  password,
  email,
  phone
}

const isValid = (inputStr, reg) => new RegExp(reg).test(inputStr);


export {regExp, isValid};
