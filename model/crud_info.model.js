const db = require('../config/dbConfig').promise();

// Crea la tabla si no existe
const createTableIfNotExists = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS normalized_sales (
      ID_Venta VARCHAR(50) PRIMARY KEY,
      Fecha DATE,
      Pais VARCHAR(10),
      Monto DECIMAL(15,2),
      Moneda VARCHAR(5),
      Monto_Normalizado DECIMAL(15,2),
      Moneda_Normalizada VARCHAR(5),
      Tasa_De_Cambio DECIMAL(10,6)
    );
  `;
  await db.query(query);
};

// Inserta los datos en la tabla
const insertNormalizedSales = async (sales) => {
  const insertQuery = `
    INSERT INTO normalized_sales 
    (ID_Venta, Fecha, Pais, Monto, Moneda, Monto_Normalizado, Moneda_Normalizada, Tasa_De_Cambio)
    VALUES ?
    ON DUPLICATE KEY UPDATE 
      Fecha = VALUES(Fecha),
      Pais = VALUES(Pais),
      Monto = VALUES(Monto),
      Moneda = VALUES(Moneda),
      Monto_Normalizado = VALUES(Monto_Normalizado),
      Moneda_Normalizada = VALUES(Moneda_Normalizada),
      Tasa_De_Cambio = VALUES(Tasa_De_Cambio);
  `;

  const values = sales.map(sale => [
    sale.ID_Venta,
    sale.Fecha,
    sale.País || sale.Pais,
    sale.Monto,
    sale.Moneda,
    sale.Monto_Normalizado,
    sale.Moneda_Normalizada,
    sale.Tasa_De_Cambio
  ]);

  await db.query(insertQuery, [values]);
};

const getAllNormalizedSales = async () => {
  const [rows] = await db.query('SELECT * FROM normalized_sales');
  return rows;
};

const getSalesSummaryByCountry = async () => {
  const [rows] = await db.query(`
    SELECT 
      Pais,
      SUM(Monto_Normalizado) AS Total_Ventas_USD
    FROM 
      normalized_sales
    GROUP BY 
      Pais
    ORDER BY 
      Total_Ventas_USD DESC
  `);
  return rows;
};

module.exports = {
  createTableIfNotExists,
  insertNormalizedSales,
  getAllNormalizedSales,
  getSalesSummaryByCountry
};