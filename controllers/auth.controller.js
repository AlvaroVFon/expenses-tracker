import { authService } from "../services/auth.service.js";
import { handleError } from "../helpers/handleError.js";
import jsonwebtoken from "jsonwebtoken";

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const token = await authService.login(email, password);

    return res.json({
      token,
    });
  } catch (error) {
    handleError(res, error);
  }
}

async function getUserFromToken(req, res) {
  const token = req.headers["authorization"].split(" ")[1];
  const user = await jsonwebtoken.decode(token);
  return res.json({
    user,
  });
}

export { login, getUserFromToken };
