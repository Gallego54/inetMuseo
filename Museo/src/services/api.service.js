/*To fetch*/

// API CONSUME //
const API_URL = 'http://localhost:5000';
export default function consumeAPI (urlPath, params) {
    return new Promise ((res, rej) => {
        window.fetch(API_URL+urlPath, params)
            .then(response => response.json())  
            .then(json => res(json))   
            .catch(err => rej(err));
    });   
}