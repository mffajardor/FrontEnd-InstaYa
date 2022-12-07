import React, {useEffect, useState} from 'react'
import Navbarcomp from '../components/MainPage/Navbarcomp'

// Importar la tabla
import Tablecomp from "../components/MainPage/Tablecomp";
import Formcomp from "../components/MainPage/Formcomp";

function AppEnvios() {
    const [form, setForm] = useState([]);
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
            });
        };

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

  function editarTarea(id) {
    // Pasando los datos de la BD al formulario -${} => Parametro
    fetch(`http://localhost:5000/api/task/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        // Actualizar formulario con setForm
        setForm({
          // idPaquete: data.idPaquete,
          title: data.title,
          description: data.description,
          entregafecha: data.entregafecha,
          ciudadEntrega: data.ciudadEntrega,
          direccionEntrega: data.direccionEntrega,
          horaEntrega: data.horaEntrega,
          estado: data.estado,
          ancho: data.ancho,
          alto: data.alto,
          profundidad: data.profundidad,
          peso: data.peso,
          ciudadOrigen: data.ciudadOrigen,
          direccionOrigen: data.direccionOrigen,
          isFragile: data.isFragile,
        
          _id: data._id, // Necesario para saber si es actualizacion o creacion
        });
      });
    obtenerTareas();
  }

  return (
    <>
    <Navbarcomp/>
    <br></br>
    {/* Agrego el componente de la Tabla - Componente Hijo de Form */}
    <Tablecomp
            data={db}
            obtenerTareas={obtenerTareas}
            eliminarTarea={eliminarTarea}
            editarTarea={editarTarea}
        />
     <br></br>
    {/* En el formulario se tenga todos los datos de la BD y propiedades - Componente Hijo de App  */}
    {/* <Formcomp db={db}  obtenerTareas = {obtenerTareas} eliminarTarea={eliminarTarea}/>    */}
    </>
        
  )
}

export default AppEnvios