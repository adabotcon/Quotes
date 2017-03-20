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

var MOCK_AUTHORS_UPDATES = {
	"authors": [
		{
			"id" : "111"
			"quoteText": "Build a man a fire, and he'll be warm for a day. Set a man on fire, and he'll be warm for the rest of his life.",
			"quoteAuthor": "Terry Pratchett",
			"source": "Discworld: Jingo",
			"sender": "adabotcon"
		}
		{
			"id" : "112"
			"quoteText": "In ancient times cats were worshipped as gods; they have not forgotten this.",
			"quoteAuthor": "Terry Pratchett",
			"source": "Discworld: Pyramids",
			"sender": "adabotcon"
		}
		{
			"id" : "113"
			"quoteText": "It is said that your life flashes before your eyes just before you die. That is true, it's called Life.",
			"quoteAuthor": "Terry Pratchett",
			"source": "Discworld: The Last Continent",
			"sender": "adabotcon"
		}
		{
			"id" : "114"
			"quoteText": "An education was a bit like a communicable sexual disease. It made you unsuitable for a lot of jobs and then you had the urge to pass it on.",
			"quoteAuthor": "Terry Pratchett",
			"source": "Discworld: Hogfather",
			"sender": "adabotcon"
		}
		{
			"id" : "115"
			"quoteText": "Time is a drug. Too much of it kills you.",
			"quoteAuthor": "Terry Pratchett",
			"source": "Discworld: Small Gods",
			"sender": "adabotcon"
		}
		{
			"id" : "116"
			"quoteText": "Fairy tales are more than true: not because they tell us that dragons exist, but because they tell us that dragons can be beaten.",
			"quoteAuthor": "Neil Gaiman",
			"source": "Coraline",
			"sender": "adabotcon"
		}
		{
			"id" : "117"
			"quoteText": "You know what happens when you dream of falling? Sometimes you wake up. Sometimes the fall kills you. And sometimes, when you fall, you fly.",
			"quoteAuthor": "Neil Gaiman",
			"source": "The Sandman, Vol. 6: Fables and Reflections",
			"sender": "adabotcon"
		}
		{
			"id" : "118"
			"quoteText": "I hope that in this year to come, you make mistakes. Because if you are making mistakes, then you are making new things, trying new things, learning, living, pushing yourself, changing yourself, changing your world. You're doing things you've never done before, and more importantly, you're Doing Something.",
			"quoteAuthor": "Neil Gaiman",
			"source": "http://journal.neilgaiman.com/2011/12/my-new-year-wish.html",
			"sender": "adabotcon"
		}
		{
			"id" : "119"
			"quoteText": "Stories may well be lies, but they are good lies that say true things, and which can sometimes pay the rent.",
			"quoteAuthor": "Neil Gaiman",
			"source": "http://journal.neilgaiman.com/2004/11/politics-portugal-and-no-gumbo-limbo.asp",
			"sender": "adabotcon"
		}
		{
			"id" : "110"
			"quoteText": "You get what anybody gets - you get a lifetime.",
			"quoteAuthor": "Neil Gaiman",
			"source": "The Sandman, Vol. 1: Preludes and Nocturnes",
			"sender": "adabotcon"
		}
		{
			"id" : "121"
			"quoteText": "With great power there must also come ... great responsibility!",
			"quoteAuthor": "Stan Lee",
			"source": "Amazing Fantasy, #15",
			"sender": "adabotcon"
		}
		{
			"id" : "122"
			"quoteText": " ...Happy Valentine's Day, Spider-Man. You get to resuscitate an old man you just pulled up from the sewer",
			"quoteAuthor": "Peter Parker",
			"source": "Peter Parker (Earth-616)",
			"sender": "adabotcon"
		}
		{
			"id" : "123"
			"quoteText": "Passion begets hunger. Hunger consumes worlds.",
			"quoteAuthor": "Silver Surfer",
			"source": "Fabian Nicieza, Cable & Deadpool, Volume 1: If Looks Could Kill",
			"sender": "adabotcon"
		}
		{
			"id" : "124"
			"quoteText": "Life is an endless series of train-wrecks with only brief, commercial-like breaks of happiness.",
			"quoteAuthor": "Deadpool",
			"source": "Deadpool (2016)",
			"sender": "adabotcon"
		}
		{
			"id" : "125"
			"quoteText": "Shhh. My common sense is tingling.",
			"quoteAuthor": "Deadpool",
			"source": "https://en.wikiquote.org/wiki/Deadpool_(series)",
			"sender": "adabotcon"
		}
		{
			"id" : "126"
			"quoteText": "Be a bush if you can't be a tree. If you can't be a highway, just be a trail. If you can't be a sun, be a star. For it isn't by size that you win or fail. Be the best of whatever you are.",
			"quoteAuthor": "Martin Luther King, Jr.",
			"source": "speech before a group of students at Barratt Junior High School in Philadelphia, October 26, 1967",
			"sender": "adabotcon"
		}
		{
			"id" : "127"
			"quoteText": "Intelligence plus character—that is the goal of true education.",
			"quoteAuthor": "Martin Luther King, Jr.",
			"source": "'The Purpose of Education' from Morehouse College student newspaper, The Maroon Tiger, 1947",
			"sender": "adabotcon"
		}
		{
			"id" : "128"
			"quoteText": "The ultimate measure of a man is not where he stands in moments of comfort and convenience, but where he stands at times of challenge and controversy.",
			"quoteAuthor": "Martin Luther King, Jr.",
			"source": "Strength to Love, 1963",
			"sender": "adabotcon"
		}
		{
			"id" : "129"
			"quoteText": "We know through painful experience that freedom is never voluntarily given by the oppressor, it must be demanded by the oppressed.",
			"quoteAuthor": "Martin Luther King, Jr.",
			"source": "‘Letter From Birmingham Jail,’ April 16, 1963",
			"sender": "adabotcon"
		}
		{
			"id" : "120"
			"quoteText": "Darkness cannot drive out darkness, only light can do that. Hate cannot drive out hate, only love can do that",
			"quoteAuthor": "Martin Luther King, Jr.",
			"source": "Strength to Love, 1963",
			"sender": "adabotcon"
		}
		{
			"id" : "131"
			"quoteText": "Down here... It's kill or be killed!",
			"quoteAuthor": "Flowey",
			"source": "Undertale",
			"sender": "adabotcon"
		}
		{
			"id" : "132"
			"quoteText": "This is Toriel. Are you bored? I should have given a book to you. My apologies. Why not use your imagination to divert yourself? Pretend you are... A monarch! Rule over the leaf pile with a fist of iron. Can you do that for me? ",
			"quoteAuthor": "Toriel",
			"source": "Undertale",
			"sender": "adabotcon"
		}
		{
			"id" : "133"
			"quoteText": "ANIME IS REAL, RIGHT!?",
			"quoteAuthor": "Undyne",
			"source": "Undertale",
			"sender": "adabotcon"
		}
		{
			"id" : "134"
			"quoteText": "it's a beautiful day outside... birds are singing, flowers are blooming... on days like these, kids like you... Should be burning in hell.",
			"quoteAuthor": "Sans",
			"source": "Undertale",
			"sender": "adabotcon"
		}
		{
			"id" : "135"
			"quoteText": "After I defeat you and take control of the timeline... I just want to reset everything. All your progress... everyone's memories. I'll bring them all back to zero!",
			"quoteAuthor": "Asriel",
			"source": "Undertale",
			"sender": "adabotcon"
		}
	]
}

