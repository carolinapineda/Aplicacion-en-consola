const fs = require('fs');

const archivo = './db/data.json';

// Funcion para guardar las tareas en un archivo 
const guardarInfo = (data) =>{

    fs.writeFileSync(archivo, JSON.stringify(data));
}

const leerInfo = ()=>{

    // Si el archivo no existe 
    if(!fs.existsSync(archivo)){
        return null;
    }

    // ReadFile es para leer el archivo de manera sincrona
    const info = fs.readFileSync(archivo, { encoding: 'utf-8' });
    const data = JSON.parse(info);

    // console.log(data);


    return data;
}


module.exports = {
    guardarInfo,
    leerInfo
}
