const { Comment, Pizza } = require('../models');

const commentController = {
  //add comment to pizza
  addComment({ params, body }, res) {//req.params, req.body
    console.log(``);
    console.log("\x1b[33m", "client request to add a comment", "\x1b[00m");
    console.log(``);
    console.log(body);
    Comment.create(body)
    .then(({ _id }) => {//body._id
      console.log(_id);
      return Pizza.findOneAndUpdate
      (
        { _id: params.pizzaId },
        { $push: { comments: _id } },//$push method works just the same as adding to an array. all mongoDB functions start with a ( $ ) sign to note that the function is native to mongoDB
        { new: true }
      )
      .populate(
        {
          path: 'comments',
          select: '-__v'
        }
      )
      .select('-__v')
    })
    .then(dbPizzaData => {
      console.log(dbPizzaData);
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
    console.log(``);
    console.log("\x1b[33m", "client request to delete a comment", "\x1b[00m");
    console.log(``);
    console.log(params);
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
      )
      .populate(
        {
          path: 'comments',
          select: '-__v'
        }
      )
      .select('-__v')
    })
    .then(dbPizzaData => {
      console.log(dbPizzaData);
      if (!dbPizzaData) {
        res.status(404).json({ message: `no pizza with the id of ${params.pizzaId}` });
        return;
      }
      res.status(200).json(dbPizzaData);
    })
    .catch(e => { console.log(e); res.json(e); });
  },
  //add reply to a comment
  addReply: async ({ params, body }, res) => {
    console.log(``);
    console.log("\x1b[33m", "client request to add a reply to a comment", "\x1b[00m");
    console.log(``);
    console.log(params);
    console.log(body);
    try {
      const dbPizzaData = await Comment.findOneAndUpdate
      (
        { _id: params.commentId },
        { $push: { replies: body } },
        { new: true }
      );
      console.log(dbPizzaData);
      if (!dbPizzaData) {
        res.status(404).json({ message: `no comment? or pizza? found with the id of ${params.commentId}`});
        return;
      } else {
        res.status(200).json(dbPizzaData);
      }
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  //delete a reply to a comment
  delReply: async ({ params }, res) => {
    console.log(``);
    console.log("\x1b[33m", "client request to delete a reply on a comment", "\x1b[00m");
    console.log(``);
    console.log(params);
    try {
      const dbPizzaData = await Comment.findOneAndUpdate
      (
        { _id: params.commentId },
        { $pull: { replies: { replyId: params.replyId } } },
        { new: true }
      );
      console.log(dbPizzaData);
      if (!dbPizzaData) {
        res.status(404).json({ message: `no pizza or comment found with the id of ${params.commentId} or reply id ${params.replyId}`});
        return;
      } else {
        res.status(200).json(dbPizzaData);
      }
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }
};

module.exports = commentController;