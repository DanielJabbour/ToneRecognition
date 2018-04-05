var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
var bodyParser = require('body-parser');
var path = require('path');
var najax = require('najax');
var express = require('express');
var server = express();

//API authentication
var tone_analyzer = new ToneAnalyzerV3({
  username: 'YourUsername',
  password: 'YourPassword',
  version_date: 'Version'
});

server.listen(process.env.PORT || 3000, function () {
    console.log("Uploaded server listening on port 3000");
})

server.use(bodyParser.urlencoded({extended: false}));

server.get("/", function (req, res) {
    res.sendFile(__dirname + "/client.html");
})

server.post('/postTextData',function(req,res) {
	let result = emotion_check(req.body,function(data) {
		let result = data;
		res.send(result);
	}); 
	// return result;

});

//Put end result in callback(required data)

//The below function sends a text object params to the API and formats data
function emotion_check(params,callback){
	tone_analyzer.tone(params, function(error, response) {
	  if (error)
	    console.log('error:', error);
	  else
	    //This returns the set of data that i care about in pp as a list of objects
	    //tone[i] returns an object containing each emotion and the correlation
	    var data = response.document_tone;
	    console.log(JSON.stringify(response,null,2));


	    //The following loop locates the emotion with the highest correlation and marks its index

	    var max = data.tone_categories[0].tones[0].score;
	    var ind = 0;
	    for (i=1; i <data.tone_categories[0].tones.length; i+=1){
	      if (data.tone_categories[0].tones[i].score > max){
	        max = data.tone_categories[0].tones[i].score;
	        ind = i;
	      }
	    }

	    var a = data.tone_categories[2].tones[0].score;
	    var b = 0;
	    for (j=1; j<data.tone_categories[2].tones.length; j+=1){
	    	if (data.tone_categories[2].tones[j].score > a){
	    		a = data.tone_categories[2].tones[j].score;
	    		b = j;
	    	}
	    }



	    //Declaring variables for strongest tone and correlation

	    var toneStrong = data.tone_categories[0].tones[ind].tone_name;
	    var percent = data.tone_categories[0].tones[ind].score*100;

	    var socialStrong = data.tone_categories[2].tones[b].tone_name;
	    var percent2 = data.tone_categories[2].tones[b].score*100;
	    
	    console.log("The strongest emotion is: " + toneStrong + " with a correlation of: " + percent + "%");
	    callback({ "toneStrong": toneStrong, "percent": percent, "socialStrong": socialStrong, "percent2": percent2 });
	  }
);}
