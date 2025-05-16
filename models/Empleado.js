 const mongoose = require('mongoose');

// Esuema de campos de empleados
const EmpleadoSchema = new mongoose.Schema({
  nombre:      String,
  apellido:    String,
  edad:        Number,
  departamento:String,
  salario:     Number
});

// Se agregan indices para maximizar la optimizacion de busquedas
EmpleadoSchema.index({ departamento: 1 });
EmpleadoSchema.index({ salario: -1 });

//Modelo para dar paso al esquema
module.exports = mongoose.model('Empleado', EmpleadoSchema);