const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const mongoose = require('mongoose');
const morgan = require('morgan');

const router = express.Router();
// const searchPageRouter = require('./searchPageRoute');
const authorPageRouter = require('./authorPageRoute');

app.use(morgan('common'));
app.use(express.static('public'));

mongoose.Promise = global.Promise;


// app.use('/searchPage', searchPageRouter);
// app.use('/authorPage', authorPageRouter);
const {DATABASE_URL, PORT} = require('./config'); 
const {Quotes} = require('./models');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/quotes', (req, res) => {
    Quotes
    .find()
    .exec()
    .then(quotes => {
      res.json(quotes.map(quote => quote.apiRepr()));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went terribly wrong'});
    });
})

app.get('/quotes/:id', (req, res) => {
  Quotes
  .findById(req.params.id)
  .exec()
  .then(quote => res.json(quote.apiRepr()))
  .catch(err => {
    console.error(err);
    res.status(500).json({error: 'something went horribly awry'});
  });

})

app.post('/quotes', jsonParser, (req, res) => {
  const requiredFields = ['quoteText', 'quoteAuthor', "source", "sender"];
  for(let i=0; i < requiredFields.length; i++){
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }

    Quotes
    .create({
      quoteText: req.body.quoteText,
      quoteAuthor: req.body.quoteAuthor,
      source: req.body.source,
      sender: req.body.sender
    })
    .then(quote => res.status(201).json(quote.apiRepr()))
    .catch(err => {
        console.error(err);
        res.status(500).json({error: 'Something went wrong'});
    });

});

app.put('/quotes/:id', jsonParser, (req, res) => {
  
  if (!(req.params.id && req.body.id === req.body.id)) {
    res.status(400).json({
      error: 'Request path id and request body id values must match'
    });
  }

  const updated = {};
  const updateableFields = ['quoteText', 'quoteAuthor', "source", "sender"];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });

  Quotes
  .findByIdAndUpdate(req.params.id, {$set: updated}, {new: true})
  .exec()
  .then(updatedQuote => res.status(201).json(updatedQuote.apiRepr()))
  .catch(err => res.status(500).json({message: 'Something went wrong'}));
});

app.delete('/quotes/:id', (req, res) => {
  Quotes
  .findByIdAndRemove(req.params.id)
  .exec()
  .then(() => {
    console.log(`Delete quote \`${req.params.ID}\``);
    res.status(204).end();
  })
 
})
    
function runServer(databaseUrl=DATABASE_URL, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

// this function closes the server, and returns a promise. we'll
// use it in our integration tests later.

function closeServer() {
  return mongoose.disconnect().then(() => {
     return new Promise((resolve, reject) => {
       console.log('Closing server');
       server.close(err => {
           if (err) {
               return reject(err);
           }
           resolve();
       });
     });
  });
}


// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {runServer, app, closeServer};