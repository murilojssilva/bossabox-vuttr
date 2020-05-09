import "../models/User";
import mongoose from "mongoose";
const User = mongoose.model("User");

class UserController {
  async store(request, response) {
    User.find({})
      .then((user) => {
        return response.json(user);
      })
      .catch((err) => {
        return response.status(400).json({
          error: true,
          message: "Nenhum usuário encontrado.",
        });
      });
  }
  async show(request, response) {
    User.findOne({ _id: request.params.id })
      .then((user) => {
        response.json(user);
      })
      .catch((err) => {
        return response.status(400).json({
          error: true,
          message: "Nenhum usuário encontrado.",
        });
      });
  }
  async create(request, response) {
    const user = User.create(request.body, (err) => {
      if (err) {
        return response.status(400).json({
          error: true,
          message: "Erro. Usuário não foi cadastrado com sucesso.",
        });
      }
      return response.status(200).json({
        error: false,
        message: "Usuário foi cadastrado com sucesso.",
      });
    });
  }
  async edit(request, response) {
    const user = User.updateOne(
      { _id: request.params.id },
      request.body,
      (err) => {
        if (err)
          return response.status(400).json({
            error: true,
            message: "Não foi possivel editar o usuário",
          });

        response.status(200).json({
          error: true,
          message: "Usuário editado com sucesso",
        });
      }
    );
  }
  async delete(request, response) {
    User.deleteOne({ _id: request.params.id }).then(() => {
      response
        .status(200)
        .json({
          error: false,
          message: "Usuário deletado com sucesso",
        })
        .catch((err) => {
          response.status(400).json({
            error: true,
            message: "Falha ao deletar usuário",
          });
        });
    });
  }
}

module.exports = new UserController();
