const { prisma } = require("../prisma/prisma-client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Fill in required fields",
      });
    }

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    const isPasswordCorrect =
      user && (await bcrypt.compare(password, user.password));

    const secret = process.env.JWT_SECRET;

    if (user && isPasswordCorrect && secret) {
      res.status(200).json({
        id: user.id,
        email: user.email,
        name: user.name,
        token: jwt.sign(
          {
            id: user.id,
          },
          secret,
          { expiresIn: "30d" }
        ),
      });
    } else {
      return res
        .status(400)
        .json({ message: "Incorrect email or password :3" });
    }
  } catch (e) {
    return res.status(400).json({ message: "Failed to login :/" });
  }
};

const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!name || !password || !email) {
      return res.status(400).json({
        message: "Fill in required fields",
      });
    }

    const registered = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (registered) {
      return res.status(400).json({
        message: `user with email ${email} already registered`,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    const secret = process.env.JWT_SECRET;
    if (user && secret) {
      res.status(201).json({
        id: user.id,
        email: user.email,
        name: user.name,
        token: jwt.sign(
          {
            id: user.id,
          },
          secret,
          { expiresIn: "30d" }
        ),
      });
    } else {
      return res.status(400).json({
        message: "Error creating account",
      });
    }
  } catch (e) {
    return res.status(400).json({ message: "Failed to create user :D" });
  }
};

const current = async (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (e) {
    return res
      .status(400)
      .json({ message: "Oops, something went wrong... :]" });
  }
};

module.exports = {
  login,
  register,
  current,
};
