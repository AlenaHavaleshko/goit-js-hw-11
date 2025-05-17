
import axios from 'axios';
import '../css/styles.css';

const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '50282223-5a409711ad86c04843247122a';

export function getImagesByQuery(query) {

   return axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',  
      orientation: 'horizontal',
      safesearch: true,
    }
   })
  .then(response => response.data.hits);           // Повна відповідь (великий об'єкт)
                                                   // response.data - Дані від API (об'єкт з total, totalHits, hits)
                                                  // response.data.hits - Масив об'єктів з картинками
}

getImagesByQuery('pictures').then(data=>{
  console.log(data)
});


