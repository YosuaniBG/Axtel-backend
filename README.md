# Axtel-backend

# 📊 Sales Normalizer API

Este proyecto es una API REST desarrollada con **Node.js + Express** que permite:

- Recibir un archivo `.csv` con ventas.
- Convertir los montos a una moneda unificada usando una API pública de tasas de cambio.
- Guardar las ventas normalizadas en una base de datos **MySQL**.
- Consultar la información de manera agregada o detallada.

---

## 🛠 Tecnologías

- Node.js
- Express.js
- MySQL (`mysql2`)
- Multer (para manejo de archivos)
- CSV Parser ( es un analizador sintáctico que convierte la entrada de texto CSV en matrices u objetos)
- Dotenv
- Axios

---

## ⚙️ Configuración
- Se requiere la configuracion de la BD en caso de que se necesite usar otro servicio MySQL
- Los archivos de configuracion se encuentran en la carpeta config

---

## ▶️ Ejecución local
npm run dev

---

## 🗂 Endpoints
- POST /upload (Sube un archivo .csv usando multipart/form-data con la clave file)
- POST /normalize-sales?target=USD (Envía un JSON con ventas para normalizarlas a una moneda unificada (USD, EUR, etc))
- POST /save-sales (Guarda en la base de datos los datos ya normalizados)
- GET /normalized-sales (Devuelve todas las ventas almacenadas en la tabla normalized_sales)
- GET /summary-by-country (Devuelve un resumen de ventas agregado por país, totalizado en USD)

---

## 🚀 API Externas
- Se utiliza open.er-api.com para obtener tasas de conversión en tiempo real.
