const express   = require('express');
const mongoose  = require('mongoose');
const cors      = require('cors');
require('dotenv').config();

const app               = express();
const RUTA_EMPLEADOS    = '/api/empleados';
const PUERTO            = process.env.PORT || 3001;

// Funciones para ejecutar la solicitud y respuesta al cliente
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/empleadosDB')
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar MongoDB:', err));

// Rutas
app.use(RUTA_EMPLEADOS, require('./routes/empleados'));

// iniciar server
app.listen(PUERTO, () => {
  console.log(`🚀 Servidor escuchando en puerto ${PUERTO}`);
});
