import '../css/main.css';

import APIService from './fetchImages';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';


const form = document.querySelector('.search-form');
const loadMore = document.querySelector('.load-more');
const galleryImages = document.querySelector('.gallery');
const apiService = new APIService;

form.addEventListener('submit', onSearch);
loadMore.addEventListener('click', onLoadMore);
loadMore.setAttribute(`disabled`, true);

function onSearch(event) {
  event.preventDefault();
  
  apiService.searchQuery = event.target.elements.searchQuery.value;
  const inputV = apiService.searchQuery.trim();
  if (inputV === '') {
    return 
  }
  loadMore.setAttribute(`disabled`, true);

  apiService.resetPage();
  apiService.fetchHits()
    .then(data => {
       const imagesHits = data.totalHits;
    Notiflix.Notify.success(`Hooray! We found ${imagesHits} images`);
      galleryImages.innerHTML = '';
      const hits = data.hits;
      render(hits);
      loadMore.removeAttribute(`disabled`, true);
      
    }); 
 
}
function onLoadMore() {
  apiService.fetchHits().then(el => {
    render(el.hits)
    lightbox.refresh()
  });
}

function render(data) {
   
  const markup = data
        .map(({ largeImageURL, webformatURL, likes, views, comments, downloads, }) =>
        {
          return `
  <a class="photo-card" href="${largeImageURL}">
  <div class="img-wrapper">      
  <img class="img-item" src="${webformatURL}" alt="#" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      <span>${likes}</span>
    </p>
    <p class="info-item">
      <b>Views</b>
    <span>${views}</span>
    </p>
    <p class="info-item">
      <b>Comments</b>
    <span>${comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    <span>${downloads}</span>
    </p>
  </div>
</div>
</a>`;
        }).join('');
  galleryImages.insertAdjacentHTML('beforeend', markup);
};
const lightbox = new SimpleLightbox('.gallery a');