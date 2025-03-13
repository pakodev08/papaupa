import express from "express";
import "dotenv/config";
import cors from "cors";

const app = express();
app.use(cors());
console.log(`Hola mundo`);

const PORT = process.env.PORT || 4003;

app.use(express.json());

app.get(`/dos`, (req, res) => {
  res.json({
    ok: true,
    mensaje: "Hola mundo",
  });
});

app.listen(PORT, () => {
  console.log(`El puerto esta corriendo fino en el ${PORT}`);
});
