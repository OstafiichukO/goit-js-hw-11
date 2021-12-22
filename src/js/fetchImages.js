import axios from "axios";
import Notiflix from 'notiflix';

export default class APIService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    async fetchHits(){
    try { const response = await axios.get(`https://pixabay.com/api/?key=24781056-75ab6f95c382245b51e5e78bf&q=${this.searchQuery}&per_page=40&page=${this.page}&orientation=horizontal&safesearch=true&image_type=photo`)
       this.page += 1;
        if (response.data.hits.length === 0) {
            return Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.');
        }
            return response.data;
        }
            catch (error) {   
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
}