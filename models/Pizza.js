const { Schema, model } = require('mongoose');

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
      default: Date.now
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
    },
    id: false//setting this false since this is a virtual that mongoose returns
  }
);

//creating pizza virtual to add more information to the database
// response so that we dont have to add the information manually
// with a helper before responding to the API request
PizzaSchema.virtual('commentCount')
.get(function() {
  return this.comments.length; 
});

const Pizza = model('Pizza', PizzaSchema);

module.exports = Pizza;