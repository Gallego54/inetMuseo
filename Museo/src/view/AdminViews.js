import checkSession from '../middleware/checkUser';
import consumeAPI from '../services/api.service';
import MuseoRender, {ElementGenerator, ElementManagement, TemplateProvider} from '../services/render.service.js'
import { deleteSession } from '../controller/Session';




import { sendForm } from '../controller/Form';




const Generator = new ElementGenerator();
const Manager = new ElementManagement();
const Template = new TemplateProvider();
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
                    Generator.makeElement('li', {id: 'salas', class: 'nav-bar_element'}, [
                        Generator.makeElement('a', { href:"#salas"}, 'MANEJAR SALAS')
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
                Generator.makeElement('p', {}, ['Recuerde que puede administrar los datos de las Visitas Guiadas, como de los Guias. No olvide revisar los dni de los visitantes'])
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
        

            const TableContainer =  
            Template.ContainerRecordList(['FECHA', 'HORA', 'IDIOMAS', 'OPCIONES'])
            document.getElementById('row-1').appendChild(TableContainer)

            const listPath = '/';
            const TableContent = Template.ContentRecordList({apiUrl: listPath, method: 'GET'},{
                primaryKey: 'id', 
                keys: ['fecha', 'hora', 'guia', 'idiomas']
            },
            [  Generator.makeElement('button', {id: 'put-table-button', class: 'put-button'}, ['Editar']),
            Generator.makeElement('button', {id: 'delete-table-button', class: 'delete-button'}, ['Eliminar'])]);

            TableContent.then(content => {
                document.getElementById(TableContainer).appendChild(content)
            
                const allEditButtons =  document.querySelectorAll("#put-table-button");
                allEditButtons.forEach(button => {
                    button.addEventListener('click', event => {
                        console.log(event.target.value)
                    });
                })
    
                const allDeleteButtons =  document.querySelectorAll("#delete-table-button");
                allDeleteButtons.forEach (button => {
                    button.addEventListener('click', event => {
                        console.log(event.target.value)
                    })
                });
            })


            document.getElementById('row-1')
            .appendChild(Generator.makeElement('div', {class: 'dashboard-container'}, [
                Generator.makeElement('button', {id: 'add-table-button', class: 'form-submit-xl'}, ['Agregar'])
            ]))

            let selectGuia;
            const cardElement = Template.SubmitCard(
                'row-2', 'Generar Exposición',
                [
                    Generator.makeElement("input", {id:'card-fecha', name: 'fecha', type: "datetime-local", class: 'form-date' }),
                    selectGuia = Generator.makeElement("select", {id:'card-guia', name: 'guia', class: "form-select"}, ['Guia']),
                ]
            );


            Manager.listenerAdder('add-table-button', 'click', (e)=>{
                document.getElementById('row-2')
                .appendChild(cardElement)
            })


            
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

     

            const urlPOSTVisita = '';
            cardElement.addEventListener ('submit', (event)=>{
                /*CONSUME api*/ 
                event.preventDefault();
                const data = new FormData(event.target);
                const dataParse = [...data.values()]

                const dateVisita = new Date(dataParse[0]);
                const idGuia = dataParse[1];

                                    
                sendForm({url: urlPOSTVisita, method:'POST' }, {
                    fecha:`${dateVisita.getDate()}-${(dateVisita.getMonth())+1}-${dateVisita.getFullYear()}`,
                    hora: `${("0" + dateVisita.getHours()).slice(-2)}:${("0" + dateVisita.getMinutes()).slice(-2)}`,
                    guiaId: parseInt(idGuia)
                }, ['', undefined]).then(msg => {
                    renderFechas();
                    alert(msg.success)
                }).catch(msg => alert(msg.error))
                        
                        
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
        
            const TableContainer =  
            Template.ContainerRecordList(['Nombre', 'Descripcion'])
            document.getElementById('row-1').appendChild(TableContainer)

            const listPath = '/';
            const TableContent = Template.ContentRecordList({apiUrl: listPath, method: 'GET'},{
                primaryKey: 'id', 
                keys: ['nombre', 'descripcion']
            },
            [  Generator.makeElement('button', {id: 'put-table-button', class: 'put-button'}, ['Editar']),
            Generator.makeElement('button', {id: 'delete-table-button', class: 'delete-button'}, ['Eliminar'])]);

            TableContent.then(content => {
                document.getElementById(TableContainer).appendChild(content)
            
                const allEditButtons =  document.querySelectorAll("#put-table-button");
                allEditButtons.forEach(button => {
                    button.addEventListener('click', event => {
                        console.log(event.target.value)
                    });
                })
    
                const allDeleteButtons =  document.querySelectorAll("#delete-table-button");
                allDeleteButtons.forEach (button => {
                    button.addEventListener('click', event => {
                        console.log(event.target.value)
                    })
                });
            })

    
            document.getElementById('row-1')
            .appendChild(Generator.makeElement('div', {class: 'dashboard-container'}, [
                Generator.makeElement('button', {id: 'add-table-button', class: 'form-submit-xl'}, ['Agregar'])
            ]))





            const cardElement = Template.SubmitCard(
                'row-2', 'Generar Exposición',
                [
                    Generator.makeElement("input", {id:'card-titulo', name: 'titulo', type: "text", placeholder: 'Nombre Exposicion...',class: 'form-text' }),
                    Generator.makeElement("input", {id:'card-descipcion', name: 'descipcion', type: "text", placeholder: 'Descripcion',class: 'form-text' }),
                ]
            );


            Manager.listenerAdder('add-table-button', 'click', (e)=>{
                document.getElementById('row-2')
                .appendChild(cardElement)
            })

            

            const urlPOSTExpo = '';
            cardElement.addEventListener ('submit', (event)=>{
                /*CONSUME api*/ 
                event.preventDefault();
                const data = new FormData(event.target);
                const dataParse = [...data.values()]

                sendForm({url: urlPOSTExpo, method:'POST' }, {
                    'titulo': dataParse[0],
                    'descipcion': dataParse[1]
                }, ['', undefined]).then(msg => {
                    renderExposiciones();
                    alert(msg.success);
                }).catch(msg => alert(msg.error))
               
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
    
           
            const TableContainer =  
            Template.ContainerRecordList(['Nombre Completo', 'DNI', 'Idiomas', 'Operaciones'])
            document.getElementById('row-1').appendChild(TableContainer)

            const listPath = '/ListarGuias';
            const TableContent = Template.ContentRecordList({apiUrl: listPath, method: 'GET'},{
                primaryKey: 'idGuia', 
                keys: ['nombre', 'apellido', 'dni', 'idioma']
            },
            [  Generator.makeElement('button', {id: 'put-table-button', class: 'put-button'}, ['Editar']),
            Generator.makeElement('button', {id: 'delete-table-button', class: 'delete-button'}, ['Eliminar'])]);

            TableContent.then(content => {
                document.getElementById(TableContainer).appendChild(content)
            
                const allEditButtons =  document.querySelectorAll("#put-table-button");
                allEditButtons.forEach(button => {
                    button.addEventListener('click', event => {
                        console.log(event.target.value)
                    });
                })
    
                const allDeleteButtons =  document.querySelectorAll("#delete-table-button");
                allDeleteButtons.forEach (button => {
                    button.addEventListener('click', event => {
                        console.log(event.target.value);
    
                        const urlDelGuia = '/cambiarEstadoGuia';
                        sendForm({url: urlDelGuia, method:'POST' }, {
                            idGuia: event.target.value
                        }, ['', undefined]).then(msg => {
                            renderGuias();
                            alert(msg.success);
                        }).catch(msg => alert(msg.error))
                    })
                });
            })


       

    
            document.getElementById('row-1')
            .appendChild(Generator.makeElement('div', {class: 'dashboard-container'}, [
                Generator.makeElement('button', {id: 'add-table-button', class: 'form-submit-xl'}, ['Agregar'])
            ]))

      
            let checkContainer;
            const cardElement = Template.SubmitCard(
                'row-2', 'Añadir Guia',
                [
                    Generator.makeElement("input", {id:'card-nombre-guia', name: 'nombre-guia', type: "text", placeholder: 'Nombre...',class: 'form-text-inline' }),
                    Generator.makeElement("input", {id:'card-apellido-guia', name: 'apellido-guia', type: "text", placeholder: 'Apellido...',class: 'form-text-inline' }),
                    Generator.makeElement("input", {id:'card-dni-guia', name: 'dni-guia', type: "number", placeholder: 'DNI',class: 'form-text-full' }),
                    checkContainer=Generator.makeElement("div", {id:'card-idiomas-guia', name: 'idiomas-guia', class: 'container' }),
                ]
            );


            Manager.listenerAdder('add-table-button', 'click', (e)=>{
                document.getElementById('row-2')
                .appendChild(cardElement)
            })



            
            const urlIdiomasContent = '/listarIdioma';
            consumeAPI(urlIdiomasContent, {method: 'GET'})
            .then((data) => {
                   /* console.log(data)
                    console.log(checkContainer);*/
                    data.forEach(x => {
                        checkContainer
                        .appendChild(Generator.makeElement('div', {}, [
                            Generator.makeElement('input', {name: 'idioma[]', type: 'checkbox', value: x.idIdioma}),
                            Generator.makeElement('label', {for: ''}, [x.idioma])
                        ]))
                    });
                }
            )
            

            const urlPOSTGuia = '/GuiaRegister';
            cardElement.addEventListener ('submit', (event)=>{
                /*CONSUME api*/ 
                event.preventDefault();
                const data = new FormData(event.target);
                const dataParse = [...data.values()]
                const idiomas = dataParse.splice(3, dataParse.length);

                sendForm({url: urlPOSTGuia, method:'POST' }, {
                    "dni": dataParse[2],
                    "nombre": dataParse[0],
                    "apellido": dataParse[1],
                    "IdIdioma": idiomas[0]
                }, ['', undefined]).then(msg => {
                    renderGuias();
                    alert(msg.success);
                }).catch(msg => alert(msg.error))
            })

        }
    }

    
    const renderSalas = () => {
        if (preventSessionFail()) {
            Generator.removeAllElements(Generator.getRoot());
            Manager.setActiveClass(Object.keys(getDependencies()), 'salas')

            Generator.getRoot() 
            .appendChild(Generator.makeElement('article', {class: 'article', id: 'article-content'}));

            document.getElementById('article-content')
            .appendChild(Generator.makeElement('h1', {class: 'h1-display-table'}, ['Lista de Salas del Museo']));
    

            document.getElementById('article-content')
            .appendChild(Generator.makeElement('div', {class: 'container'}, [
                Generator.makeElement('div', {id: 'row-1', class: 'row'}),
                Generator.makeElement('div', {id: 'row-2', class: 'row'})
            ]));
        
            

            const apiUrlSalas = '';

            const TableContainer = Template.ContainerRecordList(['ID', 'NOMBRE', 'OPERACIONES']);
            document.getElementById('row-1').appendChild(TableContainer);

            const TableContent = Template.ContentRecordList({apiUrl: apiUrlSalas, method: 'POST'},  {primaryKey: 'id', keys: ['id', 'nombre']},
            [ Generator.makeElement('button', {id: 'put-table-button', class: 'put-button'}, ['Editar']),
            Generator.makeElement('button', {id: 'delete-table-button', class: 'delete-button'}, ['Eliminar'])]);
            
            TableContent.then(content => {
                document.getElementById(TableContainer).appendChild(content)
            
                const allEditButtons =  document.querySelectorAll("#put-table-button");
                allEditButtons.forEach(button => {
                    button.addEventListener('click', event => {
                        console.log(event.target.value)
                    });
                })
    
                const allDeleteButtons =  document.querySelectorAll("#delete-table-button");
                allDeleteButtons.forEach (button => {
                    button.addEventListener('click', event => {
                        console.log(event.target.value)
                    });
                })
            })



            
            const allEditButtons =  document.querySelectorAll("#put-table-button");
            allEditButtons.forEach(button => {
                button.addEventListener('click', event => {
                    console.log(event.target.value)
                });
            })

            const allDeleteButtons =  document.querySelectorAll("#delete-table-button");
            allDeleteButtons.forEach (button => {
                button.addEventListener('click', event => {
                    console.log(event.target.value)
                });
            })

            const cardElement = Template.SubmitCard(
                'row-2', 'Agregar Sala',
                [
                    Generator.makeElement("input", {id:'card-titulo', name: 'titulo', type: "text", placeholder: 'Nombre de Sala...',class: 'form-text' }),
                    Generator.makeElement("input", {id:'card-descipcion', name: 'descipcion', type: "text", placeholder: 'Descripcion de Sala...',class: 'form-text' })
                ]
            );

            document.getElementById('row-1')
            .appendChild(Generator.makeElement('div', {class: 'dashboard-container'}, [
                Generator.makeElement('button', {id: 'add-table-button', class: 'form-submit-xl'}, ['Agregar'])
            ]))

            Manager.listenerAdder('add-table-button', 'click', (e)=>{
                document.getElementById('row-2')
                .appendChild(cardElement)
            })





            const urlPOSTSalas = '';
            cardElement.addEventListener ('submit', (event)=>{
                /*CONSUME api*/ 
                event.preventDefault();
                const data = new FormData(event.target);
                const dataParse = [...data.values()]

                
                sendForm({url: urlPOSTSalas, method:'POST' }, {
                    'nombre-expo': dataParse[0],
                    'descripcion-expo': dataParse[1]
                }, ['', undefined]).then(msg => {
                    renderSalas();
                    alert(msg.success);
                }).catch(msg => alert(msg.error))
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
            'salas': renderSalas,
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

