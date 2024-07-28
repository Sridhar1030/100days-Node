import dotenv from "dotenv";
dotenv.config();

export const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
export const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
export const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
export const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE;
