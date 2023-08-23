import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const CAT_API_URL = 'https://api.thecatapi.com/v1/';
const CAT_API_ENDPOINT = 'breeds/';
const CAT_INFO_URL = 'https://api.thecatapi.com/v1/images/';

axios.defaults.headers.common['x-api-key'] =
  'api_key=live_1CvzBHR9J6nLSt2wdKpcvsfMKA4iUHP77ZaTYHTAZIqJJMJaOeN1FB0e3mnQgzkP';

export function fetchBreeds() {
  return fetch(`${CAT_API_URL}${CAT_API_ENDPOINT}`).then(result => {
    if (result.ok) {
      return result.json();
    } else {
      throw new Error('Error');
    }
  });
}

export function getCatByID(id) {
  //   const options = {
  //     headers: {
  //       '': AXIOS_KEY,
  //     },
  //   };

  const searchUrl = `${CAT_INFO_URL}${id}`;

  return fetch(searchUrl, options)
    .then(res => {
      if (!res.ok) {
        throw new Error();
      } else {
        return res.json();
      }
    })
    .catch(err =>
      Notify.failure('Oops! Something went wrong! Try reloading the page!')
    );
}
