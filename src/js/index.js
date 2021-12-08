import '../css/main.css';
import { fetchCards } from '../js/fetchCards';
import markup from '../hbs/markup.hbs';

import axios from 'axios';
axios.get('/users').then(res => {
  console.log(res.data);
});
