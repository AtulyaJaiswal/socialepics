const express = require("express");
const { registerUser, loginUser, logout, getUserPosts, getUserDetails, getAllUsers, getSingleUser, deleteUser } = require("../controllers/userController");
const router = express.Router();
const {isAuthenticatedUser, authorizeRoles} = require("../middleware/auth");

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logout);
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route('/myPosts').get(isAuthenticatedUser ,getUserPosts);

router.route("/getAllUsers").get(isAuthenticatedUser, getAllUsers);
router.route("/getSingleUser").get(isAuthenticatedUser, getSingleUser);
router.route("/deleteUser/:id").get(isAuthenticatedUser, deleteUser);


module.exports = router;