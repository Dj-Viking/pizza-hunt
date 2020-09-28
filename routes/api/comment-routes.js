const router = require('express').Router();
const { 
  addComment, 
  delComment,
  addReply,
  delReply } = require('../../controllers/comment-controller.js');

// POST a comment /api/comments/<pizzaId>
router.route('/:pizzaId')
.post(addComment);

//add a reply
//UPDATE a comment /api/comments/<pizzaId>/<commentId>/<replyId>
//DELETE a comment /api/comments/<pizzaId>/<commentId>
router.route('/:pizzaId/:commentId')
.put(addReply)
.delete(delComment);

//delete a reply
//UPDATE a comment /api/comments/<pizzaId>/<commentId>/<replyId>
router.route('/:pizzaId/:commentId/:replyId')
.delete(delReply);

module.exports = router;