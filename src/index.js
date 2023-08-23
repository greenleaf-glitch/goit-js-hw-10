import { fetchBreeds, getCatByID } from './js/cat-api.js';
import SlimSelect from 'slim-select';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  catSelect: document.querySelector('#single'),
  loader: document.querySelector('.loader-container'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

refs.loader.classList.remove('is-hidden');
refs.catSelect.classList.add('is-hidden');

refs.catSelect.addEventListener('change', onCatSelect);

function onCatSelect(evt) {
  evt.preventDefault();

  refs.catInfo.innerHTML = '';

  const selectedBreedID = evt.target.value;

  getCatByID(selectedBreedID)
    .then(data => {
      const { name, description, temperament } = data.breeds[0];
      refs.loader.classList.remove('is-hidden');
      setTimeout(() => {
        renderSelectedCat(data.url, name, description, temperament);
        refs.loader.classList.add('is-hidden');
      }, 500);
    })
    .catch(err =>
      Notify.failure('Oops! Something went wrong! Try reloading the page!')
    );
}

fetchBreeds()
  .then(results => {
    refs.loader.classList.remove('is-hidden');

    const markupForm = results
      .map(result => {
        return `<option value="${result.reference_image_id}">${result.name}</option>`;
      })
      .join('');

    refs.catSelect.innerHTML = markupForm;

    new SlimSelect({
      select: '#single',
    });

    refs.loader.classList.add('is-hidden');
    refs.catSelect.classList.remove('is-hidden');
  })
  .catch(err => {
    console.log(err);
    Notify.failure('Oops! Something went wrong! Try reloading the page!');
  });

function renderSelectedCat(url, name, description, temperament) {
  const selectedCatMarkup = `<img class="cat-img" src="${url}" alt="${name}" width=400px/>
  <dl class="cat-txt">
  <h2 class="cat-name">${name}</h2>
  <dt class="cat-desc">Description:</dt>
  <dd>${description}</dd>
  <dt class="cat-temper">Temperament: </dt>
  <dd>${temperament}</dd></dl>`;
  refs.catInfo.insertAdjacentHTML('afterbegin', selectedCatMarkup);
}
