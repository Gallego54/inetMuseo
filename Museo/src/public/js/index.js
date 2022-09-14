
window.onload = () => {
    consumeAPI('https://api.github.com/users/manishmshiva').then(json => console.log(json));
    /*addPoint(1);
    addPoint(1);
    addPoint(1);*/
    const render = new MuseoRender();
    render.renderHome();
}



const textToVoice = text => {
    /*to do*/
    const synth = window.speechSynthesis
    const utterThis = new SpeechSynthesisUtterance(text)
}
