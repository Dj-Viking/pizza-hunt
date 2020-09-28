const { Schema, model } = require('mongoose');
const moment = require('moment');

const PizzaSchema = new Schema
(
  {
    pizzaName: {
      type: String
    },
    createdBy: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now,
      //this will format the date whenever the createdAt value is retrieved 
      get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
    size: {
      type: String,
      default: 'Large'
    },
    toppings: [],
    comments: [//creating relationship here between comment and pizza
      //expect an objectId and the data is coming from comment model
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ]
  },
  {//to use virtuals tell the schema to use virtuals
    toJSON: {
      virtuals: true,
      getters: true //allowing the use of our getter inside createdAt
    },
    id: false//setting this false since this is a virtual that mongoose returns
  }
);

//creating pizza virtual to add more information to the database
// response so that we dont have to add the information manually
// with a helper before responding to the API request
PizzaSchema.virtual('commentCount')
.get(function() {
  return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});
//using reduce method to tally up the total of every comment with replies
// in its basic form, reuce takes two parameters (accumulator, currentVal)
// accumulator is total and the currentVal is comment
// as reduce walks through the array, it passes the accumulating total and
// the current value of comment into the function, with the return of the
// function revising the total for the next iteration through the array

// similar to .map(), .reduce() executes a function on each element on the array
// but this time it uses the result of each function execution for each
// successive computation as it goes through the array.
// makes a good method for getting a sum of multiple values

const Pizza = model('Pizza', PizzaSchema);

module.exports = Pizza;