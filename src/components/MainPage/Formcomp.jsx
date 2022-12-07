import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from 'react-bootstrap/Card';

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// Importar la tabla
import Tablecomp from "./Tablecomp";

// Importante que las "" no tenga espacios
const initialForm = {
  // idPaquete: "",
  title: "",
  description: "",
  entregafecha: "",
  ciudadEntrega: "",
  direccionEntrega: "",
  horaEntrega: "",
  estado: "",
  ancho: "",
  alto: "",
  profundidad: "",
  peso: "",
  ciudadOrigen: "",
  direccionOrigen: "",
  isFragile: "",
  _id: "",
  
};

function Formcomp({ db, obtenerTareas, eliminarTarea }) {
  const [form, setForm] = useState(initialForm);
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

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

  // Actualizando el handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);

    // Coloco if else
    if (form._id) {
      // Creando un evento llamado fetch - Permite enviar las peticiones HTTP
      // Colocar las rutas de la API
      fetch(`http://localhost:5000/api/task/${form._id}`, {
        // PUT -
        method: "PUT",
        body: JSON.stringify({
          // idPaquete: form.idPaquete,
          title: form.title,
          description: form.description,
          entregafecha: form.entregafecha,
          ciudadEntrega: form.ciudadEntrega,
          direccionEntrega: form.direccionEntrega,
          horaEntrega: form.horaEntrega,
          estado: form.estado,
          ancho: form.ancho,
          alto: form.alto,
          profundidad: form.profundidad,
          peso: form.peso,
          ciudadOrigen: form.ciudadOrigen,
          direccionOrigen: form.direccionOrigen,
          isFragile: form.isFragile,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        // .then(res => console.log(res))
        // Then - Le va a entrar data el parametro
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.error(err));
      alert("Tarea modificada");
      obtenerTareas();
      setForm(initialForm);
    } else {
      // Creando un evento llamado fetch - Permite enviar las peticiones HTTP
      // Colocar las rutas de la API
      fetch("http://localhost:5000/api/task", {
        // Navegador manda un encabezado
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        // .then(res => console.log(res))
        // Then - Le va a entrar data el parametro
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.error(err));
      alert("Tarea creada");
      obtenerTareas();
      setForm(initialForm);
    }
  };
  return (
    <>
      <Container>
        <Card>
          <Card.Header> <h2 className="text-center">Envío del Paquete </h2></Card.Header>
          <Card.Body>
          <Form onSubmit={handleSubmit}>
          <Row>
            <Col sm={6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Destinatario - Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Destinatario - CC/NIT</Form.Label>
                <Form.Control
                  // as="textarea"
                  type="text"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <br />

          <Row>
            <Col sm={6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Entrega - Fecha</Form.Label>
                <Form.Control
                  type="date"
                  name="entregafecha"
                  value={form.entregafecha}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Entrega - Hora</Form.Label>
                <Form.Control
                  // as="textarea"
                  type="text"
                  name="horaEntrega"
                  value={form.horaEntrega}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <br />

          <Row>
            <Col sm={6}>
              <Form.Group as={Col} controlId="formGridFragile">
                <Form.Label>¿La mercancia es frágil?</Form.Label>
                <Form.Select defaultValue="N/A..."
                type="text"
                name="isFragile"
                value={form.isFragile}
                onChange={handleChange}>
                  <option>N/A</option>
                  <option>No</option>
                  <option>Si</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Estado</Form.Label>
                <Form.Select defaultValue="N/A..."
                type="text"
                name="estado"
                value={form.estado}
                onChange={handleChange}>
                  <option>N/A</option>
                  <option>Cancelado</option>
                  <option>Guardado</option>
                  <option>Cumplido</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <br />

          <Row>
            <Col sm={3}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Ancho(cm)</Form.Label>
                <Form.Control
                  type="text"
                  name="ancho"
                  value={form.ancho}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col sm={3}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Alto(cm)</Form.Label>
                <Form.Control
                  // as="textarea"
                  type="text"
                  name="alto"
                  value={form.alto}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col sm={3}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Profundidad(cm)</Form.Label>
                <Form.Control
                  // as="textarea"
                  type="text"
                  name="profundidad"
                  value={form.profundidad}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col sm={3}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Peso(kg)</Form.Label>
                <Form.Control
                  // as="textarea"
                  type="text"
                  name="peso"
                  value={form.peso}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <br />

          <Row>
            <Col sm={6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Origen - Ciudad</Form.Label>
                <Form.Control
                  type="text"
                  name="ciudadOrigen"
                  value={form.ciudadOrigen}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Origen - Dirección</Form.Label>
                <Form.Control
                  // as="textarea"
                  type="text"
                  name="direccionOrigen"
                  value={form.direccionOrigen}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <br />

          <Row>
            <Col sm={6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Destino - Ciudad</Form.Label>
                <Form.Control
                  type="text"
                  name="ciudadEntrega"
                  value={form.ciudadEntrega}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Destino - Dirección</Form.Label>
                <Form.Control
                  // as="textarea"
                  type="text"
                  name="direccionEntrega"
                  value={form.direccionEntrega}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <br />

          <Row>
            <Button variant="primary" type="submit">
              Realizar Solicitud!!
            </Button>
          </Row>
        </Form>
          </Card.Body>
        </Card>

        
      </Container>
      <br></br>
      {/* Agrego el componente de la Tabla - Componente Hijo de Form */}
      <Tablecomp
        data={db}
        obtenerTareas={obtenerTareas}
        eliminarTarea={eliminarTarea}
        editarTarea={editarTarea}
      />
    </>
  );
}

export default Formcomp;
