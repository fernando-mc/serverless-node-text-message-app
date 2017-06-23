'use strict';

module.exports.process = (event, context, callback) => {
    // Process event and get values out
    var google_token = event["google_token"]
    var sms_message = event["sms_message"]
    // confirm that the values pass into this from the form

    // process google_token

    // Get fail if Google recaptcha token fails
    // If err with the google token not being vaild
    const failure_response = {
        statusCode: 500,
        body: JSON.stringify({
            message: 'The recaptcha failed. Please try again!',
            input: event,
        }),
    };

    // Setup Twilio
    // something like var twilio = require('twilio')


    // Send twillio message (if google recaptcha passes)


    // On success
    const success_response = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Your message was sent successfully!',
            input: event,
        }),
    };

    

    callback(null, response);

    
};
