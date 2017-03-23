const mongoose = require('mongoose');

const quotesSchema = mongoose.Schema({
	quoteText: {type: String, required: true},
	quoteAuthor: {type: String, required: true},
	source: {type: String, required: true},
	sender: {type: String, required: true}
});

quotesSchema.methods.apiRepr = function(){
	return {
		id: this.id,
		quoteText: this.quoteText,
		quoteAuthor: this.quoteAuthor,
		source: this.source,
		sender: this.sender
	};
}

const Quotes = mongoose.model('Quotes', quotesSchema);

module.exports = {Quotes};