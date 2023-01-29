const express = require("express");
const { createPost, 
     deletePost,
     getAllPosts, 
     getSpecificPosts, 
     createComment, 
     dislikePost, 
     likePost,
     getAllTrends,
     getSpecificTrendPosts,
     createSchedulePost,
     getAllSchedulePosts,
     deleteComment,
     deleteScheduledPost} = require("../controllers/postController");
const router = express.Router();
const {isAuthenticatedUser, authorizeRoles} = require("../middleware/auth");

router.route('/createPost').post(isAuthenticatedUser, createPost);
router.route('/createSchedulePost').post(isAuthenticatedUser, createSchedulePost);
router.route('/deletePost/:id').delete(isAuthenticatedUser, deletePost);
router.route('/deleteScheduledPost/:id').delete(isAuthenticatedUser, deleteScheduledPost);
router.route('/posts').get(getAllPosts);
router.route('/schedulePosts').get(getAllSchedulePosts);
router.route('/trends').get(getAllTrends);
router.route('/trendPosts').get(getSpecificTrendPosts);
router.route('/comment/:id')
     .get(getSpecificPosts)
     .delete(isAuthenticatedUser, deleteComment);
router.route('/comment/:id')
router.route('/addComment').put(isAuthenticatedUser, createComment);
router.route('/dislike').put(isAuthenticatedUser, dislikePost);
router.route('/like/:id').get(isAuthenticatedUser, likePost);

module.exports = router;

