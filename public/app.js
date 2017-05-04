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
	uniqueAuthorArray.sort();
	for(index in uniqueAuthorArray) {
		$('.js-list-authors').append('<li class="author-item cursor li-margin mobile-text-large">' + uniqueAuthorArray[index] + '</li>');
	}
	displayAuthorQuotes(data);
}

function displayAuthorQuotes(data){
	$('.author-item').on('click', function(event){
		event.preventDefault();
		hideClass($('.list-authors-form'));
		hideClass($('.js-authors-title'));
		var author = $(this).text();
		var authorQuotes = data.filter(quote => quote.quoteAuthor === author);
		for(index in authorQuotes){
			$('.js-author-quotes').append('<p class="quote-item cursor cursor-hover italic-item source-serif-pro" data-id="'+ authorQuotes[index].id + '">' + authorQuotes[index].quoteText + '</p>');
		}
		$('.js-author-title').text(author);
		handleBreadCrumb(data, 'author', author);
		displayClass($('.js-author-quotes'));
		displayQuote($('.js-author-quotes'), author, data);
	})
}

function addQuoteFormListener(){
	$('.js-add-quote-button').on('click', function(event) {
		event.preventDefault();
		$('.js-add-quote-form').fadeToggle();
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
				$('.js-single-quote').append('<p class="quote-text mobile-text-medium" data-id="' + quoteID + '">' + quote.quoteText + '</p> <p class="author-text text-dark-green"> ~ ' + quote.quoteAuthor + '</p><p class="source-text text-dark-green"> (' + quote.source +') </p>');
			}
		})
		displayClass($('.js-single-quote'));
		displayClass($('.edit-single-quote'));
		handleBreadCrumb(data, 'quote', quoteID);
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
				$('.js-single-quote').append('<p class="quote-text mobile-text-medium" data-id="' + quoteID + '">' + quote.quoteText + '</p> <p class="author-text text-dark-green"> ~ ' + quote.quoteAuthor + '</p><p class="source-text text-dark-green"> (' + quote.source +') </p>');
			}
		})
		displayClass($('.js-single-quote'));
		displayClass($('.edit-single-quote'));
		handleBreadCrumb(data, 'quote', quoteID);
		handleEditQuote(data, quoteID);
		handleDeleteQuote(data, quoteID);
	})
}

function handleQuoteSearch(data){
	$('.js-search-form').keypress(function(event){
		console.log("Starting search");
		var searchText = $('.js-search-input').val();
		var results = data.map(quote => {
			if(quote.quoteText.includes(searchText)){
				return '<blockquote class="quote-item roboto cursor cursor-hover" data-id="' + quote.id + '">' + quote.quoteText + '</blockquote>' + '<cite>' + quote.quoteAuthor + '</cite>';
			}
		}).join('')
		$('.js-search-quote-list-form').html(results)
		handleBreadCrumb(data, 'search', '');
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
				quoteAuthor: $('.js-author-edit-input').val(),
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
	console.log("Adding quote");
	$.ajax({
		method: 'POST',
		url: QUOTES_URL,
		data: JSON.stringify(quote),
		dataType: 'json',
		contentType: 'application/json'
	}).done(function(data) {
		console.log("Quote added");
		debugger;
		window.location.reload();
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
		data: JSON.stringify(quote),
		dataType: 'json',
		contentType: 'application/json'
	}).done(function(data) {
		window.location.reload();
	})
}

function handleBreadCrumb(data, type, id){
	if(type === 'author'){
		$('.js-breadcrumb').append('<li class="hidden js-author-list-crumb cursor cursor-hover mobile-button roboto-slab">Authors List</li>');
		$('.js-breadcrumb').append('<li class="js-author-quotes-crumb cursor cursor-hover mobile-button roboto-slab" data-author-id="'+ id +'">Author Quotes</li>');
		renderBreadCrumbRoute(data, $('.js-author-list-crumb'), 'author-list');
		renderBreadCrumbRoute(data, $('.js-author-quotes-crumb'), 'author');
	} else if (type === 'quote'){
		$('.js-breadcrumb').append('<li class="js-quote-crumb mobile-button cursor cursor-hover roboto-slab" data-id="'+ id +'">Quote</li>');
		renderBreadCrumbRoute(data, $('.js-quote-crumb'), 'quote');

	} else if (type === 'search'){
		$('.js-breadcrumb').append('<li class="js-search-crumb mobile-button cursor cursor-hover roboto-slab"> Search </li>');
		renderBreadCrumbRoute(data, $('.js-search-crumb'), 'search');
	}

}

function handleBreadcrumbDelete(element){
	element.remove();

}

function renderBreadCrumbRoute(data, element, type){
	element.on('click', function(event) {
		event.preventDefault();
		event.stopPropagation();
		if(type === 'author'){
			var author = $(this).attr('data-author-id');
			var authorQuotes = data.filter(quote => quote.quoteAuthor === author);
			for(index in authorQuotes){
				$('.js-author-quotes').append('<p class="quote-item cursor cursor-hover italic-item source-serif-pro" data-id="'+ authorQuotes[index].id + '">' + authorQuotes[index].quoteText + '</p>');
			}
			$('.js-author-title').text(author);
			displayClass($('.js-author-quotes'));
			displayQuote($('.js-author-quotes'), author, data);
			hideClass($('.js-single-quote'));
			hideClass($('.edit-single-quote'));
			handleBreadcrumbDelete($('.js-quote-crumb'));
		} else if (type === 'quote'){
			var quoteID = $(this).attr("data-id");
			data.forEach(function(quote) {
				if(quote.id === quoteID){
					$('.js-single-quote').append('<p class="quote-text mobile-text-medium" data-id="' + quoteID + '">' + quote.quoteText + '</p> <p class="author-text text-dark-green"> ~ ' + quote.quoteAuthor + '</p><p class="source-text text-dark-green"> (' + quote.source +') </p>');
				}
			})
			displayClass($('.js-single-quote'));
			displayClass($('.edit-single-quote'));
			handleEditQuote(data, quoteID);
			handleDeleteQuote(data, quoteID);
		} else if (type === 'search'){
			window.location = 'index.html';
		} else if (type === 'author-list'){
			window.location = 'authorPage.html';
		}

	})
}
