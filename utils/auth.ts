import axios from "axios";
import jwt_decode from "jwt-decode";
import { API_URL } from "../constants/routes";

export const createOrGetUser = async (res: any, addUser: any) => {
  const decodedJWT: {
    name: string;
    picture: string;
    email: string;
    sub: string;
  } = jwt_decode(res.credential);

  const { name, email, picture, sub } = decodedJWT;

  const user = {
    _id: sub,
    _type: "user",
    email: email,
    userName: name,
    profileImage: picture,
  };

  addUser(user);

  await axios.post(`${API_URL}/auth`, user);

  console.log(decodedJWT);
};
