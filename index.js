'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const restService = express();

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());

restService.post('/foodCorner', function(req, res) {
	var responseJson;
	if(req.body.result && req.body.result.parameters){
		var params = req.body.result.parameters;
		var choices = params.choices;
		var quantity = params.quantity;
		var type = params.type;
		var flavors = params.flavors;
		var paymentType = params.paymentType;
		console.log("logging params " + choices + " : " + quantity + " : " + type + " : " + flavors);
		if(choices){
			responseJson = {
				speech: "We've chocolate, Strowberry, Vanilla and Mango available",
				displayText: "We've chocolate, Strowberry, Vanilla and Mango available",
				source: 'webhook-foodcorner'
			}
		}else if(quantity && type && flavors){
			responseJson = {
				speech: "You've ordered" + quantity + " " + type + " " + flavors + ". How would you like to pay? Card or Net Banking",
				displayText: "You've ordered" + quantity + " " + type + " " + flavors + ". How would you like to pay? Card or Net Banking",
				source: 'webhook-foodcorner'
			}
		}else if(paymentType){
			responseJson = {
				speech: "You've successfully placed order. Enjoy your icecream",
				displayText: "You've successfully placed order. Enjoy your icecream",
				source: 'webhook-foodcorner'
			}
		}
		return res.json(responseJson);
	}else{ 
		return res.json({
			speech: "I didn't get that. Please say it again",
			displayText: "I didn't get that. Please say it again",
			source: 'webhook-foodcorner'
		});
	}
});
restService.post('/slack-test', function(req, res) {
    var slack_message = {
        "text": "Details of JIRA board for Browse and Commerce",
        "attachments": [{
            "title": "JIRA Board",
            "title_link": "http://www.google.com",
            "color": "#36a64f",

            "fields": [{
                "title": "Epic Count",
                "value": "50",
                "short": "false"
            }, {
                "title": "Story Count",
                "value": "40",
                "short": "false"
            }],

            "thumb_url": "https://stiltsoft.com/blog/wp-content/uploads/2016/01/5.jira_.png"
        }, {
            "title": "Story status count",
            "title_link": "http://www.google.com",
            "color": "#f49e42",

            "fields": [{
                "title": "Not started",
                "value": "50",
                "short": "false"
            }, {
                "title": "Development",
                "value": "40",
                "short": "false"
            }, {
                "title": "Development",
                "value": "40",
                "short": "false"
            }, {
                "title": "Development",
                "value": "40",
                "short": "false"
            }]
        }]
    }
    return res.json({
        speech: "speech",
        displayText: "speech",
        source: 'webhook-echo-sample',
        data: {
            "slack": slack_message
        }
    });
});
restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});
