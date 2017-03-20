const express = require('express');
const app = express();
app.use(express.static('public'));
const searchPageRouter = require('./searchPageRoute');
const authorPageRouter = require('./authorPageRoute');

app.use('/searchPage', searchPageRouter);
app.use('/authorPage', authorPageRouter);
const {Quotes} = require('./models');

router.get('/quotes' (req, res) => {
  res.json(Quotes.get());
})

router.post('/quotes', jsonParser, (req, res) => {
  const requiredFields = ['quoteText', 'quoteAuthor', "source", "sender"];
  for(let i=0; i < requiredFields.length; i++){
    const field = requiredFields[i];
    if (!(field in re.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }

  const item = Quotes.create(req.body.quoteText, req.body.quoteAuthor, req.body.source, req.body.sender);
  res.status(201).json(item);
});

router.put('/quotes/:id', jsonParser, (req, res) => {
  const requiredFields = ['quoteText', 'quoteAuthor', "source", "sender"];
  for(let i=0; i < requiredFields.length; i++){
    const field = requiredFields[i];
    if (!(field in re.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  if(req.params.id !== req.body.id) {
    const message = (
      `Request path id (${req.params.id} and request body id`
      `(${req.body.id}) must match`);
    console.error(message);
    return res.status(400).send(message);
  }
  console.log(`Updating quotes item \`${req.params.id}\``);
  const updatedItem = Quotes.update({
    id: req.params.id,
    quoteText: req.body.quoteText,
    quoteAuthor: req.body.quoteAuthor,
    source: req.body.source,
    sender: req.body.sender
  });
  res.status(204).json(updatedItem);
});

router.delete('/quotes/:id', (req, res) => {
  Quotes.delete(req.params.id);
  console.log(`Delete quote \`${req.params.ID}\``);
  res.status(204).end();
})
    
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