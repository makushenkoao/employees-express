const { prisma } = require("../prisma/prisma-client");

const all = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();
    res.status(200).json(employees);
  } catch (e) {
    res.status(400).json({ message: "Failed to get employees :>)" });
  }
};

const add = async (req, res) => {
  try {
    const { firstName, lastName, address, age } = req.body;
    if (!firstName || !lastName || !address || !age) {
      return res.status(400).json({
        message: "Fill in required fields",
      });
    }

    const employee = await prisma.employee.create({
      data: {
        firstName,
        lastName,
        address,
        age,
        userId: req.user.id,
      },
    });

    return res.status(201).json(employee);
  } catch (e) {
    return res.status(400).json({ message: "Oops, failed to add user :)" });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.employee.delete({
      where: {
        id,
      },
    });

    return res.status(200).json("User deleted");
  } catch (e) {
    return res.status(400).json({ message: "Failed to remove user :D" });
  }
};

const edit = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;
    await prisma.employee.update({
      where: {
        id,
      },
      data: {
        id,
        ...data,
      },
    });

    return res.status(200).json("User updated");
  } catch (e) {
    return res.status(400).json({ message: "Failed to edit user :DD" });
  }
};

const one = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await prisma.employee.findUnique({
      where: {
        id,
      },
    });

    return res.status(200).json(employee);
  } catch (e) {
    return res.status(400).json({ message: "Failed to get user :}" });
  }
};

module.exports = {
  all,
  add,
  remove,
  edit,
  one,
};
