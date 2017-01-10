var _ = require('lodash');
var Feedback = require('./models/feedback.js');

//React-Redux
var React = require('react');
import { createStore } from 'redux'
import { Provider } from 'react-redux'
// import { renderToString } from 'react-dom/server'
import DivComponent from './DivComponent';

var ReactDOMServer = require('react-dom/server');



// Redux handlers
function handleRender(req, res) {
  const html = ReactDOMServer.renderToString(<MyComponent />);
  //const preloadedState = store.getState();
  res.sendFile('/public/index.html', { root: __dirname});
  //res.send(renderFullPage(html, null))
}

function renderFullPage(html, preloadedState){
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          // WARNING: See the following for Security isues with this approach:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
  `
}

module.exports = function (app) {
  app.get('/', function (req, res) {
    console.log(__dirname);
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
