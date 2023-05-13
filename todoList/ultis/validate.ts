const checkEmail = (email: string) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (!emailRegex.test(email)) {
    return false;
  }

  return true;
};

const checkPassword = (password: string) => {
  if (password.length <= 8) {
    return false;
  }
  return true;
};

export {checkEmail, checkPassword}