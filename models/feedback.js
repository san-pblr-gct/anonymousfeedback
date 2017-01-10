var mongoose = require('mongoose');

var feedbackSchema = mongoose.Schema({
  post: String,
  postedDate: Date,
  showAll: Boolean,
  postedComments: [{
      comment: String,
      commentedDate: Date
    }]
});

module.exports = mongoose.model('feedback', feedbackSchema);