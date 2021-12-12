async function fetchImages(search, page = 1) {   
   const response = await fetch(`https://pixabay.com/api/?key=24642073-b12941d2e5507c49f57c90e2e&q=${search}&image_type=photo&orientation=horizontal&safesearch=true&fields=webformatURL,largeImageURL,tags,likes,views,comments,downloads&per_page=40&page=${page}`)
    const image = await response.json()
    return image;
}

export { fetchImages };