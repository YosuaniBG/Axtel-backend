const fs = require("fs");
const csv = require("csv-parser");
const { Readable } = require("stream");
const axios = require("axios");

const uploadCSV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No se proporcionó ningún archivo." });
    }

    const results = [];

    // Convertimos el buffer en un stream legible para que csv-parser lo procese
    const stream = Readable.from(req.file.buffer);

    stream
      .pipe(csv())
      .on("data", (data) => {
        results.push(data); // cada fila del CSV
      })
      .on("end", () => {
        console.log("Contenido del CSV:", results); // Imprime todo en consola
        res.json({ message: "Archivo procesado correctamente", data: results });
      })
      .on("error", (err) => {
        console.error("Error al procesar el CSV:", err);
        res.status(500).json({ error: "Error al procesar el archivo CSV" });
      });
  } catch (error) {
    console.error("Error en uploadCSV:", error);
    res.status(500).json({ error: "Error interno del servidor al intentar cargar el fichero CSV" });
  }
};

const normalizeSales = async (req, res) => {
  try {
    const sales = req.body;
    const targetCurrency = req.query.target?.toUpperCase();

    if (!Array.isArray(sales) || sales.length === 0) {
      return res.status(400).json({ error: "Lista de ventas vacía o no válida." });
    }

    if (!targetCurrency) {
      return res.status(400).json({ error: "Se requiere el parámetro 'target' con la moneda destino." });
    }

    // Obtener tasas de cambio segun la moneda destino
    const { data } = await axios.get(`https://open.er-api.com/v6/latest/${targetCurrency}`);

    if (data.result !== "success") {
      return res.status(500).json({ error: "Error al obtener tasas de cambio." });
    }

    const rates = data.rates;

    // Convertir cada venta a la moneda destino
    const normalizedSales = sales.map((sale) => {
      const originalCurrency = sale.Moneda?.toUpperCase();
      const amount = parseFloat(sale.Monto);

      if (!rates[originalCurrency]) {
        throw new Error(`No se encontró tasa de cambio para ${originalCurrency}`);
      }

      const conversionRate = 1 / rates[originalCurrency];
      const normalizedAmount = amount * conversionRate;

      return {
        ...sale,
        Monto_Normalizado: parseFloat(normalizedAmount.toFixed(2)),
        Moneda_Normalizada: targetCurrency,
        Tasa_De_Cambio: parseFloat(conversionRate.toFixed(6)),
      };
    });

    res.json({ ventas: normalizedSales });
  } catch (error) {
    console.error("Error en normalizeSales:", error.message);
    res.status(500).json({ error: error.message || "Error interno del servidor." });
  }
};


module.exports = {
    uploadCSV,
    normalizeSales
};