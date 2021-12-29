import axios from 'axios';
import Notiflix from 'notiflix';
export default class APIService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    // this.per_page = 100;
    this.totalRenderHits = 0;
  }
  async fetchHits() {
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?key=25016497-6e844d2237e7dc6bdc93b7c9e&q=${this.searchQuery}&per_page=40&page=${this.page}&orientation=horizontal&safesearch=true&image_type=photo`,
      );
      this.page += 1;
      if (response.data.hits.length === 0) {
        return Notiflix.Notify.info(
          'Sorry, there are no images matching your search query. Please try again.',
        );
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    searchQuery = newQuery;
  }
  incrementCountHits(newHits) {
    this.totalRenderHits += newHits;
  }

}