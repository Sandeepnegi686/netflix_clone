import { JwtPayload } from "jsonwebtoken";

interface AuthPayload extends JwtPayload {
  user?: {
    _id: string;

    name: string;
    email: string;
  };
}

export default AuthPayload;
