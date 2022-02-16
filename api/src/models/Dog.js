const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const Dog = sequelize.define('dog', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: { ///altura
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight: { /// peso
      type: DataTypes.STRING,
      allowNull: false,
    },
    life_span: { //años de vida
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
