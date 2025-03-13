import express from "express";
import "dotenv/config";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

app.get(`/dos`, (req, res) => {
  res.json({
    ok: true,
    mensaje: "Hola mundo",
  });
});

// Manejar todas las demás rutas para SvelteKit
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 4003;

app.listen(PORT, () => {
  console.log(`El puerto esta corriendo fino en el ${PORT}`);
});