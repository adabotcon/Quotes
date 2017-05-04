const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');

const {TEST_DATABASE_URL} = require('../config.js');

const should = chai.should();

chai.use(chaiHttp);

describe('Quotes', function() {

  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  // Close server after these tests run in case
  // we have other test modules that need to 
  // call `runServer`. If server is already running,
  // `runServer` will error out.
  after(function() {
    return closeServer();
  });
  // `chai.request.get` is an asynchronous operation. When
  // using Mocha with async operations, we need to either
  // return an ES6 promise or else pass a `done` callback to the
  // test that we call at the end. We prefer the first approach, so
  // we just return the chained `chai.request.get` object.
  it('should list quote on GET', function(done) {
    chai.request(app)
      .get('/quotes')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.length.should.be.above(0);
        res.body.forEach(function(item) {
          item.should.be.a('object');
          item.should.have.all.keys(
            'id', 'quoteText', 'quoteAuthor', 'sender', 'source')
        });
      });
    done();
  });
  it('should add a quote on POST', function(done){
    const newQuote = {
      quoteText: 'lorem ip some',
      quoteAuthor: 'Adara Latour',
      source: 'tests',
      sender: 'adabotcon'
    };
    const expectedKeys = ['id'].concat(Object.keys(newQuote));
    chai.request(app)
      .post('/quotes')
      .send(newQuote)
      .end(function(err, res) {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.all.keys(expectedKeys);
        res.body.quoteText.should.equal(newQuote.quoteText);
        res.body.quoteAuthor.should.equal(newQuote.quoteAuthor);
        res.body.source.should.equal(newQuote.source);
        res.body.sender.should.equal(newQuote.sender);
      });
      done();
  });

  it('should error if POST missing expected values', function(done) {
    const badRequestData = {};
    chai.request(app)
      .post('/quotes')
      .send(badRequestData)
      .end(function(err, res) {
        res.should.have.status(400);
      })
    done();
  });

  it('should update quote on PUT', function(done) {

    chai.request(app)
      // first have to get
      .get('/quotes')
      .end(function(err, res) {
        const updatedQuote = Object.assign(res.body[0], {
          quoteText: 'connect the dots',
          quoteAuthor: 'la la la la la',
          source: 'lala land',
        });
        chai.request(app)
          .put(`/quotes/${res.body[0].id}`)
          .send(updatedQuote)
          .end(function(err, res) {
            res.should.have.status(204);
            res.should.be.json;
          });
      })
      done();
  });

  it('should delete quote on DELETE', function(done) {
    chai.request(app)
      // first have to get
      .get('/quotes')
      .end(function(err, res) {
        chai.request(app)
          .delete(`/quotes/${res.body[0].id}`)
          .end(function(err, res) {
            res.should.have.status(204);
          });
      })
      done();
  });
});