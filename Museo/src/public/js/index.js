
window.onload = () => {
    consumeAPI('https://api.github.com/users/manishmshiva').then(json => console.log(json));
    /*addPoint(1);
    addPoint(1);
    addPoint(1);*/


    document.getElementById ("access").addEventListener
        ('click', ()=>{ 
            renderUserform()
        })

}






const firstIndexRender =  () => {
    const manager = new ElementManagement;

    manager.listenerAdder('sw-button', 'click', ()=>{
        manager.classAdder('sw-button', 'hidden-animation');
        manager.classAdder('sw-text', 'hidden-animation');

        manager.classAdder('sw-img', 'swipe-animation');

        manager.classAdder('article-index', 'show-animation');
        manager.classAdder('nav', 'show-animation'); 
    })
}


const renderUserform = () => {
    const generator = new ElementGenerator;
    const manager = new ElementManagement;

    generator.removeAllElements();

    manager.classRemover("home", 'active');
    manager.classAdder("access", 'active');
    const text = generator.makeElement("input", {type: "text", class:"input-text"},  [generator.makeElement("input", {type: "text", class:"input-text"}, ["asd"])]  );
    console.log(text)

    /*generator.getRoot()
    .appendChild(generator.makeElement("div", {class: "form-container"}, [
        ,
        generator.makeElement("input", {class: "form-password", type: "password"})
    ]))
*/}   


/*
var google = createElement("a",{"href":"http://google.com"},"google"),
    youtube = createElement("a",{"href":"http://youtube.com"},"youtube"),
    facebook = createElement("a",{"href":"http://facebook.com"},"facebook"),
    links_conteiner = createElement("div",{"id":"links"},[google,youtube,facebook]);
*/ 
const ElementGenerator = function () {
    const root = document.getElementById("root");

    this.makeElement = ( tag, atrib, content ) => {
        const element = document.createElement(tag);
        const elementWithAtrib = pushAttrib (element, atrib); 
        const elementWithContent = pushContent (element, content); 

        return elementWithContent;
    }

    this.getRoot = () => {
        return root;
    }

    this.removeAllElements = () => {
        while (root.firstChild) {
          root.removeChild(root.lastChild);
        }
    }


    const pushAttrib = ( HTMLElement, attribs ) => {
        const attribName =  Object.keys(attribs);
        const attribValues =  Object.values(attribs);

        for (let i=0 ; i<attribName.length ; i++) {
            if (attribName!= 'class') {
                HTMLElement.setAttribute(attribName[i], attribValues[i])
            }else{
                HTMLElement.classList.add(attribValues[i]);
            }

        }

        return HTMLElement;
    }

    const pushContent = (HTMLElement, content) => {
        for (const iterator of content) {
            if (iterator.nodeName !== undefined) {
                HTMLElement.appendChild (iterator);
            } else {
                HTMLElement.appendChild (document.createTextNode(iterator));
            }
            
        }   

        return HTMLElement;
    }
}

const ElementManagement = function () {
    this.listenerAdder = ( id, event, func ) => {
        document.getElementById(id).addEventListener(event, func);
    }
    
    this.classAdder = ( id, className ) => {
        document.getElementById(id).classList.add(className);
    }

    this.classRemover = ( id, className ) => {
        document.getElementById(id).classList.remove(className);
    }
}


const textToVoice = text => {
    /*to do*/
    const synth = window.speechSynthesis
    const utterThis = new SpeechSynthesisUtterance(text)
}
