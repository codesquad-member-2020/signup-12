export const validationMessage = {
  ID : {
    INUSE: ['이미 사용중인 아이디입니다.', false],
    UNAVAILABLE: ['5~20자의 영문 소문자, 숫자와 특수기호(_)(-) 만 사용 가능합니다', false],
    AVAILABLE: ['사용 가능한 아이디입니다.', true]
  },
  PASSWORD: {
    LENGTH: ['8자 이상 16자 이하로 입력해주세요.', false],
    UPPERCASE : ['영문 대문자를 최소 1자 이상 포함해주세요.', false],
    NUMBER: ['숫자를 최소 1자 이상 포함해주세요.', false],
    SPECIALCHARACTERS: ['특수문자를 최소 1자 이상 포함해주세요.', false],
    AVAILABLE: ['안전한 비밀번호입니다.', true]
  },
  PWCHECK: {
    UNAVAILABLE: ['비밀번호가 일치하지 않습니다.', false],
    AVAILABLE: ['비밀번호가 일치합니다', true]
  },
  BIRTH: {
    YEAR: '태어난 년도 4자리를 정확하게 입력하세요.',
    AGE: '15세 이상만 가입 가능합니다.',
    DAY: '태어난 날짜를 다시 확인해주세요.'
  },
  EMAIL: {
    INUSE: '이미 사용중인 이메일입니다.',
    ERROR: '이메일 주소를 다시 확인해주세요'
  },
  PHONE: {
    INUSE: '이미 사용중인 번호입니다.',
    ERROR: '형식에 맞지 않는 번호입니다.'
  },
  TAG : {
    LENGTH: '3개 이상의 관심사를 입력하세요.'
  }
}

