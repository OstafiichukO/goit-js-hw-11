import '../css/main.css';
import { fetchImages } from '../js/fetchImages.js';
import markup from '../hbs/markup.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const axios = require('axios').default;

const form = document.getElementById('search-form');
const galleryImages = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');
const input = document.querySelector('input')
// console.log(input);
let count = 1;
let gallery = new SimpleLightbox('.gallery a');

loadMore.classList.add('hidden')
 
async function formSubmit(event) {
  event.preventDefault()
  const image = await fetchImages(input.value)
  count = 1
  if (image.hits.length === 0) {
        Notify.info("Sorry, there are no images matching your search query. Please try again.")
    }
  galleryImages.innerHTML = await image.hits.map(el => markup(el)).join('');
  // const Counrties = value.map(el => countryListMarkup(el)).join('');

gallery.on('show.simplelightbox', simpleLightbox);

    Notify.success(`Hooray! We found ${image.totalHits} totalHits images.`)
  loadMore.classList.remove('hidden');
}
// console.log(inputValue);

// import axios from 'axios';
// axios.get('/users').then(res => {
//   console.log(res.data);
// });

// async function getUser() {
//   try {
//     const response = await axios.get('/user?ID=12345');
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
// }

form.addEventListener('submit', formSubmit)