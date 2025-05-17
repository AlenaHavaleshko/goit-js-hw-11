
 import { getImagesByQuery } from './js/pixabay-api.js';
 import { 
  createGallery, 
  clearGallery, 
  showLoader, 
  hideLoader } 
  from './js/render-functions.js';
 import iziToast from 'izitoast';
 import 'izitoast/dist/css/iziToast.min.css';


const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
 event.preventDefault()
 
 const query = event.target.elements['search-text'].value.trim();  // зберігаємо значення з інпута

 if(query === '') {
    iziToast.warning({
      message: 'Please enter a search term!',
      position: 'topRight',
    });
    return;
 }

 clearGallery();
 showLoader();
 
getImagesByQuery(query)
    .then(images => {
      if (images.length === 0) {
        iziToast.error({
          message: 'Sorry, there are no images matching your search query. Please, try again!',
          position: 'topRight',
        });
        return;
      }
 
      createGallery(images);

     }).catch(error => {
      console.error(error);
      iziToast.error({
        message: 'Something went wrong. Please try again later.',
        position: 'topCenter',
      });
    })
    .finally(() => {
      hideLoader();
    });


event.target.reset();
}

 
