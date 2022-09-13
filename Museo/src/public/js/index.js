
window.onload = () => {
    consumeAPI('https://api.github.com/users/manishmshiva').then(json => console.log(json));
    /*addPoint(1);
    addPoint(1);
    addPoint(1);*/

    firstIndexRender();
  

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



const firstIndexRender =  () => {
    listenerAdder('sw-button', 'click', ()=>{
        classAdder('sw-button', 'hidden-animation');
        classAdder('sw-text', 'hidden-animation');

        classAdder('sw-img', 'swipe-animation');

        classAdder('article-index', 'show-animation');
        classAdder('nav', 'show-animation'); 
    })
}

const listenerAdder = ( id, event, func ) => {
    document.getElementById(id).addEventListener(event, func);
}

const classAdder = ( id, className ) => {
    document.getElementById(id).classList.add(className);
}

