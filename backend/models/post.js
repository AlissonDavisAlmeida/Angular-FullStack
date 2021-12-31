const mongoose = require("mongoose");

const { Schema } = mongoose;

const postSchema = new Schema({

  titulo: { type: String, required: true },
  conteudo: { type: String, required: true },
  imagePath: { type: String, required: true },
  criador: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Post", postSchema);
