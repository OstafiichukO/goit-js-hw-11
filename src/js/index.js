import '../css/main.css';
import APIService from './fetchImages';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';

const form = document.querySelector('.search-form');
const loadMore = document.querySelector('.load-more');
const galleryImages = document.querySelector('.gallery');
const apiService = new APIService();

form.addEventListener('submit', onSearch);
loadMore.addEventListener('click', onLoadMore);

loadMore.setAttribute(`disabled`, true);
loadMore.classList.add('hidden');

function onSearch(event) {
  event.preventDefault();
  apiService.searchQuery = event.target.elements.searchQuery.value;
  const inputV = apiService.searchQuery.trim();
  if (inputV === '') {
    return;
  }
  loadMore.setAttribute(`disabled`, true);
  // loadMore.classList.add('hidden')

  apiService.resetPage();
  apiService.fetchHits().then(data => {
    const imagesHits = data.totalHits;
    Notiflix.Notify.success(`Hooray! We found ${imagesHits} images`);
    galleryImages.innerHTML = '';
    const hits = data.hits;
    render(hits);
    lightbox.refresh();

    loadMore.removeAttribute(`disabled`, true);
    loadMore.classList.remove('hidden');
  });
}

function onLoadMore() {
  apiService.fetchHits().then(data => {
    render(data.hits);
    lightbox.refresh();
  });
}

function render(data) {
  const markup = data
    .map(({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) => {
      return `
  <a class='photo-card' href="${largeImageURL}">
  <div class="img-wrapper">
    <img src='${webformatURL}' alt='${tags}' loading='lazy' />
  </div>
  <div class='info'>
    <p class='info-item'>
      <b>Likes</b>
      <span>${likes}</span>
    </p>
    <p class='info-item'>
      <b>Views</b>
      <span>${views}</span>
    </p>
    <p class='info-item'>
      <b>Comments</b>
      <span>${comments}</span>
    </p>
    <p class='info-item'>
      <b>Downloads</b>
      <span>${downloads}</span>
    </p>
  </div>
</a>`;
    })
    .join('');
  galleryImages.insertAdjacentHTML('beforeend', markup);
}

const lightbox = new SimpleLightbox('.gallery a');
