const { createTableIfNotExists, insertNormalizedSales, getAllNormalizedSales, getSalesSummaryByCountry } = require("../model/crud_info.model");


const saveNormalizedSales = async (req, res) => {
  try {
    const sales = req.body;

    if (!Array.isArray(sales) || sales.length === 0) {
      return res.status(400).json({ error: "Lista de ventas vacía o no válida." });
    }

    await createTableIfNotExists();
    await insertNormalizedSales(sales);

    res.json({ message: "Success" });
  } catch (error) {
    console.error("Error al guardar ventas normalizadas:", error);
    res.status(500).json({ error: "Error al guardar los datos en la base de datos." });
  }
};

const getNormalizedSales = async (req, res) => {
  try {
    const sales = await getAllNormalizedSales();
    res.json({ message: "Success", data: sales });
  } catch (error) {
    console.error("Error al obtener datos:", error);
    res.status(500).json({ error: "Error al obtener datos de la base de datos." });
  }
};

const getSalesSummary = async (req, res) => {
  try {
    const summary = await getSalesSummaryByCountry();
    res.json({ message: "Success", data: summary });
  } catch (error) {
    console.error("Error al obtener resumen:", error);
    res.status(500).json({ error: "Error al generar resumen de ventas por país." });
  }
};

module.exports = {  
  saveNormalizedSales,  
  getNormalizedSales,
  getSalesSummary
};
