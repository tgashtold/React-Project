const Utils = {
getUserIdFromLS() {
  const idFromLS: string | null = window.localStorage.getItem('user');
  const id: string | null = idFromLS && JSON.parse(idFromLS);

  return id;
},

getQuestionIdFromURl() {
  return window.location.pathname.split('/')[2];
}
}

export default Utils;