const MuseoRender = function () {
    const CheckRenderSession = checkSession;


    this.renderHome = () => {
        if (CheckRenderSession()) {
            renderAdminHome();
        } else {
            renderInvitedHome();
        }
    }   


    // ADMIN
    const renderNav_ADM = () => {
        const generator = new ElementGenerator;
        const manager = new ElementManagement;
    
        const root =  document.getElementById('nav');
    
        generator.removeAllElements(root);
    
        document.getElementById('nav').appendChild(
            generator.makeElement('ul', {class: 'nav-bar_box'}, [
                generator.makeElement('li', {id: 'home', class: 'nav-bar_element'}, [
                    generator.makeElement('a', {href:"#home"}, 'HOME')
                ]),
                generator.makeElement('li', {id: 'fecha', class: 'nav-bar_element'}, [
                    generator.makeElement('a', {href:"#fecha"}, 'MANEJAR FECHAS')
                ]),
                generator.makeElement('li', {id: 'exposiciones', class: 'nav-bar_element'}, [
                    generator.makeElement('a', { href:"#exposiciones"}, 'MANEJAR EXPOSICIONES')
                ]),
                generator.makeElement('li', {id: 'access', class: 'nav-bar_element'}, [
                    generator.makeElement('a', {href:"#user"}, 'SALIR')
                ])
            ])
        )
    
        manager.classAdder('home', 'nav-bar_icon'); 
        manager.classAdder('home', 'active'); 
    
        manager.classAdder('access', 'right'); 
    
        
        manager.listenerAdder('home', 'click', ()=>{this.renderHome()})
        manager.listenerAdder('access', 'click', ()=>{ /*LOG OUT */ })
    }

     //ADMIN
    const renderAdminFecha = () => {
        const generator = new ElementGenerator;
        const manager = new ElementManagement;

        generator.removeAllElements(generator.getRoot());

        



        getRoot()
        .appendChild(
            generator.makeElement('table', {class: 'table-date'}, [
            generator.makeElement('tr', {}, [
                generator.makeElement('td', {}, ['FECHA']),
                generator.makeElement('td', {}, ['HORA']),
                generator.makeElement('td', {}, ['GUIA']),
                generator.makeElement('td', {}, ['IDIOMAS']),
            ]), 
            generator.makeElement('tr', {id: 'content-table'})
        ]))

        const APIURL = '';
        consumeAPI(APIURL, {}).then( data => {
            
        })
        
    }
    
    //ADMIN
    const renderAdminHome = () => {
        const generator = new ElementGenerator;
        const manager = new ElementManagement;
        generator.removeAllElements(generator.getRoot());
        renderNav_ADM();

        manager.classAdder('home', 'active');
        manager.classRemover('fecha', 'active');
        manager.classRemover('exposiciones', 'active');
        manager.classRemover('access', 'active');
        
    }

    //INVITED
    const renderNav_INV = () => {
        const generator = new ElementGenerator;
        const manager = new ElementManagement;

        const root =  document.getElementById('nav');

        generator.removeAllElements(root);

        document.getElementById('nav').appendChild(
            generator.makeElement('ul', {class: 'nav-bar_box'}, [
                generator.makeElement('li', {id: 'home', class: 'nav-bar_element'}, [
                    generator.makeElement('a', {href:"#home"}, 'HOME')
                ]),
                generator.makeElement('li', {class: 'nav-bar_element'}, [
                    generator.makeElement('a', {href:"#reserva"}, 'HACER UNA RESERVA')
                ]),
                generator.makeElement('li', {class: 'nav-bar_element'}, [
                    generator.makeElement('a', {href:"#visitadigital"}, 'VISITA DIGITAL')
                ]),
                generator.makeElement('li', {class: 'nav-bar_element'}, [
                    generator.makeElement('a', {href:"#mapasinstalacion"}, 'MAPA DE LAS INSTALACIONES')
                ]),
                generator.makeElement('li', {id: 'access', class: 'nav-bar_element'}, [
                    generator.makeElement('a', {href:"#user"}, 'ACCEDER')
                ])
            ])
        )

        
        manager.classAdder('home', 'nav-bar_icon'); 
        manager.classAdder('home', 'active'); 

        manager.classAdder('access', 'right'); 

    
        manager.listenerAdder('home', 'click', ()=>{this.renderHome()})
        manager.listenerAdder('access', 'click', ()=>{renderUserform()})
    }

    




    //INVITED
    const renderInvitedHome = () => {
        const generator = new ElementGenerator;
        const manager = new ElementManagement;

        

        renderNav_INV();   

        generator.removeAllElements(generator.getRoot());

        manager.classRemover("access", 'active');
        manager.classAdder("home", 'active');
        

        generator.getRoot()
        .appendChild(generator.makeElement('aside'));

        generator.getRoot()
        .appendChild(generator.makeElement('article', {id: 'article-index', class: 'article'}, [
            generator.makeElement('section', {class: 'first-section-content'}, [
                generator.makeElement('h1', {}, ['Bienvenidx, visitantx!']),
                generator.makeElement('div', {class: 'img__backgroundmuseo'})
            ]), 
            generator.makeElement('section', {id: 'home', class: 'section-content'}, 
                [`Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore in maiores maxime eum, dolorum rem! Dolorum eveniet excepturi doloribus quibusdam! Eum ipsum maxime repudiandae ut saepe ea nam sed ipsa.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto animi illum asperiores fugit cumque nisi atque, nihil officia eligendi voluptatibus quidem velit dolorem impedit. Sint at optio suscipit nemo quo.
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque labore voluptatum qui, at nulla ex eligendi debitis natus rerum quae doloribus, atque aspernatur error repellat corporis vitae minima aut accusamus!`]
                ),
            
            generator.makeElement('section', {id:'reserva', class: 'section-content'}, [
                generator.makeElement('h1', {},['Reserva']),
                `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore in maiores maxime eum, dolorum rem! Dolorum eveniet excepturi doloribus quibusdam! Eum ipsum maxime repudiandae ut saepe ea nam sed ipsa.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto animi illum asperiores fugit cumque nisi atque, nihil officia eligendi voluptatibus quidem velit dolorem impedit. Sint at optio suscipit nemo quo.
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque labore voluptatum qui, at nulla ex eligendi debitis natus rerum quae doloribus, atque aspernatur error repellat corporis vitae minima aut accusamus!`
            ]),

            generator.makeElement('section', {id:'visitadigital', class: 'section-content'}, [
                generator.makeElement('h1', {}, ['Visita Digital']),
                `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore in maiores maxime eum, dolorum rem! Dolorum eveniet excepturi doloribus quibusdam! Eum ipsum maxime repudiandae ut saepe ea nam sed ipsa.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto animi illum asperiores fugit cumque nisi atque, nihil officia eligendi voluptatibus quidem velit dolorem impedit. Sint at optio suscipit nemo quo.
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque labore voluptatum qui, at nulla ex eligendi debitis natus rerum quae doloribus, atque aspernatur error repellat corporis vitae minima aut accusamus!`
            ]),

            generator.makeElement('section', {id:'map-section-content', class: 'section-content'}, [
                generator.makeElement('h1', {}, ['Mapa de las Instalaciones']),
                
                generator.makeElement('div', {class: 'container'}, [
                    generator.makeElement('div', {class: 'img__mapmuseo'}),
                    generator.makeElement('div', {}, [
                        `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore in maiores maxime eum, dolorum rem! Dolorum eveniet excepturi doloribus quibusdam! Eum ipsum maxime repudiandae ut saepe ea nam sed ipsa.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto animi illum asperiores fugit cumque nisi atque, nihil officia eligendi voluptatibus quidem velit dolorem impedit. Sint at optio suscipit nemo quo.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque labore voluptatum qui, at nulla ex eligendi debitis natus rerum quae doloribus, atque aspernatur error repellat corporis vitae minima aut accusamus!`
                    ])
                ])
                
            ]),

        ]));
    }

    //INVITED
    const renderUserform = () => {
        const generator = new ElementGenerator;
        const manager = new ElementManagement;
     
        generator.removeAllElements(generator.getRoot());
    
        manager.classRemover("home", 'active');
        manager.classAdder("access", 'active');
        
    
    
        generator.getRoot()
        .appendChild(generator.makeElement("form", { id:'id-form', class: 'form-container', action: "", method: 'PUSH'}, [
            generator.makeElement("input", {id:'user', name: 'username', class: "form-text", type: "text"}),
            generator.makeElement("input", {id:'pass', name: 'password', class: "form-password", type: "password"}),
            generator.makeElement("input", {class: "form-submit", type: "submit"})
        ]))
    
    
        manager.listenerAdder('id-form', 'submit', event => {
            event.preventDefault()
            console.log({
                username: document.getElementById('user').value,
                password: document.getElementById('pass').value,
            })
    
            /*Use Middleware*/ 
        })
        /*generator.getRoot()
        .appendChild(generator.("div", {class: "form-container"}, [
            ,
            generator.makeElemmakeElementent("input", {class: "form-password", type: "password"})
        ]))
    */}   
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
        const elementWithContent = pushContent (elementWithAtrib, content); 

        return elementWithContent;
    }

    this.getRoot = () => {
        return root;
    }

    this.removeAllElements = (rooter) => {
        while (rooter.firstChild) {
            rooter.removeChild(rooter.lastChild);
        }
    }


    const pushAttrib = ( HTMLElement, attribs ) => {
        if (attribs !== undefined) {
            const attribName =  Object.keys(attribs);
            const attribValues =  Object.values(attribs);
    
            for (let i=0 ; i<attribName.length ; i++) {
                if (attribName!= 'class') {
                    HTMLElement.setAttribute(attribName[i], attribValues[i])
                }else{
                    HTMLElement.classList.add(attribValues[i]);
                }
    
            }
        }
        return HTMLElement;
    }

    const pushContent = (HTMLElement, content) => {
        if (content !== undefined) {
            for (const iterator of content) {
                if (iterator.nodeName !== undefined) {
                    HTMLElement.appendChild (iterator);
                } else {
                    HTMLElement.appendChild (document.createTextNode(iterator));
                }
                
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