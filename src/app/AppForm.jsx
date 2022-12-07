import React, {useEffect, useState} from 'react'
import Navbarcomp from '../components/MainPage/Navbarcomp'
import Formcomp from '../components/MainPage/Formcomp';




function App() {

  // Variables de estado - De la base de datos
  const [db, setdb] = useState([]);
  useEffect(() => {
    obtenerTareas();   
  }, [ ])

  

  // Creando función de eliminar
  function eliminarTarea(id) {
    if (confirm('Estas seguro de eliminar la tarea?')) {
      // Concatenando ruta en el API Task - ` - Backstick
      fetch(`http://localhost:5000/api/task/${id}`,{ 
        // Los metodos que van
        method: 'DELETE',
        headers: { 
          Accept: "aplication/json",
          'Content-Type': 'application/json'
          }
      })
      .then(res => res.json())
      .then(data => {
        console.log({data});
        alert("Tarea eliminada")
      })
    }
    obtenerTareas()
  }
  
  function obtenerTareas() {
    // Con el evento fetch - Ruta para obtener todas las tareas
    fetch("http://localhost:5000/api/task")
    .then(res => res.json())
    .then(data => {
      console.log(data)
      console.log("Componente montado");
      setdb(data);
    })
    .catch(err => console.error(err))
  }



  return (
    <> 
    <Navbarcomp/>
    <br></br>
    {/* En el formulario se tenga todos los datos de la BD y propiedades - Componente Hijo de App  */}
    <Formcomp db={db}  obtenerTareas = {obtenerTareas} eliminarTarea={eliminarTarea}/>
    <br></br>
   
    </> 
  )
}

export default App