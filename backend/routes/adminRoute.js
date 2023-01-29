const express = require("express");
const { createUpdatePost, 
     getAllUpdatePosts 
     } = require("../controllers/adminController");
const router = express.Router();
const {isAuthenticatedUser, authorizeRoles} = require("../middleware/auth");

router.route('/createUpdatePost').post(isAuthenticatedUser,authorizeRoles("admin"), createUpdatePost);
router.route('/updatePosts').get(getAllUpdatePosts);

module.exports = router;