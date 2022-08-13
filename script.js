const imageContainer = document.createElement('image-container');
const loader = document.createElement('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = []; // we need to change comtents here we should add title and somthing else
let initialload = true;
//Unsplash API
let count = 5;
const apiKey = '8xqKp75Jh8XckW_SiV2nd3bRknt0IXE1jd-K4gdnyTE'
const apiUrl =`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`; 
//check if all images were loaded
function imageLoaded() {
    console.log('Image loaded');
    imagesLoaded++; 
    console.log(imagesLoaded);
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        initialload = false;
        count = 30; 
        console.log('ready =' ,ready);
    } 
}



//helper function to set Attributes on DOM elements
 function setAttributes(element, attributes){
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
    }
//Create Elements for Links & photos ,add to DOM
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('totalImages' ,totalImages);
    //run function for each object in photosArray
    photosArray.forEach((photo) => {
        //creat <a> to link to Unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item , {
            href: photo.links.html,
            target: '_blank',
        });
        //creat <img> for photo
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        //Event listeners, check when each when each is finished loading 
        img.addEventListener('load', imageLoaded);
        //put <img> inside <a>, then put both inside imageContainer Elements
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        item.appendChild(img);
        imageContainer.appendChild(item);

    });
}
//Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);  // no we had text and we should define it is a json 
        photosArray = await response.json();
        console.log(photosArray);
        displayPhotos();
    } catch(error){
        //Catch   Error Here
    }
}
// check to see scrolling near botton of page ,load more photos
window.addEventListener('scroll',()=> {
    console.log('scrolled'); 
    if (window.innerHeight+ window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    //    console.log('window.innerHeight:', window.innerHeight);
    //    console.log('window.scrollY:', window.scrollY);
    //    console.log('window.innerHeight+ scrollY:', window.scrollY+window.innerHeight);
    //    console.log('document.body.offsetHeight-1000', document.body.offsetHeight-1000);
       console.log('Load more');
       ready = false;
       getPhotos();
         }
});
//on load
getPhotos();
