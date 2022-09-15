import consumeAPI from "../services/api.service";

const API_URL = '';



export function createSession(data){
    return new Promise ((res, rej) =>  { consumeAPI(API_URL, {
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(token => {
            if (token) {
                localStorage.setItem('sessionId', JSON.stringify(token));
                res({message: 'session sucess'});
            } else {
                alert('No se pudo iniciar sesion');
                rej({error: 'session failed'})
            }
        })
    });   
}

export function deleteSession () {
    localStorage.removeItem('sessionId');
}