import '../css/main.css';
import { fetchCards } from '../js/fetchCards';
import markup from '../hbs/markup.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const axios = require('axios').default;

// import axios from 'axios';
// axios.get('/users').then(res => {
//   console.log(res.data);
// });

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import simpleLightbox from 'simplelightbox';
