const { sendErrorResponse } = require("../helpers/send.response.errors");
const { Author }  = require("../models/index.model");
const jwtService = require("../services/jwt.service");
const bcrypt = require("bcrypt");
const config = require("config");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const author = await Author.findOne({ where: { email } });
    if (!author) {
      return sendErrorResponse(
        { message: "Invalid email or password" },
        res,
        401
      );
    }

    const verifyPassword = await bcrypt.compare(password, author.password);
    if (!verifyPassword) {
      return sendErrorResponse(
        { message: "Invalid email or password" },
        res,
        401
      );
    }

    const payload = {
      id: author.id,
      email: author.email,
      is_active: author.is_active,
      is_expert: author.is_expert,
      role: "author",
    };

    const tokens = jwtService.generateTokens(payload);

    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 7);
    author.refresh_token = hashedRefreshToken;
    await author.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("cookie_refresh_token_time"),
      httpOnly: true,
    });

    res.send({ message: "Author logged in", accessToken: tokens.accessToken });
  } catch (err) {
    sendErrorResponse(err, res, 500);
  }
};

const logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return sendErrorResponse(
        { message: "Cookie refresh token topilmadi" },
        res,
        400
      );
    }

    const verifiedRefreshToken = await jwtService.verifyRefreshToken(
      refreshToken
    );
    const author = await Author.findByPk(verifiedRefreshToken.id);

    if (!author) {
      return sendErrorResponse({ message: "Author not found" }, res, 404);
    }

    author.refresh_token = null;
    await author.save();

    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Successfully logged out" });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return sendErrorResponse(
        { message: "Redresh token not found" },
        res,
        400
      );
    }

    const verifiedRefreshToken = await jwtService.verifyRefreshToken(
      refreshToken
    );

    const author = await Author.findByPk(verifiedRefreshToken.id);
    if (!author || !author.refresh_token) {
      return sendErrorResponse(
        { message: "Author not found or invalid refresh token" },
        res,
        401
      );
    }

    const isValid = await bcrypt.compare(refreshToken, author.refresh_token);
    if (!isValid) {
      return sendErrorResponse({ message: "Invalid refresh token" }, res, 401);
    }

    const payload = {
      id: author.id,
      email: author.email,
      is_active: author.is_active,
      is_expert: author.is_expert,
      role: "author",
    };

    const tokens = jwtService.generateTokens(payload);
    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 7);

    author.refresh_token = hashedRefreshToken;
    await author.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("cookie_refresh_token_time"),
      httpOnly: true,
    });

    res.status(200).json({
      message: "Access token updated",
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

module.exports = {
  login,
  logout,
  refreshToken,
};
