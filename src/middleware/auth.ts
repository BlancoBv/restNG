import Jwt from "jsonwebtoken";
import "dotenv/config";

const { PRIVATE_KEY }: any = process.env;

export const verifyAuth = async (req: any, res: any, next: any) => {
  try {
    const { authorization } = req.headers;
    const token = authorization ? authorization.replace("Bearer ", "") : null;
    const userAuth = await Jwt.verify(token, PRIVATE_KEY);
    if (!token) {
      return res.status(403).json({ ok: false, msg: "No token" });
    }
    if (userAuth) {
      next();
    } else {
      res.status(403).json({ ok: false, msg: "No autorizado" });
    }
  } catch (err) {
    res.status(403).json({ ok: false, msg: "No autorizado" });
  }
};

export const signToken = async (data: any) => {
  return await Jwt.sign(data, PRIVATE_KEY, {
    expiresIn: 60 * 60 * 24,
  });
};
