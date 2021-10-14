const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");


router.post('/signup', userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/profil/:id", auth,userCtrl.profil);
router.get("/allprofil", auth,userCtrl.getAllUsers );
router.put("/profil/:id", auth, multer, userCtrl.updateProfile);
router.delete('/delete/:id', auth, userCtrl.deleteProfil);

module.exports = router;

