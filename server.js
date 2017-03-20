const express = require('express');
const app = express();
app.use(express.static('public'));
const searchPageRouter = require('./searchPageRoute');
const authorPageRouter = require('./authorPageRoute');

app.use('/searchPage', searchPageRouter);
app.use('/authorPage', authorPageRouter);


    
    
function runServer() {
  const port = process.env.PORT || 8080;
  return new Promise((resolve, reject) => {
    server = app.listen(port, () => {
      console.log(`Your app is listening on port ${port}`);
      resolve(server);
    }).on('error', err => {
      reject(err)
    });
  });
}


// this function closes the server, and returns a promise. we'll
// use it in our integration tests later.
function closeServer() {
  return new Promise((resolve, reject) => {
    console.log('Closing server');
    server.close(err => {
      if (err) {
        reject(err);
        // so we don't also call `resolve()`
        return;
      }
      resolve();
    });
  });
}
module.exports = {runServer, app, closeServer};