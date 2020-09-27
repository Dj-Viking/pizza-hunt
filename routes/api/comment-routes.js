const router = require('express').Router();
const { addComment, delComment } = require('../../controllers/comment-controller.js');

// POST a comment /api/comments/<pizzaId>
router.route('/:pizzaId').post(addComment);

//DELETE a comment /api/comments/<pizzaId>/<commentId>
router.route('/:pizzaId/:commentId').delete(delComment);

module.exports = router;