import jwt from "jsonwebtoken";
import * as Yup from "yup";
import authConfig from "../../config/auth";
import User from "../models/User";

class SessionController {
  async store(request, response) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });
    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: "Validation fails" });
    }
    const { email, password } = request.body;
    const user = await User.findOne({ email });
    if (!user) {
      return response.status(400).json({ error: "User not found" });
    }
    if (!(await user.comparePassword(password))) {
      return response.status(400).json({
        error: "Invalid password",
      });
    }
    const { id, name } = user;
    return response.json({
      user: {
        name,
        id,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
