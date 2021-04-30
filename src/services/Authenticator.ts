import * as jwt from "jsonwebtoken";

export const generateToken = (user: any) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      profilePhoto: user.profilePhoto,
      friends: user.friends,
    },
    process.env.TOKEN_SECRET || "",
    { expiresIn: process.env.TOKEN_EXPIRES_IN || "1h" }
  );
};