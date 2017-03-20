const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {Quotes} = require('./models');

router.get('/' (req, res) => {
	res.json(Quotes.get());
})

router.post('/', jsonParser, (req, res) => {
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

router.put('/:id', jsonParser, (req, res) => {
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

router.delete('/:id', (req, res) => {
	Quotes.delete(req.params.id);
	console.log(`Delete quote \`${req.params.ID}\``);
	res.status(204).end();
})

module.exports = router;