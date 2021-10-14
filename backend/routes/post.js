const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const messageCtrl = require("../controllers/post");

router.post("/create", multer , auth, messageCtrl.create);
router.get("/", messageCtrl.getAllPost);
router.get("/:id", messageCtrl.getOnePost);
router.put("/update/:id", multer, messageCtrl.update);
router.delete("/:id", auth, messageCtrl.delete);

module.exports = router;