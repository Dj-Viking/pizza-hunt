const { Comment, Pizza } = require('../models');

const commentController = {
  //add comment to pizza
  addComment({ params, body }, res) {//req.params, req.body
    console.log(body);
    Comment.create(body)
    .then(({ _id }) => {//body._id
      console.log(_id);
      return Pizza.findOneAndUpdate
      (
        { _id: params.pizzaId },
        { $push: { comments: _id } },//$push method works just the same as adding to an array. all mongoDB functions start with a ( $ ) sign to note that the function is native to mongoDB
        { new: true }
      );
    })
    .then(dbPizzaData => {
      if (!dbPizzaData) {
        res.status(404).json({message: `no pizza found with the id of ${params.pizzaId}`});
        return;
      }
      res.status(200).json(dbPizzaData);
    })
    .catch(e => console.log(e));
  },
  //delete comment
  delComment({ params }, res) {
    Comment.findOneAndDelete
    (
      { _id: params.commentId }
    )
    .then(deletedComment => {
      if (!deletedComment) {
        res.status(404).json({ message: `no comment with the id of ${params.commentId}` });
        return;
      }
      return Pizza.findOneAndUpdate
      (
        { _id: params.pizzaId },
        { $pull: { comments: params.commentId } },//pull is opposite of push, removes an item instead of adding the item.
        { new: true }
      );
    })
    .then(dbPizzaData => {
      if (!dbPizzaData) {
        res.status(404).json({ message: `no pizza with the id of ${params.pizzaId}` });
        return;
      }
      res.status(200).json(dbPizzaData);
    })
    .catch(e => { console.log(e); res.json(e); });
  }
}

module.exports = commentController;