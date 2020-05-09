import "../models/tool";
import mongoose from "mongoose";
const Tool = mongoose.model("tool");

class ToolController {
  async store(request, response) {
    Tool.find({})
      .then((tool) => {
        return response.json(tool);
      })
      .catch((err) => {
        return response.status(400).json({
          error: true,
          message: "Nenhuma ferramenta encontrado",
        });
      });
  }
  async show(request, response) {
    Tool.findOne({ _id: request.params.id })
      .then((tool) => {
        response.json(tool);
      })
      .catch((err) => {
        return response.status(400).json({
          error: true,
          message: "Nenhum ferramenta encontrada.",
        });
      });
  }
  async create(request, response) {
    const tool = Tool.create(request.body, (err) => {
      if (err) {
        return response.status(400).json({
          error: true,
          message: "Erro. Ferramenta não foi cadastrada com sucesso.",
        });
      }
      return response.status(200).json({
        error: false,
        message: "Ferramenta foi cadastrada com sucesso.",
      });
    });
  }
  async edit(request, response) {
    const tool = Tool.updateOne(
      { _id: request.params.id },
      request.body,
      (err) => {
        if (err)
          return response.status(400).json({
            error: true,
            message: "Nao foi possivel editar a ferramenta",
          });

        response.status(200).json({
          error: true,
          message: "Ferramenta editada com sucesso",
        });
      }
    );
  }
  async delete(request, response) {
    Tool.deleteOne({ _id: request.params.id }).then(() => {
      response
        .status(200)
        .json({
          error: false,
          message: "Ferramenta deletada com sucesso",
        })
        .catch((err) => {
          response.status(400).json({
            error: true,
            message: "Falha ao deletar ferramenta",
          });
        });
    });
  }
}

module.exports = new ToolController();
