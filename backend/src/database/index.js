import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost/bossabox", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conexão com o MongoDB realizada com sucesso");
  })
  .catch(() => {
    console.log("Erro. Conexão com o MongoDB não foi realizada");
  });
mongoose.Promise = global.Promise;

export default mongoose;
