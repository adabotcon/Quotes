exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                      'mongodb://adabotcon:3169Quotes@ds131151.mlab.com:31151/quotesholic';
exports.TEST_DATABASE_URL = (
	process.env.TEST_DATABASE_URL ||
	'mongodb://localhost/quotesData-test');
exports.PORT = process.env.PORT || 8080;