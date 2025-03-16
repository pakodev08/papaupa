import express from "express";
import "dotenv/config";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Definir el esquema para un producto
const productoSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  src: {
    type: String,
    required: true,
  },
  cantidad: {
    type: Number,
    default: 1, // Valor por defecto para la cantidad
  },
});

// Definir el esquema para la colección de productos
const categoriaSchema = new mongoose.Schema({
  consoladores: [productoSchema],
  babydolls: [productoSchema],
});

// Crear el modelo
const Productos = mongoose.model("Productos", categoriaSchema);

// module.exports = Productos;

// const mongoose = require('mongoose');
// const Productos = require('./ruta/al/modelo/productos'); // Asegúrate de usar la ruta correcta

// Conectar a la base de datos
mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("No se pudo conectar a MongoDB", err));

// Datos de productos
const productos = {
  consoladores: [
    {
      id: 1,
      title: "Consolador Punto G",

      precio: 24.99,
      src: `https://i.postimg.cc/4xWZFNq7/2.webp`,
      cantidad: 3,
    },
    {
      id: 2,
      title: "Consolador Rabbit Punto G ",
      precio: 24.99,
      cantidad: 1,
      src: `https://i.postimg.cc/PqNhGnn6/3.webp`,
    },
    {
      id: 3,
      title: "Dildo Consolador Impermeable Punto G ",
      precio: 19.99,
      cantidad: 1,
      src: `https://i.postimg.cc/gcLJXR5M/1.webp`,
    },
    {
      id: 4,
      title: "Vibrador Lengua Estimulador De Clítoris Punto G Recargable",
      precio: 14.99,
      cantidad: 1,
      src: `https://i.postimg.cc/V6C8696n/lengua.webp`,
    },
  ],
  babydolls: [
    {
      id: 1,
      title: "Babydoll Negro",
      precio: 9.99,
      cantidad: 1,
      src: `https://i.postimg.cc/3rXscxD8/Screenshot-22.webp`,
    },
    {
      id: 2,
      title: "Babydoll Blanco",
      precio: 9.99,
      cantidad: 1,
      src: `https://i.postimg.cc/Dy79k3qq/Screenshot-88.webp`,
    },
  ],
};

// Guardar los productos en la base de datos
const guardarProductos = async () => {
  const nuevosProductos = new Productos(productos);
  await nuevosProductos.save();
  console.log("Productos guardados en la base de datos");
};

guardarProductos().catch((err) =>
  console.error("Error al guardar productos:", err)
);

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/productos", async (req, res) => {
  try {
    const productos = await Productos.find();
    res.json(productos);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({
      ok: false,
      mensaje: "Error al obtener productos",
    });
  }
});

app.get(`/dos`, (req, res) => {
  res.json({
    ok: true,
    mensaje: "Hola mundo",
  });
});
app.get(`/`, (req, res) => {
  res.json({
    ok: true,
    mensaje: "Hola mundo",
  });
});

// Manejar todas las demás rutas para SvelteKit
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 4003;

app.listen(PORT, () => {
  console.log(`El puerto esta corriendo fino en el ${PORT}`);
  console.log(`El puerto esta corriendo fino en el ${PORT}`);
});
