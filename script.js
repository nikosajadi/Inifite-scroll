//Unsplash API
const count = 10;
const apiKey = '8xqKp75Jh8XckW_SiV2nd3bRknt0IXE1jd-K4gdnyTE'
const apiUrl =`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
//Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);  // no we had text and we should define it is a json 
        const data = await response.json();
        console.log(data);
    } catch(error){
        //Catch   Error Here
    }
}
//on load
getPhotos();