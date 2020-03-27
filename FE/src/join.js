import {regExp, isValid} from './util/validation.js';
import {validationMessage} from './constants/constant.js';
import {getElement, getElements, classAdd, classRemove, show, hide} from './util/domUtil.js';

const formWrap = getElement('.form-wrap form');
const tagList = [];

formWrap.addEventListener('focusin', (e) => {
  if(e.target.className === 'interest-tag') return classAdd(e.target.closest('.interest-input'), 'focus');
  classAdd(e.target, 'focus');
});

formWrap.addEventListener('focusout', (e) => {
  if(e.target.className === 'interest-tag') classRemove(e.target.closest('.interest-input'), 'focus');
  else classRemove(e.target, 'focus');
  checkIDHandle(e);
  checkPWHandle(e);
  doubleCheckPWHandle(e);
  checkNameHandle(e);
  checkBirthHandle(e);
  checkGenderHandle(e);
  checkEmailHandle(e);
  checkPhoneHandle(e);
  checkInterestHandle(e);
});

formWrap.addEventListener('click', (e) => {
  const targetClassList = e.target.classList;
  if(targetClassList.contains('terms-btn')) {
    show(getElement('.terms-popup'));
    show(getElement('.dim'));
  }

  if(targetClassList.contains('terms-close')) {
    hide(getElement('.terms-popup'));
    hide(getElement('.dim'));
  }

  if(targetClassList.contains('terms-check-btn')) {
    const targetParent = e.target.closest('.terms');
    if(!targetParent.classList.contains('checked')) return;
    targetParent.querySelector('.terms-checkbox').setAttribute('checked', true);
    hide(getElement('.terms-popup'));
    hide(getElement('.dim'));
  }

  if(targetClassList.contains('join-btn')) {
    e.preventDefault();
    const formDivChild = getElements('.form-wrap form > div');
    const formDivChildArray = Array.prototype.slice.call(formDivChild);
    const isEveryCheck = formDivChildArray.every((ele) => ele.classList.contains('checked'));

    if(isEveryCheck) {
      getElement('.interest-tag').value = tagList.join(',');
      formWrap.submit();
    }
  }

  if(targetClassList.contains('reset-btn')) {
    e.preventDefault();
    if(!confirm('정말?')) return;
    formWrap.reset();
    resetForm();
  }
});

getElement('.interest-tag').addEventListener('keyup', (e) => {
  if(e.keyCode !== 188) return;
  addTag(e);

})

getElement('.interest-tag').addEventListener('keydown', (e) => {
  if((e.keyCode === 8) && (e.target.value === '') && (tagList.length > 0)) removeTag(e);
})

getElement('.terms-content').addEventListener('scroll', (e) => {
  const isScroll = checkScroll(e.currentTarget);
  if(isScroll) classAdd(getElement('.terms'), 'checked');
})

const errMSG = (selector, ...msg) => {
  const errEle = getElement(`${selector} .err-box`);
  errEle.innerText = msg[0];
  if(msg[1]) {
    classAdd(errEle, 'check');
    classAdd(getElement(selector), 'checked');
    return;
  }
  classRemove(errEle, 'check');
  classRemove(getElement(selector), 'checked');
};

const checkIDHandle = (e) => {
  if(e.target.className !== 'user-id') return;
  checkID(e.target.value);
}

const checkID = (inputId) => {
  if(!isValid(inputId, regExp.id)) return errMSG('.id', ...(validationMessage.ID.UNAVAILABLE));

  //fetch 중복체크
  requestId(inputId).then((data) => {
    if(!data.validUserId) return errMSG('.id', ...(validationMessage.ID.INUSE));
    return errMSG('.id', ...(validationMessage.ID.AVAILABLE));
  })
}

const requestId = async (inputId) => {
  const reqData = {userId: inputId};
  return await fetch('/validate/userId', {
    method: 'POST',
    body: reqData
  }).then(response => {
    return response.json();
  });
}

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
  if(e.target.className !== 'user-pw-check') return;
  doubleCheckPW(getElement('.user-pw').value, e.target);
}

const doubleCheckPW = (pwEleValue, target) => {
  if(pwEleValue === target.value) return errMSG('.password-check', ...(validationMessage.PWCHECK.AVAILABLE));
  else return errMSG('.password-check', ...(validationMessage.PWCHECK.UNAVAILABLE));
}

const checkNameHandle = (e) => {
  if(!e.target.classList.contains('user-name')) return;
  if(e.target.value) return classAdd(e.target.closest('.name'), 'checked');
  return classRemove(e.target.closest('.name'), 'checked');
}

