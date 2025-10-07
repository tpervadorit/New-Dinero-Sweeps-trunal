/* eslint-disable no-undef */
// /* eslint-disable no-undef */
import CryptoJS from 'crypto-js';

const FE_ENCRYPTION_KEY =
  process.env.NEXT_PUBLIC_APP_FE_ENCRYPTION_KEY ||
  'rb27cry2xn2ysh7823bqxry233x9rn3682323888888q8z66';

export const encryptCredentials = (data) =>
  CryptoJS.AES.encrypt(data, FE_ENCRYPTION_KEY).toString();

// export const decryptCredentials = (data) =>
//   CryptoJS.AES.decrypt(data, FE_ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8)

export const decryptCredentials = (data) => {
  try {
    const decryptedBytes = CryptoJS.AES.decrypt(data, FE_ENCRYPTION_KEY);
    const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);

    if (!decryptedData) throw new Error('Decryption failed');
    return decryptedData;
  } catch {
    // Remove console.log to fix ESLint warning
    return '';
  }
};

export const getAccessToken = () => {
  if (typeof window !== 'undefined' && localStorage.getItem('access-token')) {
    return decryptCredentials(localStorage.getItem('access-token'));
  }
  // if (localStorage.getItem('access-token')) { return (localStorage.getItem('access-token')); }
  return '';
};

export const getAccessTokenCookie = () => {
  if (typeof window !== 'undefined') {
    const token = getCookie('access-token');
    if (token) return decryptCredentials(token);
  }
  return '';
};

export const removeLoginToken = () => {
  localStorage.removeItem('access-token');
  eraseCookie('access-token');
  window.location.reload();
  window.location.replace('/');
};

export const addLoginToken = (value) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('access-token', encryptCredentials(value));
    setCookie('access-token', encryptCredentials(value), 7); // 7 days expiry (adjust as needed)
  }
};

const eraseCookie = (name) => {
  document.cookie = `${name}=; Max-Age=-99999999; path=/`;
};

const setCookie = (name, value, days) => {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = `${name}=${encodeURIComponent(value || '')}${expires}; path=/`;
};

const getCookie = (name) => {
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let c of ca) {
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0)
      return decodeURIComponent(c.substring(nameEQ.length, c.length));
  }
  return null;
};
