import {regExp, isValid} from './validation.js';
import {validationMessage} from './constant.js';

const $ = (ele) => document.querySelector(ele);
const _Ele = {
  form: $('.form-wrap form'),
}

_Ele.form.addEventListener('focusin', (e) => {
  e.target.classList.add('focus');
})

_Ele.form.addEventListener('focusout', (e) => {
  e.target.classList.remove('focus');
  checkIDHandle(e);
  checkPWHandle(e);
  doubleCheckPWHandle(e);
  checkBirthHandle(e);
  checkEmailHandle(e);
  checkPhoneHandle(e);
});

_Ele.form.querySelector('.interest-tag').addEventListener('keyup', (e) => {
  if(e.keyCode !== 188) return;
  tag(e);
})

const errMSG = (selector, ...msg) => {
  const errEle = _Ele.form.querySelector(`${selector} .err-box`);
  errEle.innerText = msg[0];
  if(msg[1]) errEle.classList.add('check');
  else errEle.classList.remove('check');
};

const checkIDHandle = (e) => {
  if(e.target.className !== 'user-id') return;
  errMSG('.id', ...checkID(e.target.value));
}

const checkID = (inputId) => {
  if(!isValid(inputId, regExp.id)) return validationMessage.ID.UNAVAILABLE;

  //fetch 중복체크
  const req = requestDuplicateConfirmation('https://41c0715c-5aa1-4130-a5f0-36d018803af4.mock.pstmn.io/users/create'); //{vaildUserId: true}
  if(req.vaildUserId) return validationMessage.ID.INUSE;

  return validationMessage.ID.AVAILABLE;
}

const curring = f => a => b => f(a, b);

const checkPWHandle = (e) => {
  if(e.target.className !== 'user-pw') return;
  errMSG('.password', ...checkPW(e.target.value));
}

const checkPW = (inputPw) => {
  if(!isValid(inputPw, regExp.password.LENGTH)) return validationMessage.PASSWORD.LENGTH;
  if(!isValid(inputPw, regExp.password.NUMBER)) return validationMessage.PASSWORD.NUMBER;
  if(!isValid(inputPw, regExp.password.SPECIALCHARACTERS)) return validationMessage.PASSWORD.SPECIALCHARACTERS;
  if(!isValid(inputPw, regExp.password.UPPERCASE)) return validationMessage.PASSWORD.UPPERCASE;

  return validationMessage.PASSWORD.AVAILABLE;
}

const doubleCheckPWHandle = (e) => {
  const test = curring(doubleCheckPW);
  test(_Ele.form.querySelector('.user-pw').value)(e.target);
}

const doubleCheckPW = (pwEleValue, target) => {
  if(target.className !== 'user-pw-check') return;
  if(pwEleValue === target.value) return errMSG('.password-check', ...(validationMessage.PWCHECK.AVAILABLE));
  else return errMSG('.password-check', ...(validationMessage.PWCHECK.UNAVAILABLE));
}

const checkBirthHandle = (e) => {
  const parentEle = '.birthday';
  if(e.target.className === 'birth-year') errMSG(parentEle, checkYear(e.target.value));
  if(e.target.className === 'birth-day') {
    const year = e.target.closest(parentEle).querySelector('.birth-year');
    const month = e.target.closest(parentEle).querySelector('.birth-month');
    errMSG(parentEle, checkDay(year.value, month.value, e.target.value));
  }
}

const checkYear = (value) => {
  const userYear = Number(value);
  const minAge = 15;
  const koreaAge = (year) => new Date().getFullYear() - year + 1;

  if(value.length !== 4) return validationMessage.BIRTH.YEAR;
  if(koreaAge(userYear) < minAge) return validationMessage.BIRTH.AGE;

  return '';
}


const checkDay = (year, month, day) => {
  const lastDay = (year, month) => new Date(year, month, 0).getDate();

  if(lastDay(year, month) < day || !day.length) return validationMessage.BIRTH.DAY;
  return '';
}

const checkEmailHandle = (e) => {
  if(e.target.className !== 'user-email') return;
  const parentEle = '.email';
  if(isValid(e.target.value, regExp.email)) return errMSG(parentEle, '');
  else return errMSG(parentEle, validationMessage.EMAIL.ERROR);

  //중복확인
  //사용중? validationMessage.EMAIL.INUSE;
}

const checkPhoneHandle = (e) => {
  if(e.target.className !== 'user-phone') return;
  const parentEle = '.phone';
  if(isValid(e.target.value, regExp.phone)) return errMSG(parentEle, '');
  else return errMSG(parentEle, validationMessage.PHONE.ERROR);

  //중복확인
  //사용중? validationMessage.PHONE.INUSE;
}

const tag = (e) => {
  const parentEle = _Ele.form.querySelector('.interest-input');

  const divEle = document.createElement('div');
  divEle.classList.add('tag');
  const spanEle = document.createElement('span');
  spanEle.classList.add('tag-text');
  const buttonEle = document.createElement('button');
  buttonEle.classList.add('tag-close');


  spanEle.innerText = e.target.value;
  divEle.appendChild(spanEle);
  divEle.appendChild(buttonEle);

  parentEle.prepend(divEle);

  e.target.value = '';
}


//중복체크
const requestDuplicateConfirmation = (url, data) => {
  return fetch(url, {
      method: 'GET',
      // body: data
    }).then((res) => {
      if (res.status === 200 || res.status === 201) {
        res.json().then(json => console.log(json));
      } else {
        console.error(res.statusText);
      }
    }).catch(err => console.error(err));
}
