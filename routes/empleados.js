const express        = require('express');
const rutasEmpleados = express.Router();
const Empleado       = require('../models/Empleado');
const mongoose = require('mongoose');
const empleadoSchema = require('../validaciones/empleadoSchema');



// El metodo POST para obtener los datos de los empleados
rutasEmpleados.post('/', async (req, res) => {
  try {
    const { error, value } = empleadoSchema.validate(req.body);

    console.log("valuee ",value);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const nuevoEmpleado = new Empleado(value);
    await nuevoEmpleado.save();
    res.status(201).json(nuevoEmpleado);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error al crear el empleado' });
  }
});
// Obtener datos de los empleados y por ID
rutasEmpleados.get('/', async (req, res) => {
  try {
    const listaEmpleados = await Empleado.find();
    res.json(listaEmpleados);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la lista de empleados' });
  }
});

rutasEmpleados.get('/:id', async (req, res) => {
  const { id } = req.params;

  // Validar ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID no válido' });
  }

  try {
    const empleado = await Empleado.findById(id);
    if (!empleado) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }

    res.json(empleado);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar el empleado' });
  }
});

// PUT para actualizaciones de los empleados
rutasEmpleados.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { error, value } = empleadoSchema.validate(req.body);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'ID no válido' });
    }

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const empleadoActualizado = await Empleado.findByIdAndUpdate(id, value, { new: true });

    if(!empleadoActualizado) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }

    res.json(empleadoActualizado);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el empleado' });
  }
});

// Y el metodo DELETE para borrrar empleado por ID
rutasEmpleados.delete('/:id', async (req, res) => {
  const { id } = req.params;

  // Validar ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID no válido' });
  }

  try {
    const empleadoEliminado = await Empleado.findByIdAndDelete(id);

    if (!empleadoEliminado) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }

    res.json({ mensaje: 'Empleado eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el empleado' });
  }
});

module.exports = rutasEmpleados;

