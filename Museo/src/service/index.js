/*To fetch*/

// API CONSUME //

const consumeAPI = (url, params) => {
    return new Promise ((res, rej) => {
        window.fetch(url, params)
            .then(response => response.json())  
            .then(json => res(json))   
            .catch(err => rej(err));
    });   
}