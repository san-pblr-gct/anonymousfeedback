var _ = require('lodash');
var Feedback = require('./models/feedback.js');

module.exports = function (app) {
  app.get('/', function (req, res) {
    //res.sendFile('/public/index.html', { root: __dirname});
    //handleRender(req,res);
      Feedback.find(function (err, feedbacks) {
       if (err) {
        res.json({ IsSucessful: false, Info: 'Error during feedback retrival' });
       }
        else {
         res.json({ IsSucessful: true, Info: 'Feedbacks retrived successfully', data: feedbacks });
        }
     });
  });

  app.post('/feedback', function (req, res) {

    var newFeedback = new Feedback(req.body);
    newFeedback.save(function (err) {
      if (err) {
        res.send('error');
      }
      else
        res.send('Success');
    });
  });

  app.put('/comment/:feedbackId', function (req, res) {
    Feedback.findById(req.params.feedbackId, function (err, feedback) {
      if (err) {
        res.json({ IsSucessful: false, Info: 'Error during feedback retrival', error: err });
      }
      if (feedback) {
        feedback.postedComments.push(req.body);
        feedback.save(function (err) {
          if (err) {
            res.send('error');
          }
          else
            res.send('Success');
        });
      }
    });
  });
}
