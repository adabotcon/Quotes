var QUOTES_URL = '/quotes';

function getQuotesAll(callbackFn){
	console.log('Retrieving quotes');
	$.getJSON(QUOTES_URL, callbackFn);
}

function displayAuthors(data){
	console.log(data);
	for(index in data.quotes) {
		$('.js-list-authors').append('<li class="author-item">' + data.quotes[index].quoteAuthor + '</li>');
	}
	displayAuthorQuotes(data);
}

function getAndDisplayAuthors(){
	getQuotesAll(displayAuthors);
}

function displayAuthorQuotes(data){
	$('.author-item').on('click', function(event){
		event.preventDefault();
		hideClass('.list-authors-form');
		var author = $(this).text();
		//search for specific author's quotes
		$.each(data.quotes, function(event, quote){
			event.preventDefault();
			if(quote.quoteAuthor === author){
				$('.js-author-quotes').append('<p class="quote-item">' + quote.quoteText + '</p>');
			}
		})
		displayClass('.js-author-quotes');
		displayQuote('.js-author-quotes', author, data);
	})
}

function displayQuote(element, author, data){
	$('.quote-item').on('click', function(event){
		event.preventDefault();
		hideClass(element);
		$('.js-single-quote').append('<p class="quote-text">' + $(this).text() + `</p> <p class="author-text"> ~ ${author} </p>`);
		displayClass('.js-single-quote');
		displayClass('.edit-single-quote');
		displayEditForm(data);
	})
}

function displayQuoteExtra(element, element2, data){
	$('.quote-item').on('click', function(event){
		event.preventDefault();
		hideClass(element);
		hideClass(element2);
		var textArray = $(this).text().split(":");
		$('.js-single-quote').append('<p class="quote-text">' + textArray[0] + '</p> <p class="author-text"> ~ ' + textArray[2] + '</p>');
		displayClass('.js-single-quote');
		displayClass('.edit-single-quote');
		displayEditForm(data);
	})
}

function getAndDisplaySingleQuotes(){
	getQuotesAll(displaySingleQuotes);
}

function displaySingleQuotes(data){
	$('.js-search-form').on('submit', function(event){
		event.preventDefault();
		var searchText = $('.js-search-input').val();
		$.each(data.quotes, function(event, quote){
			event.preventDefault();
			if(quote.quoteText.includes(searchText)){
				$('.js-search-quote-list-form').append('<p class="quote-item">' + quote.quoteText + ' :Author: ' + quote.quoteAuthor + '</p>');
			}
		})
		displayClass('.js-search-quote-list-form');
		displayQuoteExtra('.js-search-quote-list-form', '.js-search-form', data);
	})
}

function displayEditForm(data){

}

function handleAddQuote(){
	$('.js-add-quote-form').on('submit', function(event) {
		event.preventDefault();
		var quote = $('.js-quote').val();
		var author = $('.js-author').val();
		var source = $('.js-source').val();
		var sender = $('.js-sender').val();
		addQuote({
			quoteText: quote,
			quoteAuthor: author,
			source: source,
			sender: sender
		});
	});
}

function handleDeleteQuote(){
	$('.js-delete-button').on('click', function(event) {
		event.preventDefault();
		var quote = $('.js-single-quote single-quote').text();
		//This won't work
		deleteQuote(quote);
		window.location.reload();
	})

}

function handleEditQuote(){
	$('.js-edit-button').on('click', function(event) {
		event.preventDefault();
		var quote = $('.js-single-quote single-quote').text();
		// This won't work
		var newQuote = editQuote(quote);
		$('.js-single-quote single-quote').text(newQuote);
	})

}

function hideClass(element){
	element.addClass('hidden');
}

function displayClass(element){
	element.removeClass('hidden');
}

function addQuote(quote){
	console.log(`Adding quote: ${quote}`);
	$.ajax({
		method: 'POST',
		url: QUOTES_URL,
		data: JSON.stringify(quote),
		dataType: 'json',
		contentType: 'application/json'
	}).done(function(data) {
		console.log("Adding quote to database: " + data.quote.id);
	})
}

function deleteQuote(quoteID){
	console.log('Deleting quote ' + quoteID);
	$.ajax({
		url: QUOTES_URL + '/' + recipeId,
		method: 'DELETE',
	}).done(function(data) {
		console.log("Deleting quote" + data.quote.id);
	})
}

function editQuote(quote){
	console.log('Updating quote' + quote.id);
	$.ajax({
		url: QUOTES_URL + '/' + quote.id,
		method: 'PUT',
		data: quote,
	}).done(function(data) {
		return data;
		console.log("Editing quote " + data.quote.id + "with " + quote);
	})
}

$(function(){
	getAndDisplayAuthors();
	// getAndDisplaySingleQuotes();
	handleAddQuote();
	editQuote();
	deleteQuote();
})
