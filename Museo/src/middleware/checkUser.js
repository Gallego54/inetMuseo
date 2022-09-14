const API_URL = '';




function createSession(data){
    consumeAPI(API_URL, {
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).then(token => {
        if (token) {
            localStorage.setItem('sessionId', JSON.stringify(token));
        } else {
            alert('No se pudo iniciar sesion');
        }
    });
}

function sessionOut () {
    localStorage.removeItem('sessionId');
}

function checkSession(){
    /*const sessionId = localStorage.getItem('sessionId');
    if (sessionId) {
        return sessionId;
    } return false;*/
    return true;
}