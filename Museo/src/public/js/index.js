
window.onload = () => {
    consumeAPI('https://api.github.com/users/manishmshiva').then(json => console.log(json));
    addPoint(1);
    addPoint(1);
    addPoint(1);
}

const textToVoice = text => {
    /*to do*/
    const synth = window.speechSynthesis
    const utterThis = new SpeechSynthesisUtterance(text)
}

const getControlPoint = () => {

}

const addPoint = ( n ) => {
    const Map = document.getElementById('img__mapmuseo');
    Map.innerHTML += `<button class="">${n}</button>`;
}


