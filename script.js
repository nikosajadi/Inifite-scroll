const imageContainer = document.createElement('image-container');
const loader = document.createElement('loader');

let photosArray = []; // we need to change comtents here we should add title and somthing else
//Unsplash API
const count = 10;
const apiKey = '8xqKp75Jh8XckW_SiV2nd3bRknt0IXE1jd-K4gdnyTE'
const apiUrl =`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
//helper function to set Attributes on DOM elements
 function setAttributes(Element, attributes){
  for (const key in attributes) {
    Element.setAttribute(key, attributes[key]);
  }
}



//Create Elements for Links & photos ,add to DOM
function displayPhotos(){
//run function for each object in photosArray
photosArray.forEach((photo) => {
//creat <a> to link to Unsplash
const item = document.createElement('a');
// item.setAttribute('href', photo.links.html);
// item.setAttribute('target', '_blank');
setAttributes(item , {
    href: photo.links.html,
    target: '_blank'
})
//creat <img> for photo
const img = document.createElement('img');
// img.setAttribute('src', photo.urls.regular);
// img.setAttribute('alt', photo.alt_description);
// img.setAttribute('title', photo.alt_description);
//put <img> inside <a>, then put both inside imageContainer Elements
setAttributes(img, {
    src: photo.urls.regular,
    alt: photo.alt_description,
    title: photo.alt_description,
})
item.appendChild(img);
imageContainer.appendChild(item);

});
}


//Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);  // no we had text and we should define it is a json 
        photosArray = await response.json();
        // console.log(photosArray);
        displayPhotos();
    } catch(error){
        //Catch   Error Here
    }
}
//on load
getPhotos();