const express = require('express');
const { sendMessage } = require("../controllers/messageControllers");
const { protect } = require('../middleware/authMiddleWare');
const { allMessages } = require("../controllers/messageControllers");

const router = express.Router()

router.route("/").post(protect, sendMessage)
router.route("/:chatId").get(protect, allMessages)

module.exports=router;