const bcrypt = require('bcryptjs');
const db = require('./models'); // Asegúrate de que esta ruta sea correcta

async function initializeDatabase() {
  try {
    // Hashear la contraseña
    const hashedPasswordAdmin = bcrypt.hashSync('test1234', 10);

    // Crear usuarios de ejemplo
    const userAdmin = await db.user.create({
      username: 'admin',
      email: 'admin@example.com',
      password: hashedPasswordAdmin,
      rol: 'admin',
    });


    // Más operaciones según sea necesario...

  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
  }
}

module.exports = initializeDatabase;
