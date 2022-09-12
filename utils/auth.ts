import axios from "axios";
import jwt_decode from "jwt-decode";

export const createOrGetUser = async (res: any) => {
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

  await axios.post(`http://localhost:3000/api/auth`, user);

  console.log(decodedJWT);
};
