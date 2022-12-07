import React from 'react'
import Table from 'react-bootstrap/Table';
import Container from "react-bootstrap/Container";

import TablaRow from './TablaRow';

function Tablecomp({data, eliminarTarea, editarTarea, obtenerTareas}) {
  return (
    <Container>
        <Table striped bordered hover size="sm">
      <thead>
        <tr align='center'>
          <th>Nombre de Destinatario</th>
          <th>Fecha de Entrega</th>
          <th>Ciudad de Entrega</th>
          <th>Dirección de Entrega</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      {/* Operador ternario: Combinando las 3 columnas en una sola - Colspan */}
      {/* elem - Iterador de cada una de las filas de la tabla */}
      {/* TablaRow se busca su key y elem - Componente Hijo */}
      <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="3">No Data</td>
            </tr>
          ) : (
            data.map(elem => (<TablaRow key={elem._id} elem={elem} eliminarTarea={eliminarTarea} editarTarea={editarTarea}/>))
          )}
        </tbody>
    </Table>

    </Container>
  )
}

export default Tablecomp