function getAuthors(callbackFn){
	setTimeout(function(){
		callbackFn(MOCK_AUTHORS_UPDATES)
	}, 100);
}
//Keep after implementing
function displayAuthors(data){
	for(index in data.authors) {
		$('.js-list-authors').append('<li class="author-item">' + data.authors[index].quoteAuthor + '</li>');
	}
}

function getAndDisplayAuthors(){
	getAuthors(displayAuthors);
}

$(function(){
	getAndDisplayAuthors();
})