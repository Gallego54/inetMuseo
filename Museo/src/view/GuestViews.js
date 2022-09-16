import consumeAPI from '../services/api.service.js';
import MuseoRender, {ElementGenerator, ElementManagement} from '../services/render.service.js'
import { createSession } from '../controller/Session.js'


const Generator = new ElementGenerator();
const Manager = new ElementManagement();


export default function GuestViewsController(){
    const setViews = (dependenciesIdNav) => {
        const callViews = Object.values(dependenciesIdNav);
        const idTags = Object.keys(dependenciesIdNav);

        for (let i=0 ; i<idTags.length ; i++) {
            Manager.listenerAdder(idTags[i], 'click',callViews[i])
        }
    }

    const renderNav = (dependenciesIdNav) => {
        const root =  document.getElementById('nav');

        Generator.removeAllElements(root);

        document.getElementById('nav').appendChild(
            Generator.makeElement('ul', {class: 'nav-bar_box'}, [
                Generator.makeElement('li', {id: 'home', class: 'nav-bar_element'}, [
                    Generator.makeElement('a', {href:"#home"}, 'HOME')
                ]),
                Generator.makeElement('li', {id: 'reserva', class: 'nav-bar_element'}, [
                    Generator.makeElement('a', {href:"#reserva"}, 'HACER UNA RESERVA')
                ]),
                Generator.makeElement('li', {id: 'visitadigital', class: 'nav-bar_element'}, [
                    Generator.makeElement('a', {href:"#visitadigital"}, 'VISITA DIGITAL')
                ]),
                Generator.makeElement('li', {id: 'accesibilidad', class: 'nav-bar_element'}, [
                    Generator.makeElement('a', {href:"#accesibilidad"}, 'ACCESIBILIDAD')
                ]),
                Generator.makeElement('li', {id: 'access', class: 'nav-bar_element'}, [
                    Generator.makeElement('a', {href:"#user"}, 'ACCEDER')
                ])
            ])
        )

        
        Manager.classAdder('home', 'nav-bar_icon'); 
        Manager.classAdder('home', 'active'); 

        Manager.classAdder('access', 'right');
        
        setViews(dependenciesIdNav);
    }



    const renderHome = () => {
        renderNav(getDependencies());   
        

        Generator.removeAllElements(Generator.getRoot());
        Manager.setActiveClass(Object.keys(getDependencies()), 'home');
        

        Generator.getRoot()
        .appendChild(Generator.makeElement('aside'));

        Generator.getRoot()
        .appendChild(Generator.makeElement('article', {id: 'article-index', class: 'article'}, [
            Generator.makeElement('section', {class: 'first-section-content'}, [
                Generator.makeElement('h1', {class: 'display-5'}, ['Bienvenidx, visitantx!']),
            ]), 
            Generator.makeElement('section', {id: 'home', class: 'section-content'}, 
                [`Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore in maiores maxime eum, dolorum rem! Dolorum eveniet excepturi doloribus quibusdam! Eum ipsum maxime repudiandae ut saepe ea nam sed ipsa.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto animi illum asperiores fugit cumque nisi atque, nihil officia eligendi voluptatibus quidem velit dolorem impedit. Sint at optio suscipit nemo quo.
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque labore voluptatum qui, at nulla ex eligendi debitis natus rerum quae doloribus, atque aspernatur error repellat corporis vitae minima aut accusamus!`]
                ),

                
            Generator.makeElement('section', {id:'map-section-content', class: 'section-content'}, [
                Generator.makeElement('h1', {}, ['Mapa de las Instalaciones']),
                
                Generator.makeElement('div', {class: 'container'}, [
                    Generator.makeElement('div', {class: 'img__mapmuseo'}),
                    Generator.makeElement('div', {}, [
                        `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore in maiores maxime eum, dolorum rem! Dolorum eveniet excepturi doloribus quibusdam! Eum ipsum maxime repudiandae ut saepe ea nam sed ipsa.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto animi illum asperiores fugit cumque nisi atque, nihil officia eligendi voluptatibus quidem velit dolorem impedit. Sint at optio suscipit nemo quo.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque labore voluptatum qui, at nulla ex eligendi debitis natus rerum quae doloribus, atque aspernatur error repellat corporis vitae minima aut accusamus!`
                    ])
                ])
                
            ]),
        ]));

        Generator.getRoot().appendChild(Generator.makeElement('footer', {class: 'footer-default'}))
    }

    const renderLoggin = () => {
        Generator.removeAllElements(Generator.getRoot());
    


        Manager.setActiveClass(Object.keys(getDependencies()), 'access');
        
    
    
        Generator.getRoot()
        .appendChild(Generator.makeElement("form", { id:'id-form', class: 'form-container-user', action: "", method: 'POST'}, [
            Generator.makeElement("input", {placeholder: 'Nombre...', id:'user', name: 'username', class: "form-text-user", type: "text"}),
            Generator.makeElement("input", {placeholder: 'Contraseña...', id:'pass', name: 'password', class: "form-pass-user", type: "password"}),
            Generator.makeElement("input", {value: 'INGRESAR', class: "form-submit-user", type: "submit"})
        ]))
    
    
        Manager.listenerAdder('id-form', 'submit', event => {
            event.preventDefault()
            const body = {
                username: document.getElementById('user').value,
                password: document.getElementById('pass').value,
            }

            createSession(body).then(x => {
                if (x) {
                    const MR = new MuseoRender();
                    MR.startUp();
                }
            });
  
    
            /*Use Middleware*/ 
        })
        /*Generator.getRoot()
        .appendChild(Generator.("div", {class: "form-container"}, [
            ,
            Generator.makeElemmakeElementent("input", {class: "form-password", type: "password"})
        ]))
    */}  
    
    
    

    const renderReserva = () => {
        Manager.setActiveClass(Object.keys(getDependencies()), 'reserva');
        

        Generator.removeAllElements(Generator.getRoot());

        const root = Generator.makeElement('article', {class: 'article'}); 
        
        Generator.getRoot()
        .appendChild(root)


        root
        .appendChild(Generator.makeElement('h1', {class: 'h1-display-table'}, ['Fechas de Eventos']));

        root
        .appendChild(Generator.makeElement('div', {class: 'container'}, [
            Generator.makeElement('div', {id: 'row-1', class: 'row'}),
            Generator.makeElement('div', {id: 'row-2', class: 'row'})
        ]));

        document.getElementById('row-1')
        .appendChild(
            Generator.makeElement('table', {class: 'table-date'}, [
            Generator.makeElement('tr', {}, [
                Generator.makeElement('td', {}, ['FECHA']),
                Generator.makeElement('td', {}, ['HORA']),
                Generator.makeElement('td', {}, ['GUIA']),
                Generator.makeElement('td', {}, ['IDIOMAS']),
                Generator.makeElement('td', {}, ['SUBSCRIBIRME']),
            ]), 
            Generator.makeElement('tr', {id: 'content-table'})
        ]))

        const APIURL = '';
        const focus = document.getElementById('content-table');
        consumeAPI(APIURL, {}).then( data => {
            data.map(e => {
                focus.appendChild(
                    Generator.makeElement('tr', {}, [
                        Generator.makeElement('td', {}, [e.fecha]),
                        Generator.makeElement('td', {}, [e.hora]),
                        Generator.makeElement('td', {}, [e.guia]),
                        Generator.makeElement('td', {}, [e.idiomas]),
                        Generator.makeElement('td', {}, [
                            Generator.makeElement('div', {class: 'dashboard-container'}, [
                                Generator.makeElement('button', {value: e.id, id: 'pop-table-button', class: 'post-button'}, ['Subscribirme']),
                            ])
                        ])
                    ])
                )
            })
        })


        document.querySelectorAll('#pop-table-button').forEach(item => {
            item.addEventListener('click', event => {
              //handle click
                console.log(event)
                const row2Element = document.getElementById('row-2');
                Generator.removeAllElements(row2Element);
        
                row2Element
                .appendChild(Generator.makeElement('form', { method: 'POST', class: 'card', action: '' }, [
                    Generator.makeElement("h1", {id:'card-header', class: "card-header"}, ['Datos de Inscripcion']),
                    Generator.makeElement("input", {id:'card-nombre', name: 'nombre', class: "form-text", type: "text"}),
                    Generator.makeElement("input", {id:'card-apellido', name: 'apellido', class: "form-text", type: "text"}),
                    Generator.makeElement("input", {id:'card-dni', name: 'dni', class: "form-number", type: "number"}),
                    Generator.makeElement("input", {id:'card-submit', name: 'submit', class: "form-text", type: "submit"}),
                ]))
            })
        })     

    }

    const renderDigitalVisit = () => {
        Manager.setActiveClass(Object.keys(getDependencies()), 'visitadigital');
        

        /**/ 

        Generator.removeAllElements(Generator.getRoot());
        const root = Generator.makeElement('article', {class: 'article'},
        [
            Generator.makeElement('section', {class: 'small-container'}, [
                Generator.makeElement('div', { class: 'content-card'},[
                    Generator.makeElement('h1', {class: 'title-content'}, ['La Gioconda']),
                    Generator.makeElement('p', {class: 'content'}, ['El retrato de Lisa Gherardini, esposa de Francesco del Giocondo, ​ más conocido como La Gioconda o Monna Lisa, es una obra pictórica del polímata renacentista italiano Leonardo da Vinci.'])
                ]),
                Generator.makeElement('div', {}, [
                    Generator.makeElement('div', {class: 'img-visita-digital-1'}),
                ])
            ]),

            Generator.makeElement('section', {class: 'small-container'}, [
                Generator.makeElement('div', {}, [
                    Generator.makeElement('div', {class: 'img-visita-digital-2'}),
                ]),

                Generator.makeElement('div', {class: 'content-card'}, [
                    Generator.makeElement('h1',  {class: 'title-content'}, ['La noche estrellada']),
                    Generator.makeElement('p', {class: 'content'}, ['La noche estrellada es un óleo sobre lienzo del pintor postimpresionista neerlandés Vincent van Gogh. Pintado en junio de 1889, representa la vista desde la ventana orientada al este de su habitación de asilo en Saint-Rémy-de-Provence, justo antes del amanecer, con la adición de un pueblo imaginario.​​​'])
                ])
            ]),

            Generator.makeElement('section', {class: 'small-container'}, [
                Generator.makeElement('div', {class: 'content-card'}, [
                    Generator.makeElement('h1', {class: 'title-content'}, ['La última cena']),
                    Generator.makeElement('p', {class: 'content'}, ['La última cena es una pintura mural original de Leonardo da Vinci ejecutada entre 1495 y 1498.​​ Se encuentra en la pared sobre la que se pintó originalmente, en el refectorio del convento dominico de Santa Maria delle Grazie, en Milán, ​ declarado Patrimonio de la Humanidad por la Unesco en 1980.'])
                ]),
                Generator.makeElement('div', {}, [
                    Generator.makeElement('div', {class: 'img-visita-digital-3'}),
                ])
            ]),

            Generator.makeElement('section', {class: 'small-container'}, [
                Generator.makeElement('div', {}, [
                    Generator.makeElement('div', {class: 'img-visita-digital-4'}),
                ]),
                Generator.makeElement('div', {class: 'content-card'}, [
                    Generator.makeElement('h1', {class: 'title-content'}, ['Desnudo bajando una escalera nº2']),
                    Generator.makeElement('p', {class: 'content'}, ['Desnudo bajando una escalera nº2 es una pintura de 1912 por Marcel Duchamp. El trabajo es considerado como un clásico modernista y se ha convertido en uno de los más famosos de su tiempo.'])
                ]),
            ])

        ]); 

        Generator.getRoot().appendChild(root);
    }

    const renderAccesibility = () => {
        Generator.removeAllElements(Generator.getRoot());
        Manager.setActiveClass(Object.keys(getDependencies()), 'accesibilidad');

        Generator.getRoot()
        .appendChild(
            Generator.makeElement('article', {class: 'article'}, [
                Generator.makeElement('section', {class: 'section-content'}, [
                    Generator.makeElement('h1', {class: 'display-5'}, ['Accesibilidad en Museos'])
                ]),

                Generator.makeElement('section', {class: 'section-content'}, [
                    Generator.makeElement('p', {class:'content'}, 
                    ['La Guía de Accesibilidad en Museos permite evaluar y proyectar la accesibilidad en distintos tipos de instituciones patrimoniales y culturales, mediante la presentación de herramientas de acceso tecnologicas.'])
                ]),


                Generator.makeElement('div', {class: 'container'}, [

                    Generator.makeElement('div', {class: 'col'}, [
                        Generator.makeElement('h2', {class: 'title-content'}, ['Discapacidad Visual']),
                        Generator.makeElement('div', {class: 'icon-blind'}),
                        Generator.makeElement('p', {class:'top-content'}, ['Los problemas de visión son los más comunes en personas adultas. Problemas tales como, vista corta (miopía), hipermetropía, astigmatismo y presbicia e incluso la ceguera completa pueden llegar a aparecer.  Estos problemas provocan dificultad para disfrutar las muestras de los museos.'])
                    ]),

                    Generator.makeElement('div', {class: 'col'}, [
                        
                    ]),
                ]),


                Generator.makeElement('div', {class: 'container'}, [
                    Generator.makeElement('div', {class: 'col'}, [
                        Generator.makeElement('h2', {class: 'title-content'}, ['Discapacidad Motriz']),
                        Generator.makeElement('div', {class: 'icon-chair'}),
                        Generator.makeElement('p', {class: 'top-content'}, ['Completar lucas palavecino'])
                    ]),

                    Generator.makeElement('div', {class: 'col'}, [
                      
                    ]),
                ])
            ])
        )
    }

    const getDependencies = ()=>{
        const dependenciesIdNav = {
            'home': renderHome,
            'access': renderLoggin, 
            'reserva': renderReserva,
            'visitadigital': renderDigitalVisit,
            'accesibilidad': renderAccesibility
        }

        return dependenciesIdNav;
    }

    return {
        startUp: function () {

        
            renderHome();

        }
    }

}
