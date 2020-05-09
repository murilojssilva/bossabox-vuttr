import * as Yup from "yup";
import User from "../models/User";

class UserController {
  async store(request, response) {
    const scbema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });
    if (await scbema.isValid(request.body)) {
      return response.status(400).json({ error: "Validation fails" });
    }
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

  async update(request, response, next) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string(),
        email: Yup.string().email(),
        oldPassword: Yup.string().min(6),
        password: Yup.string()
          .min(6)
          .when("oldPassword", (oldPassword, field) =>
            oldPassword ? field.required() : field
          ),
        confirmPassword: Yup.string().when("password", (password, field) =>
          password ? field.required().oneOf([Yup.ref("password")]) : field
        ),
      });

      if (!(await schema.isValid(request.body))) {
        return response.status(400).json({ error: "Validation fails" });
      }
      const { email, oldPassword } = request.body;
      const user = await User.findById(request.userId);
      if (email !== user.email) {
        const userExists = await User.findOne({
          where: { email },
        });
        if (userExists) {
          return response.status(400).json({ error: "User already exists" });
        }
      }
      if (oldPassword && (await oldPassword) !== user.password) {
        user.comparePassword(oldPassword, (err, isMatch) => {
          if (err) throw err;
          if (!isMatch) {
            return response
              .status(401)
              .json({ error: "Password does not match." });
          }
        });
      }
      const { id, name } = await user.updateOne(request.body);
      return response.json({ id, name, email });
    } catch (err) {
      next(err);
    }
  }

  async create(request, response) {
    const user = User.create(request.body, (err) => {
      if (err) {
        return response.status(400).json({
          error: true,
          message: "Erro. Usuário não foi cadastrado.",
        });
      }
      return response.status(200).json({
        error: false,
        message: "Usuário foi cadastrado com sucesso.",
      });
    });
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
