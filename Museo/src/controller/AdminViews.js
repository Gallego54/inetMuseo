import checkSession from '../middleware/checkUser';
import consumeAPI from '../services/api.service';
import MuseoRender, {ElementGenerator, ElementManagement} from '../services/render.service.js'


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

    
    const renderNav = () => {
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
                    Generator.makeElement('li', {id: 'access', class: 'nav-bar_element'}, [
                        Generator.makeElement('a', {href:"#user"}, 'SALIR')
                    ])
                ])
            )
        
            Manager.classAdder('home', 'nav-bar_icon'); 
            Manager.classAdder('home', 'active'); 
        
            Manager.classAdder('access', 'right'); 
        }
    }

    
    const renderHome = () => {
        if (preventSessionFail()) {
            Generator.removeAllElements(Generator.getRoot());
            renderNav();
    
            Manager.classAdder('home', 'active');
            Manager.classRemover('fecha', 'active');
            Manager.classRemover('exposiciones', 'active');
            Manager.classRemover('access', 'active');
        }
    }

    const renderFechas = () => {
        if (preventSessionFail()) {
            Generator.removeAllElements(Generator.getRoot());


            Generator.getRoot()
            .appendChild(Generator.makeElement('h1', {class: 'h1-display-table'}, ['Fechas de Visita']));
    
            Generator.getRoot()
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
                Generator.makeElement('button', {id: 'add-table-button', class: 'post-button'}, ['Agregar'])
            ]))

            let buttonClose;
            const cardElement = Generator.makeElement('form', { method: 'POST', class: 'card', action: '' }, [
                Generator.makeElement("h1", {id:'card-header', class: "card-header"}, ['Card']),
                buttonClose = Generator.makeElement("button", {id:'card-closer', class: "card-close"}, ['Cerrar']),
                Generator.makeElement("input", {id:'card-fecha', name: 'fecha', class: "form-text", type: "text"}),
                Generator.makeElement("input", {id:'card-hora', name: 'hora', class: "form-text", type: "text"}),
                Generator.makeElement("input", {id:'card-guia', name: 'guia', class: "form-text", type: "text"}),
                Generator.makeElement("input", {id:'card-idiomas', name: 'idiomas', class: "form-text", type: "text"}),

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



            cardElement.addEventListener ('submit', (event)=>{
                event.preventDefault();
                const data = new FormData(event.target);
                const dataParse = [...data.values()]

                console.log({
                    fecha: dataParse[0],
                    hora: dataParse[1],
                    guia: dataParse[2],
                    idiomas: dataParse[3]
                })
            })

        }
       
        
    }


    return  {
        startUp: function () {
            const dependenciesIdNav = {
                'home': renderHome,
                'fecha': renderFechas, 
                'exposiciones': ()=>{},
                'access': ()=>{}
            }

            if (preventSessionFail()) {
                renderNav();
                renderHome();
                setViews(dependenciesIdNav);
            }
        }
    }
}

