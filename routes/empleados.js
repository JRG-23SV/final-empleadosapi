const express        = require('express');
const rutasEmpleados = express.Router();
const Empleado       = require('../models/Empleado');

// El metodo POST para obtener los datos de los empleados
rutasEmpleados.post('/', async (req, res) => {
  const nuevoEmpleado = new Empleado(req.body);
  await nuevoEmpleado.save();
  res.status(201).json(nuevoEmpleado);
});

// Obtener datos de los empleados y por ID
rutasEmpleados.get('/', async (req, res) => {
  const listaEmpleados = await Empleado.find();
  res.json(listaEmpleados);
});

rutasEmpleados.get('/:id', async (req, res) => {
  const empleado = await Empleado.findById(req.params.id);
  res.json(empleado);
});

// PUT para actualizaciones de los empleados
rutasEmpleados.put('/:id', async (req, res) => {
  const empleadoActualizado = await Empleado
    .findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(empleadoActualizado);
});

// Y el metodo DELETE para borrrar empleado por ID
rutasEmpleados.delete('/:id', async (req, res) => {
  await Empleado.findByIdAndDelete(req.params.id);
  res.json({ mensaje: 'Empleado eliminado' });
});

module.exports = rutasEmpleados;

