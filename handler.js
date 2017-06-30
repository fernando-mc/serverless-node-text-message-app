'use strict';

const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const request = require('request');
const twilioClient = require('twilio')(twilioAccountSid, twilioAuthToken);
const recaptchaSecret = process.env.GOOGLE_RECAPTHCA_SECERT;
const recaptchaUrl = 'https://www.google.com/recaptcha/api/siteverify';

module.exports.validateRecaptchaSendSms = (event, context, callback) => {    
    // node request lib
    const recaptchaData = {
            'secret': GA_SECRET, 
            'response': event['captcha']
          }
    request({
      url: recaptchaUrl,
      method: 'POST',
      json: true,
      body: recaptchaData,
    }, function (error, response, body){
      console.log(response);
      console.log(body);
      const recaptchaStatus = response['success']
    });


    // Process event and get values out
    var google_token = event["google_token"]
    var sms_message = event["sms_message"]
    // confirm that the values pass into this from the form

    // process google_token

    // Get fail if Google recaptcha token fails
    // If err with the google token not being vaild

  // use twilio SDK to send text message
  const sms = {
    to: event.body.to,
    body: event.body.message || '',
    from: twilioPhoneNumber,
  };
  // add image to sms if supplied
  if (event.body.image) {
    sms.mediaUrl = event.body.image;
  }
  twilioClient.messages.create(sms, (error, data) => { // eslint-disable-line
    if (error) {
      const errResponse = {
        headers: {
          'Access-Control-Allow-Origin': '*', // Required for CORS support to work
        },
        statusCode: error.status,
        body: JSON.stringify({
          message: error.message,
          error: error // eslint-disable-line
        }),
      };
      return callback(null, errResponse);
    }
    // text message sent! ✅
    console.log(`message: ${data.body}`); // eslint-disable-line
    console.log(`date_created: ${data.date_created}`); // eslint-disable-line

    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
      },
      body: JSON.stringify({
        message: 'Text message successfully sent!',
        data: data // eslint-disable-line
      }),
    };

    callback(null, response);
  });
};
