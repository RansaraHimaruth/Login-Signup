import { where } from "sequelize";
import User from "../models/UserModel.js";
import argon2 from "argon2";

export const getUsers = async (req, res) => {
  try {
    const response = await User.findAll({
      attributes: ["uuid", "name", "email", "role"],
    });
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const response = await User.findOne({
      attributes: ["uuid", "name", "email", "role"],
      where: {
        uuid: req.params.id,
      },
    });
    if (!response) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const createUser = async (req, res) => {
  const { name, email, password, confPassword, role } = req.body;
  if (password !== confPassword) {
    return res.status(400).json({ msg: "Password do not match" });
  }
  try {
    const hashedPassword = await argon2.hash(password);
    const newUser = {
      name: name,
      email: email,
      password: hashedPassword,
      role: role,
    };
    const response = await User.create(newUser);
    res.status(201).json({ msg: "User created successfully" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

export const updateUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }
  const { name, email, password, confPassword, role } = req.body;
  let hashPassword;
  if (password === "" || password === null) {
    hashPassword = user.password;
  } else {
    hashPassword = await argon2.hash(password);
  }
  if (password !== confPassword) {
    return res.status(400).json({ msg: "Password do not match" });
  }
  try {
    // const updateUser = [
    //   {
    //     name: name,
    //     email: email,
    //     password: hashPassword,
    //     role: role,
    //   },
    //   {
    //     where: {
    //       id: user.id,
    //     },
    //   },
    // ];
    // const response = await User.update(...updateUser);
    await User.update(
      {
        name: name,
        email: email,
        password: hashPassword,
        role: role,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    res.status(200).json({ msg: "User updated successfully" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

export const deleteUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }
  try {
    const updateUser = {
      where: {
        id: user.id,
      },
    };
    const response = await User.destroy(updateUser);
    res.status(200).json({ msg: "User deleted successfully" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};
