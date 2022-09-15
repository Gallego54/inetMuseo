import consumeAPI from "../services/api.service";

const API_URL = 'http://localhost:5000/confirmarUsuarioAdmin';

export function createSession(data){
    return new Promise ((res, rej) =>  { consumeAPI(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then((token) => {
            if (token) {
                localStorage.setItem('sessionId', JSON.stringify(token[0]));
                res(true);
            } else {
                rej(false)
            }
        })
    });   
}

export function deleteSession () {
    localStorage.removeItem('sessionId');
}