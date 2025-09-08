const { sendErrorResponse } = require("../helpers/send.response.errors");
const { Author, Admin } = require("../models/index.model");
const { User } = require("../models/index.model");
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

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return sendErrorResponse(
        { message: "Invalid email or password" },
        res,
        401
      );
    }

    const verifyPassword = await bcrypt.compare(password, admin.password);
    if (!verifyPassword) {
      return sendErrorResponse(
        { message: "Invalid email or password" },
        res,
        401
      );
    }

    const payload = {
      id: admin.id,
      email: admin.email,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
      role: "admin",
    };

    const tokens = jwtService.generateTokens(payload);

    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 7);
    admin.refresh_token = hashedRefreshToken;
    await admin.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("cookie_refresh_token_time"),
      httpOnly: true,
    });

    res.send({ message: "Admin logged in", accessToken: tokens.accessToken });
  } catch (err) {
    sendErrorResponse(err, res, 500);
  }
};

const logoutAdmin = async (req, res) => {
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
    const admin = await Admin.findByPk(verifiedRefreshToken.id);

    if (!admin) {
      return sendErrorResponse({ message: "Admin not found" }, res, 404);
    }

    admin.refresh_token = null;
    await admin.save();

    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Successfully logged out" });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const refreshTokenAdmin = async (req, res) => {
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

    const admin = await Admin.findByPk(verifiedRefreshToken.id);
    if (!admin || !admin.refresh_token) {
      return sendErrorResponse(
        { message: "Admin not found or invalid refresh token" },
        res,
        401
      );
    }

    const isValid = await bcrypt.compare(refreshToken, admin.refresh_token);
    if (!isValid) {
      return sendErrorResponse({ message: "Invalid refresh token" }, res, 401);
    }

    const payload = {
      id: admin.id,
      email: admin.email,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
      role: "admin",
    };

    const tokens = jwtService.generateTokens(payload);
    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 7);

    admin.refresh_token = hashedRefreshToken;
    await admin.save();

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

const sign_up = async (req, res) => {
  try {
    const { email, password } = req.body;

    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return sendErrorResponse({ message: "User already exists" }, res, 400);
    }

    const hashedPassword = await bcrypt.hash(password, 7);
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    res.status(201).send({ message: "New user added", data: newUser });
  } catch (err) {
    sendErrorResponse(err, res, 400);
  }
};

const sign_in = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return sendErrorResponse(
        { message: "Invalid email or password" },
        res,
        401
      );
    }

    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword) {
      return sendErrorResponse(
        { message: "Invalid email or password" },
        res,
        401
      );
    }

    const payload = {
      id: user.id,
      email: user.email,
      is_active: user.is_active,
      role: "user",
    };

    const tokens = jwtService.generateTokens(payload);

    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 7);
    user.refresh_token = hashedRefreshToken;
    await user.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("cookie_refresh_token_time"),
      httpOnly: true,
    });

    res.send({ message: "User logged in", accessToken: tokens.accessToken });
  } catch (err) {
    sendErrorResponse(err, res, 500);
  }
};

const sign_out = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return sendErrorResponse(
        { message: "Cookie refresh token not found" },
        res,
        400
      );
    }

    const verifiedRefreshToken = await jwtService.verifyRefreshToken(
      refreshToken
    );
    const user = await User.findByPk(verifiedRefreshToken.id);

    if (!user) {
      return sendErrorResponse({ message: "User not found" }, res, 404);
    }

    user.refresh_token = null;
    await user.save();

    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Successfully logged out" });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const user_refreshTokenn = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return sendErrorResponse(
        { message: "Refresh token not found" },
        res,
        400
      );
    }

    const verifiedRefreshToken = await jwtService.verifyRefreshToken(
      refreshToken
    );

    const user = await User.findByPk(verifiedRefreshToken.id);
    if (!user || !user.refresh_token) {
      return sendErrorResponse(
        { message: "User not found or invalid refresh token" },
        res,
        401
      );
    }

    const isValid = await bcrypt.compare(refreshToken, user.refresh_token);
    if (!isValid) {
      return sendErrorResponse({ message: "Invalid refresh token" }, res, 401);
    }

    const payload = {
      id: user.id,
      email: user.email,
      is_active: user.is_active,
      role: "user",
    };

    const tokens = jwtService.generateTokens(payload);
    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 7);

    user.refresh_token = hashedRefreshToken;
    await user.save();

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
  sign_up,
  sign_in,
  sign_out,
  user_refreshTokenn,
  loginAdmin,
  logoutAdmin,
  refreshTokenAdmin
};
