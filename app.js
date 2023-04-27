// Para requerir el paquete colors con (require)
const colors = require('colors');
const { inquirerMenu, pausa, leerInput, tareasBorrar,confirmar,mostrarListadoChecklist } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');
const { guardarInfo, leerInfo} = require('./helpers/guardarArchivos');


const main = async()=>{

    const tareas = new Tareas();

    let opt = '';
    const tareasDB = leerInfo();

    // Si tareas DB existe
    if(tareasDB){
        // Establecer tareas
        // Cargar tareas
        tareas.cargarTareas(tareasDB);
    }

  

    do{
        // Imprimir el menu
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion:'); 
                tareas.crearTarea(desc);
            break;

            case '2':
                tareas.listadoCompleto(tareasDB);
            break;

            case '3':
                tareas.listaTareasCompletadas(true);
            break;

            case '4':
                tareas.listaTareasCompletadas(false);
            break;

            case '5':
                const ids = await mostrarListadoChecklist(tareas.listadoArr)
                tareas.toggleCompletadas(ids);
            break;

            case '6':
                const id = await tareasBorrar(tareas.listadoArr);
                if(id !=='0'){
                const ok = await confirmar('¿Estas seguro');
                if(ok){
                    tareas.borrarTareas(id);
                    console.log('\nTarea eliminada correctamente');
                    }
                }
            break;
    
        }

        guardarInfo(tareas.listadoArr);

        await pausa();

    }while(opt !== '0');

}

main();