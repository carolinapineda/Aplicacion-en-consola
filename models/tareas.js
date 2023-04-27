require('colors');
const Tarea = require("./tarea");

class Tareas {

    _listado = {};

    get listadoArr(){

        const listado = [];
        Object.keys(this._listado).forEach(key =>{
            const tarea = this._listado[key];
            listado.push(tarea);
        });

        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTareas(id){
        if(this._listado[id]){
            delete this._listado[id]
        }
    }

    cargarTareas(tareas = []){
       tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
       })
    }

    crearTarea(desc = ''){
        const tarea = new Tarea(desc);

        this._listado[tarea.id]=tarea;
    }

    listadoCompleto(){
        
        this.listadoArr.forEach((tarea, i) =>{

            const index = `${i+1}`.green;
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn)
                            ?'Completada'.green
                            :'Pendiente'.red
            console.log(`${(index + '.').green} ${desc} :: ${estado}`);

            // if(tarea.completadoEn === null){
            //     console.log(`${index+1}. ${tarea.desc}`.green);
            // }else if(tarea.completadoEn != null){
            //     console.log(`${index+1}. ${tarea.desc}`.red);
            // }    
        })  
    }

    listaTareasCompletadas(completadas) {
        
        let cont = 0;
        this.listadoArr.forEach(tarea =>{

            const {desc, completadoEn} = tarea;
            const estado = (completadoEn)
                            ?'Completada'.green
                            :'Pendiente'.red
            
            if(completadoEn){
                if(completadas){
                    cont +=1;
                    console.log(`${(cont + '.').green} ${desc} :: ${completadoEn}`);
                }
            }else{
                if(!completadas){
                    cont +=1;
                    console.log(`${(cont + '.').green} ${desc} :: ${estado}`);
                }
            }
    })
}

toggleCompletadas(ids = []){

    ids.forEach(id=>{

        const tarea = this._listado[id];
        if(!tarea.completadoEn){
            tarea.completadoEn = new Date().toISOString()
        }

    });

    this.listadoArr.forEach(tarea =>{

            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
    })
}


}

module.exports = Tareas;