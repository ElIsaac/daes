const { Schema, model } = require("mongoose");

////////////////////////son los datos que se guardaran en mongodb
const NoticiaSchema = new Schema({
  titulo: { type: String, required: true },
  contenido: { type: String, required: true },
  usuarioOriginal: { type: String, required: true },
  usuarioFinal: { type: String, required: true },
  fuente: { type: String, required: true },
  fecha: {type: Date}
});


module.exports = model("Noticia", NoticiaSchema);
