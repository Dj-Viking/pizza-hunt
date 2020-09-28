const { Schema, model } = require('mongoose');
const moment = require('moment');

const CommentSchema = new Schema
(
  {
    writtenBy: {
      type: String
    },
    commentBody: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const Comment = model('Comment', CommentSchema);

module.exports = Comment;
