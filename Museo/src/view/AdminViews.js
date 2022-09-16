import checkSession from '../middleware/checkUser';
import consumeAPI from '../services/api.service';
import MuseoRender, {ElementGenerator, ElementManagement} from '../services/render.service.js'
import { deleteSession } from '../controller/Session';

const Generator = new ElementGenerator();
const Manager = new ElementManagement();
const MREnder = new MuseoRender();




export default function AdminViewsController(){
    const preventSessionFail = () => {
        if (checkSession()) {
            return true;
        } 
        
        MREnder.startUp();
        return false;
    }

    

    const setViews = (dependenciesIdNav) => {
        const callViews = Object.values(dependenciesIdNav);
        const idTags = Object.keys(dependenciesIdNav);

        for (let i=0 ; i<idTags.length ; i++) {
            Manager.listenerAdder(idTags[i], 'click', callViews[i])
        }
    }

    
    const renderNav = (dependenciesIdNav) => {
        if (preventSessionFail()) {
            const root =  document.getElementById('nav');
            Generator.removeAllElements(root);
        
            document.getElementById('nav').appendChild(
                Generator.makeElement('ul', {class: 'nav-bar_box'}, [
                    Generator.makeElement('li', {id: 'home', class: 'nav-bar_element'}, [
                        Generator.makeElement('a', {href:"#home"}, 'HOME')
                    ]),
                    Generator.makeElement('li', {id: 'fecha', class: 'nav-bar_element'}, [
                        Generator.makeElement('a', {href:"#fecha"}, 'MANEJAR FECHAS')
                    ]),
                    Generator.makeElement('li', {id: 'exposiciones', class: 'nav-bar_element'}, [
                        Generator.makeElement('a', { href:"#exposiciones"}, 'MANEJAR EXPOSICIONES')
                    ]),
                    Generator.makeElement('li', {id: 'guias', class: 'nav-bar_element'}, [
                        Generator.makeElement('a', { href:"#guias"}, 'MANEJAR GUIAS')
                    ]),
                    Generator.makeElement('li', {id: 'access', class: 'nav-bar_element'}, [
                        Generator.makeElement('a', {href:"#user"}, 'SALIR')
                    ])
                ])
            )
        
            Manager.classAdder('home', 'nav-bar_icon'); 
            Manager.classAdder('home', 'active'); 
        
            Manager.classAdder('access', 'right'); 
            setViews(dependenciesIdNav)
        }
    }

    
    const renderHome = () => {
        if (preventSessionFail()) {
            Generator.removeAllElements(Generator.getRoot());
            renderNav(getDependencies());
            
            Generator.getRoot() 
            .appendChild(Generator.makeElement('article', {class: 'article', id: 'article'}, [
                Generator.makeElement('h1', {class: 'display-5'}, ['Bienvenido denuevo!']),
                Generator.makeElement('p', {}, ['Texto Ejemplo'])
            ]));

            Manager.setActiveClass(Object.keys(getDependencies()), 'home')
        }
    }

    const renderFechas = () => {
        if (preventSessionFail()) {
            Generator.removeAllElements(Generator.getRoot());
            Manager.setActiveClass(Object.keys(getDependencies()), 'fecha')

            Generator.getRoot() 
            .appendChild(Generator.makeElement('article', {class: 'article', id: 'article-content'}));

            document.getElementById('article-content')
            .appendChild(Generator.makeElement('h1', {class: 'h1-display-table'}, ['Fechas de Visita']));
    

            document.getElementById('article-content')
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
                    Generator.makeElement('td', {}, ['OPCIONES']),
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
                                    Generator.makeElement('button', {id: 'put-table-button', class: 'put-button'}, ['Editar']),
                                    Generator.makeElement('button', {id: 'delete-table-button', class: 'delete-button'}, ['Eliminar'])
                                ])
                            ])
                        ])
                    )
                })
            })
    
            document.getElementById('row-1')
            .appendChild(Generator.makeElement('div', {class: 'dashboard-container'}, [
                Generator.makeElement('button', {id: 'add-table-button', class: 'form-submit-xl'}, ['Agregar'])
            ]))

            let buttonClose;
            let selectGuia;
            const cardElement = Generator.makeElement('form', { method: 'POST', class: 'content-card', action: '' }, [
                Generator.makeElement("h1", {id:'card-header', class: "card-header"}, ['Generar Visita']),
                buttonClose = Generator.makeElement("button", {id:'card-closer', class: "card-close"}, ['Cerrar']),
                Generator.makeElement("input", {id:'card-fecha', name: 'fecha', type: "datetime-local", class: 'form-date' }),
                selectGuia = Generator.makeElement("select", {id:'card-guia', name: 'guia', class: "form-select"}, ['Guia']),
                Generator.makeElement("input", {id:'card-submit', name: 'submit', class: "form-submit", type: "submit"}),
            ])

            const urlGuiaContent = '';
            /*consumeAPI()*/
            const putGuiaContent = (x)=>{
                if (x !== undefined && x.length > 0) {
                    x.map(
                        selectGuia.appendChild(Generator.makeElement('option', 
                        {value: `${x.idGuia}`}, [`${x.nombre} ${x.apellido} (${x.idioma})`]))
                    )
                } else {
                    selectGuia.appendChild(Generator.makeElement('option', {value: '1'}, ['Dato Prueba']))
                }
            } 
            putGuiaContent(undefined);
            


            Manager.listenerAdder('add-table-button', 'click', (e)=>{
                document.getElementById('row-2')
                .appendChild(cardElement)
            })

            buttonClose.addEventListener('click', (e)=>{
                document.getElementById('row-2')
                .removeChild(cardElement)
            })


            const urlPOSTVisita = '';
            cardElement.addEventListener ('submit', (event)=>{
                /*CONSUME api*/ 
                event.preventDefault();
                const data = new FormData(event.target);
                const dataParse = [...data.values()]

                const dateVisita = new Date(dataParse[0]);
                const idGuia = dataParse[1];

                console.log({
                    data:{
                        fecha: 
                        `${dateVisita.getDate()}-${(dateVisita.getMonth())+1}-${dateVisita.getFullYear()}`,
                        hora:
                        `${("0" + dateVisita.getHours()).slice(-2)}:${("0" + dateVisita.getMinutes()).slice(-2)}`,
                        guiaId: parseInt(idGuia)
                    }
                })

               
            })

        }
       
        
    }

    const renderExposiciones = () => {
        if (preventSessionFail()) {
            Generator.removeAllElements(Generator.getRoot());
            Manager.setActiveClass(Object.keys(getDependencies()), 'exposiciones')

            Generator.getRoot() 
            .appendChild(Generator.makeElement('article', {class: 'article', id: 'article-content'}));

            document.getElementById('article-content')
            .appendChild(Generator.makeElement('h1', {class: 'h1-display-table'}, ['Lista de Exposiciones']));
    

            document.getElementById('article-content')
            .appendChild(Generator.makeElement('div', {class: 'container'}, [
                Generator.makeElement('div', {id: 'row-1', class: 'row'}),
                Generator.makeElement('div', {id: 'row-2', class: 'row'})
            ]));
        
            document.getElementById('row-1')
            .appendChild(
                Generator.makeElement('table', {class: 'table-date'}, [
                Generator.makeElement('tr', {}, [
                    Generator.makeElement('td', {}, ['NOMBRE']),
                    Generator.makeElement('td', {}, ['...']),
                ]), 
                Generator.makeElement('tr', {id: 'content-table'})
            ]))
    
            const APIURL = '';
            const focus = document.getElementById('content-table');
            consumeAPI(APIURL, {}).then( data => {
                data.map(e => {
                    focus.appendChild(
                        Generator.makeElement('tr', {}, [
                            Generator.makeElement('td', {}, [e.nombre]),
                            Generator.makeElement('td', {}, [e.content]),
                            Generator.makeElement('td', {}, [e.content]),
                            Generator.makeElement('td', {}, [e.content]),
                            Generator.makeElement('td', {}, [
                                Generator.makeElement('div', {class: 'dashboard-container'}, [
                                    Generator.makeElement('button', {id: 'put-table-button', class: 'put-button'}, ['Editar']),
                                    Generator.makeElement('button', {id: 'delete-table-button', class: 'delete-button'}, ['Eliminar'])
                                ])
                            ])
                        ])
                    )
                })
            })
    
            document.getElementById('row-1')
            .appendChild(Generator.makeElement('div', {class: 'dashboard-container'}, [
                Generator.makeElement('button', {id: 'add-table-button', class: 'form-submit-xl'}, ['Agregar'])
            ]))

            let buttonClose;
            const cardElement = Generator.makeElement('form', { method: 'POST', class: 'content-card', action: '' }, [
                Generator.makeElement("h1", {id:'card-header', class: "card-header"}, ['Generar Exposición']),
                buttonClose = Generator.makeElement("button", {id:'card-closer', class: "card-close"}, ['Cerrar']),


                Generator.makeElement("input", {id:'card-nombreexpo', name: 'nombreexpo', type: "text", placeholder: 'Nombre Exposicion...',class: 'form-text' }),
                Generator.makeElement("input", {id:'card-contentASD', name: 'contentASD', type: "text", placeholder: '...',class: 'form-text' }),


                Generator.makeElement("input", {id:'card-submit', name: 'submit', class: "form-submit", type: "submit"}),
            ]) 


            Manager.listenerAdder('add-table-button', 'click', (e)=>{
                document.getElementById('row-2')
                .appendChild(cardElement)
            })

            buttonClose.addEventListener('click', (e)=>{
                document.getElementById('row-2')
                .removeChild(cardElement)
            })


            const urlPOSTExpo = '';
            cardElement.addEventListener ('submit', (event)=>{
                /*CONSUME api*/ 
                event.preventDefault();
                const data = new FormData(event.target);
                const dataParse = [...data.values()]

    
                console.log({
                    data:{
                        'nombre-expo': dataParse[0]
                    }
                })

               
            })

        }
       
        
    }

    const renderGuias = () => {
        if (preventSessionFail()) {
            Generator.removeAllElements(Generator.getRoot());
            Manager.setActiveClass(Object.keys(getDependencies()), 'guias')

            Generator.getRoot() 
            .appendChild(Generator.makeElement('article', {class: 'article', id: 'article-content'}));

            document.getElementById('article-content')
            .appendChild(Generator.makeElement('h1', {class: 'h1-display-table'}, ['Lista de Guias']));
    

            document.getElementById('article-content')
            .appendChild(Generator.makeElement('div', {class: 'container'}, [
                Generator.makeElement('div', {id: 'row-1', class: 'row'}),
                Generator.makeElement('div', {id: 'row-2', class: 'row'})
            ]));
        
            document.getElementById('row-1')
            .appendChild(
                Generator.makeElement('table', {class: 'table-date'}, [
                Generator.makeElement('tr', {}, [
                    Generator.makeElement('td', {}, ['Nombre Completo']),
                    Generator.makeElement('td', {}, ['DNI']),
                    Generator.makeElement('td', {}, ['Idiomas']),
                ]), 
                Generator.makeElement('tr', {id: 'content-table'})
            ]))
    
            const APIURL = '';
            const focus = document.getElementById('content-table');
            consumeAPI(APIURL, {}).then( data => {
                data.map(e => {
                    focus.appendChild(
                        Generator.makeElement('tr', {}, [
                            Generator.makeElement('td', {}, [`${e.nombre} ${e.apellido}`]),
                            Generator.makeElement('td', {}, [e.dni]),
                            Generator.makeElement('td', {}, [e.idioma]),
                            Generator.makeElement('td', {}, [
                                Generator.makeElement('div', {class: 'dashboard-container'}, [
                                    Generator.makeElement('button', {id: 'put-table-button', class: 'put-button'}, ['Editar']),
                                    Generator.makeElement('button', {id: 'delete-table-button', class: 'delete-button'}, ['Eliminar'])
                                ])
                            ])
                        ])
                    )
                })
            })
    
            document.getElementById('row-1')
            .appendChild(Generator.makeElement('div', {class: 'dashboard-container'}, [
                Generator.makeElement('button', {id: 'add-table-button', class: 'form-submit-xl'}, ['Agregar'])
            ]))

            let buttonClose;
            let checkContainer;
            const cardElement = Generator.makeElement('form', { method: 'POST', class: 'content-card', action: '' }, [
                Generator.makeElement("h1", {id:'card-header', class: "card-header"}, ['Añadir Guia']),
                buttonClose = Generator.makeElement("button", {id:'card-closer', class: "card-close"}, ['Cerrar']),


                Generator.makeElement("input", {id:'card-nombre-guia', name: 'nombre-guia', type: "text", placeholder: 'Nombre...',class: 'form-text-inline' }),
                Generator.makeElement("input", {id:'card-apellido-guia', name: 'apellido-guia', type: "text", placeholder: 'Apellido...',class: 'form-text-inline' }),
                Generator.makeElement("input", {id:'card-dni-guia', name: 'dni-guia', type: "number", placeholder: 'DNI',class: 'form-text-full' }),
                checkContainer=Generator.makeElement("div", {id:'card-idiomas-guia', name: 'idiomas-guia', class: 'container' }),



                Generator.makeElement("input", {id:'card-submit', name: 'submit', class: "form-submit", type: "submit"}),
            ]) 


            Manager.listenerAdder('add-table-button', 'click', (e)=>{
                document.getElementById('row-2')
                .appendChild(cardElement)
            })

            buttonClose.addEventListener('click', (e)=>{
                document.getElementById('row-2')
                .removeChild(cardElement)
            })

            const urlIdiomasContent = '';
            /*consumeAPI()*/
            const putGuiaIdiomasContent = (x)=>{
                if (x !== undefined && x.length > 0) {
                    x.map(
                        checkContainer
                        .appendChild(Generator.makeElement('div', {}, [
                            Generator.makeElement('input', {name: 'idioma[]', type: 'checkbox', value: x.idIdioma}),
                            Generator.makeElement('label', {for: ''}, [x.nombreIdioma])
                        ]))
                    )
                } else {
                    checkContainer
                    .appendChild(Generator.makeElement('div', {}, [
                        Generator.makeElement('input', {name: 'idioma[]', type: 'checkbox', value: '1'}, ['Español']),
                        Generator.makeElement('label', {for: ''}, ['Español'])
                    ]))

                    checkContainer
                    .appendChild(Generator.makeElement('div', {}, [
                        Generator.makeElement('input', {name: 'idioma[]', type: 'checkbox', value: '2'}, ['Ingles']),
                        Generator.makeElement('label', {for: ''}, ['Ingles'])
                    ]))

                    checkContainer
                    .appendChild(Generator.makeElement('div', {}, [
                        Generator.makeElement('input', {name: 'idioma[]', type: 'checkbox', value: '2'}, ['Ingles']),
                        Generator.makeElement('label', {for: ''}, ['Ingles'])
                    ]))

                    checkContainer
                    .appendChild(Generator.makeElement('div', {}, [
                        Generator.makeElement('input', {name: 'idioma[]', type: 'checkbox', value: '2'}, ['Ingles']),
                        Generator.makeElement('label', {for: ''}, ['Ingles'])
                    ]))

                    checkContainer
                    .appendChild(Generator.makeElement('div', {}, [
                        Generator.makeElement('input', {name: 'idioma[]', type: 'checkbox', value: '2'}, ['Ingles']),
                        Generator.makeElement('label', {for: ''}, ['Ingles'])
                    ]))

                    checkContainer
                    .appendChild(Generator.makeElement('div', {}, [
                        Generator.makeElement('input', {name: 'idioma[]', type: 'checkbox', value: '2'}, ['Ingles']),
                        Generator.makeElement('label', {for: ''}, ['Ingles'])
                    ]))
                }
            } 
            putGuiaIdiomasContent(undefined);
            

            const urlPOSTGuia = '';
            cardElement.addEventListener ('submit', (event)=>{
                /*CONSUME api*/ 
                event.preventDefault();
                const data = new FormData(event.target);
                const dataParse = [...data.values()]

                if (dataParse.length > 3) {
                    const idiomas = dataParse.splice(3, dataParse.length);
                    console.log({
                        data:{
                            nombre: dataParse[0],
                            apellido: dataParse[1],
                            dni: dataParse[2],

                            idioma: [...idiomas]
                        }
                    })
                }else{
                    alert('Need idioma!');
                }
    


               
            })

        }
       
        
    }


    const logOut = () => {
        deleteSession();
        MREnder.startUp();
    }

    const getDependencies = ()=>{
        const dependenciesIdNav = {
            'home': renderHome,
            'fecha': renderFechas, 
            'exposiciones': renderExposiciones,
            'guias': renderGuias,
            'access': logOut
        }

        return dependenciesIdNav;
    }



    return  {
        startUp: function () {
            if (preventSessionFail()) {
                renderHome();
            }
        }
    }
}

