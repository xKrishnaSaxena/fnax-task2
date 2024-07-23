import express from "express";
import User from "../models/User.js";

const router = express.Router();
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "User not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

export default router;
