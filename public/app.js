var QUOTES_URL = 'http://localhost:8080/quotes';
var state = {
	quotes: []
}

function callAPI(callbackFn){
	console.log('Retrieving quotes');
	$.getJSON(QUOTES_URL, callbackFn);
}

function getSingleQuote(callbackFn, quoteID){
	console.log('Retrieving single quote');
	$.getJSON(QUOTES_URL + "/" + quoteID, callbackFn);
}

function getAuthors(data){
	console.log("Getting authors");
	callAPI(displayAuthors);

}

function getQuotes(){
	console.log("Display single-quote");
	callAPI(handleQuoteSearch);
}

function displayAuthors(data){
	var authorArray = data;
	var tempAuthorArray = authorArray.map(quote => quote.quoteAuthor);
	var uniqueAuthorArray = Array.from(new Set(tempAuthorArray));
	for(index in uniqueAuthorArray) {
		$('.js-list-authors').append('<li class="author-item">' + uniqueAuthorArray[index] + '</li>');
	}
	displayAuthorQuotes(data);
}

function displayAuthorQuotes(data){
	$('.author-item').on('click', function(event){
		event.preventDefault();
		hideClass($('.list-authors-form'));
		var author = $(this).text();
		var authorQuotes = data.filter(quote => quote.quoteAuthor === author);
		for(index in authorQuotes){
			$('.js-author-quotes').append('<p class="quote-item" data-id="'+ authorQuotes[index].id + '">' + authorQuotes[index].quoteText + '</p>');
		}
		
		displayClass($('.js-author-quotes'));
		displayQuote($('.js-author-quotes'), author, data);
	})
}

function displayQuote(element, author, data){
	$('.quote-item').on('click', function(event){
		event.preventDefault();
		event.stopPropagation();
		hideClass(element);
		var quoteID = $(this).attr("data-id");
		data.forEach(function(quote) {
			if(quote.id === quoteID){
				$('.js-single-quote').append('<p class="quote-text" data-id="' + quoteID + '">' + quote.quoteText + '</p> <p class="author-text"> ~ ' + quote.quoteAuthor + '</p><p class="source-text"> (' + quote.source +') </p>');
			}
		})
		displayClass($('.js-single-quote'));
		displayClass($('.edit-single-quote'));
		handleEditQuote(data, quoteID);
		handleDeleteQuote(data, quoteID);
	})
}

function displayQuoteExtra(element, element2, data){
	$('.quote-item').on('click', function(event){
		event.preventDefault();
		event.stopPropagation();
		hideClass(element);
		hideClass(element2);
		var quoteID = $(this).attr('data-id');
		data.forEach(function(quote) {
			if(quote.id === quoteID){
				$('.js-single-quote').append('<p class="quote-text" data-id="' + quoteID + '">' + quote.quoteText + '</p> <p class="author-text"> ~ ' + quote.quoteAuthor + '</p><p class="source-text"> (' + quote.source +') </p>');
			}
		})
		displayClass($('.js-single-quote'));
		displayClass($('.edit-single-quote'));
		handleEditQuote(data, quoteID);
		handleDeleteQuote(data, quoteID);
	})
}

function handleQuoteSearch(data){
	$('.js-search-form').on('submit', function(event){
		console.log("Starting search");
		event.preventDefault();
		var searchText = $('.js-search-input').val();
		data.forEach(function(quote) {
			if(quote.quoteText.includes(searchText)){
				$('.js-search-quote-list-form').append('<p class="quote-item" data-id="' + quote.id + '">' + quote.quoteText + ' ~ ' + quote.quoteAuthor + '</p>');
			}
		})
		displayClass($('.js-search-quote-list-form'));
		displayQuoteExtra($('.js-search-quote-list-form'), $('.js-search-form'), data);
	})
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

function handleDeleteQuote(data, quoteID){
	$('.js-delete-button').on('click', function(event) {
		event.preventDefault();
		deleteQuote(quoteID);
		window.location.reload();
	})

}

function handleEditQuote(data, quoteID){
	$('.js-edit-button').on('click', function(event) {
		event.preventDefault();
		hideClass($('.js-single-quote'));
		hideClass($('.edit-single-quote'));
		data.forEach(function(item){
			if(item.id === quoteID){
				$('.js-author-edit-input').val(item.quoteAuthor);
				$('.js-quote-edit-input').val(item.quoteText);
				$('.js-source-edit-input').val(item.source);
				displayClass($('.js-edit-form'));
				createNewQuote(item);
			}
		})
	})

}

function createNewQuote(quote){
	$('.js-edit-submit').on('click', function(event) {
			event.preventDefault();
			var editedQuote = {
				id: quote.id,
				quoteText: $('.js-quote-edit-input').val(),
				quoteAuthor: $('js-author-edit-input').val(),
				source: $('.js-source-edit-input').val(),
				sender: quote.sender
			};

			editQuote(editedQuote);
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
		console.log("Adding quote to database: " + data.id);
	})
}

function deleteQuote(quoteID){
	console.log('Deleting quote ' + quoteID);
	$.ajax({
		url: QUOTES_URL + '/' + quoteID,
		method: 'DELETE',
	}).done(function(data) {
		console.log("Deleted quote: " + quoteID);
	})
}

function editQuote(quote){
	console.log('Updating quote' + quote.id);
	$.ajax({
		url: QUOTES_URL + '/' + quote.id,
		method: 'PUT',
		data: quote,
	}).done(function(data) {
		displayNewQuote(data);
	})
}

function displayNewQuote(data){
	//NOT WORKING
	// event.stopPropagation();
	// 	$('.js-single-quote').append('<p class="quote-text" data-id="' + data.id + '">' + data.quoteText + '</p> <p class="author-text"> ~ ' + data.quoteAuthor + '</p><p class="source-text"> (' + data.source +') </p>');
	// 	hideClass($('.js-edit-form'));
	// 	displayClass($('.js-single-quote'));
	// 	displayClass($('.edit-single-quote'));
}



