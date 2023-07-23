export const setCookie = function(cookieName, value, daysToExpire) {
  const expiration = new Date();
  expiration.setTime(expiration.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
  document.cookie = `${cookieName}=${value};expires=${expiration.toUTCString()};path=/`;
}

export const getCookie = function(cookieName) {
  let decodedCookies = decodeURIComponent(document.cookie);
  const cookiesArr = (decodedCookies.split('='))
  for (let i = 0; i < cookiesArr.length; i += 2 ) {
    if (cookiesArr[i] === cookieName) return cookiesArr[i + 1];
  }
  return '';
}