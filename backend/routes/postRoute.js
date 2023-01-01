const express = require("express");
const { createPost, deletePost, getAllPosts, getSpecificPosts, createComment, dislikePost, likePost } = require("../controllers/postController");
const router = express.Router();
const {isAuthenticatedUser, authorizeRoles} = require("../middleware/auth");

router.route('/createPost').post(isAuthenticatedUser, createPost);
router.route('/deletePost/:id').delete(isAuthenticatedUser, deletePost);
router.route('/posts').get(getAllPosts);
router.route('/comment/:id').get(isAuthenticatedUser, getSpecificPosts);
router.route('/addComment').put(isAuthenticatedUser, createComment);
router.route('/dislike').put(isAuthenticatedUser, dislikePost);
router.route('/like/:id').get(isAuthenticatedUser, likePost);

module.exports = router;

