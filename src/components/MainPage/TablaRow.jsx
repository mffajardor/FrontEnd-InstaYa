import React from 'react'
import Button from 'react-bootstrap/Button';

import { LinkContainer } from 'react-router-bootstrap'
import Formcomp from './Formcomp';

function TablaRow({elem, eliminarTarea, editarTarea}) {


  
  return (
    <tr align="center">
    <td>{elem.title}</td>
    <td>{elem.entregafecha}</td>
    <td>{elem.ciudadEntrega}</td>
    <td>{elem.direccionEntrega}</td>
    <td>{elem.estado}</td>
    <td align='center'>
      {/* Entre los botones que cierran y abren */}

      <LinkContainer to={"/userDetails"}>
        <Button onClick={() => editarTarea(elem._id)} size="sm" variant="primary" type="submit">Editar</Button>
      </LinkContainer>
    {" "}
    <Button onClick={() => eliminarTarea(elem._id)} size="sm" variant="danger" type="submit">
          Eliminar 
    </Button>
    </td>
  </tr>
  )
}

export default TablaRow