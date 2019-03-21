var r2 = require("r2");
var qs = require("qs");

var trelloApiKey;
var trelloAuthToken;

async function getListCardCount(list_id, cb) {

	var url = 'https://api.trello.com/1/lists/' + list_id + '/cards?' 
	           + qs.stringify({ key: trelloApiKey, 
			  		token: trelloAuthToken,
			  		fields: 'id,name' })
	try {
		const data = await r2(url).json;
		console.log("data for " + list_id)
		console.log(data);
		return data.length;
	} catch (error) {
		console.log(error);
	}
}
	

// I got these ids by visiting 
// https://developers.trello.com/v1.0/reference#listsidcards 
// should be a property of the contract, really
var TODO_LIST_ID = "5c90f899052fe73c0201df62"
var DONE_LIST_ID = "5c90f899052fe73c0201df63"

module.exports = {
	getPercentDone: async function(app) {
		
		// trelloApiKey = app.get('trello_api_key');
		// trelloAuthToken = app.get('trello_oauth_token');

		trelloApiKey = "604d948ba2422494f8b7c8195ea5bb18";
		trelloAuthToken = "22e6828a5f850717614a507018355e88549e636d02f807da9330b93449832cd4";

		todo_count = await getListCardCount(TODO_LIST_ID); 
		done_count = await getListCardCount(DONE_LIST_ID);

		var total = todo_count + done_count;
		var percentDone = done_count / total;
		return percentDone;
	}
}


// to test from command line 
// var done = (function wait () { if (!done) setTimeout(wait, 1000) })();
// async function tmp() {
// 	var percentDone = await module.exports.getPercentDone();
// 	console.log("PERCENT DONE " + percentDone );	
// }
// tmp();

