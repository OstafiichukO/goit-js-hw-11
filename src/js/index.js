import '../css/main.css';
import { FetchImages } from '../js/fetchImages.js';
import markup from '../hbs/markup.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const axios = require('axios').default;

const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');

form.addEventListener('submit', formSubmit)

function formSubmit(event) {
  event.preventDefault()
  gallery.innerHTML = '';
  const inputValue = event.currentTarget.elements.searchQuery.value;
  fetchImages(inputValue).then(data => render(data));
}

function render(data) {
  const markupElFetch = data.map(el => markup(el)).join('');
  return gallery.insertAdjacentHTML('beforeend', markupElFetch)
} 
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


