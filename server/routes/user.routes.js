import express from "express";

import {
  findUser,
  createUser,
  getAllUsers,
  getUserInfoByID,
} from "../controllers/user.controller.js";

const router = express.Router();

router.route("/").get(getAllUsers);
router.route("/").post(createUser);
router.route("/:id").get(getUserInfoByID);
router.route("/user/:email").get(findUser);

export default router;