const checkBirthHandle = (e) => {
  const parentEle = '.birthday';
  if(e.target.className === 'birth-year') errMSG(parentEle, ...checkYear(e.target.value));
  if(e.target.className === 'birth-month') errMSG(parentEle, ...checkMonth(e.target.value));
  if(e.target.className === 'birth-day') {
    const year = e.target.closest(parentEle).querySelector('.birth-year');
    const month = e.target.closest(parentEle).querySelector('.birth-month');
    errMSG(parentEle, ...checkDay(year.value, month.value, e.target.value));
  }
}

const checkYear = (value) => {
  const userYear = Number(value);
  const minAge = 15;
  const koreaAge = (year) => new Date().getFullYear() - year + 1;

  if(!isValid(userYear, regExp.birth.year)) return validationMessage.BIRTH.YEAR;
  if(koreaAge(userYear) < minAge) return validationMessage.BIRTH.AGE;

  return validationMessage.BIRTH.AVAILABLE;
}

const checkMonth = (value) => {
  if(isNaN(value)) return validationMessage.BIRTH.DAY;
  return validationMessage.BIRTH.AVAILABLE;
}

const checkDay = (year, month, day) => {
  const lastDay = (year, month) => new Date(year, month, 0).getDate();

  // if(lastDay(year, month) < day || !day.length) return validationMessage.BIRTH.DAY;
  if(isNaN(month) || lastDay(year, month) < day || !isValid(Number(day), regExp.birth.day)) return validationMessage.BIRTH.DAY;
  return validationMessage.BIRTH.AVAILABLE;
}

const checkGenderHandle = (e) => {
  if(!e.target.classList.contains('user-gender')) return;
  if(e.target.selectedIndex) return classAdd(e.target.closest('.gender'), 'checked');
  return classRemove(e.target.closest('.gender'), 'checked');
}

const checkEmailHandle = (e) => {
  if(e.target.className !== 'user-email') return;
  const parentEle = '.email';
  if(isValid(e.target.value, regExp.email)) return errMSG(parentEle, ...(validationMessage.EMAIL.AVAILABLE));
  else return errMSG(parentEle, ...(validationMessage.EMAIL.ERROR));

  //중복확인
  //사용중? validationMessage.EMAIL.INUSE;
}

const checkPhoneHandle = (e) => {
  if(e.target.className !== 'user-phone') return;
  const parentEle = '.phone';
  if(isValid(e.target.value, regExp.phone)) return errMSG(parentEle, ...(validationMessage.PHONE.AVAILABLE));
  else return errMSG(parentEle, ...(validationMessage.PHONE.ERROR));

  //중복확인
  //사용중? validationMessage.PHONE.INUSE;
}

const checkInterestHandle = (e) => {
  if(e.target.className !== 'interest-tag') return;
  const parentEle = '.interest';
  if(tagList.length >= 3) return errMSG(parentEle, ...(validationMessage.TAG.AVAILABLE));
  return errMSG(parentEle, ...(validationMessage.TAG.LENGTH));
}

const addTag = (e) => {
  if(e.target.value === ',') {
    e.target.value = '';
    return;
  }
  tagList.push(e.target.value.replace(',',''));
  e.target.value = '';
  return updateTag();
}

const removeTag = (e) => {
  e.target.value = tagList.pop() + ' ';
  updateTag();
}

const removeTagOnClickEvent = (e) => {
  const removeTargetTag = e.target.previousElementSibling.innerText;
  tagList.splice(tagList.indexOf(removeTargetTag), 1);
  updateTag();
}

const updateTag = () => {
  const parentEle = getElement('.interest-input');
  refreshTag();

  tagList.reverse().forEach((tag) => {  
    parentEle.prepend(makeTag(tag));
  })
  tagList.reverse();
}

const makeTag = (tag) => {
  const divEle = document.createElement('div');
  classAdd(divEle, 'tag')
  const spanEle = document.createElement('span');
  classAdd(spanEle, 'tag-text');
  const buttonEle = document.createElement('button');
  buttonEle.type = 'button';
  classAdd(buttonEle, 'tag-close');
  buttonEle.addEventListener('click', (e) => {
    removeTagOnClickEvent(e);
  })

  spanEle.innerText = tag;

  divEle.appendChild(spanEle);
  divEle.appendChild(buttonEle);
  return divEle;
}

const refreshTag = () => {
  getElements('.tag').forEach(el => el.remove());
}

const checkScroll = (target) => target.scrollHeight - target.scrollTop <= (target.clientHeight+1) ? true : false;

const resetForm = () => {
  getElements('.err-box').forEach((ele) => ele.innerText = '');
  refreshTag();
  getElement('.terms-checkbox').removeAttribute('checked');
  getElement('.terms').classList.remove('checked');
  getElement('.terms-content').scrollTop = 0;
}
