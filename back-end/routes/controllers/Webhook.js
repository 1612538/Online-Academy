const request = require("request");

function callSendAPI(senderId, message) {
  let request_body = {
    recipient: {
      id: senderId,
    },
    message: message,
  };
  request(
    {
      uri: "https://graph.facebook.com/v2.6/me/messages",
      qs: {
        access_token:
          "EAADYReC9qMYBAIwPfPTlsJOf1qdnoDMmWKaOHbZCmV0NRfgCWyglpO9ZC0GDx4zZAwfrgBFHl8ZArwAfzBdJl61QQzSdBeAbh9NtXhXhccNCZBn68aeoHE4tDFH9sZA0L1gMwGBZAZCyVNsA6LaUrAcz6nC2D9OYIt9DxkrZB9rqm9toXZAgwB0yXX",
      },
      method: "POST",
      json: request_body,
    },
    (err, res, body) => {
      if (!err) {
        console.log("message sent!");
      } else {
        console.error("Unable to send message:" + err);
      }
    }
  );
}

function firstTrait(nlp, name) {
  return nlp && nlp.entities && nlp.traits[name] && nlp.traits[name][0];
}

function handleMessage(sender_psid, received_message) {
  let response;

  // Checks if the message contains text
  if (received_message.text === "Start") {
    // Get the URL of the message attachment
    //let attachment_url = received_message.attachments[0].payload.url;
    response = {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [
            {
              title: "Hi, what do you want to know?",
              subtitle: "Tap a button to answer",
              //image_url: attachment_url,
              buttons: [
                {
                  type: "postback",
                  title: "Search courses by keyword",
                  payload: "keyword",
                },
                {
                  type: "postback",
                  title: "Search courses by category",
                  payload: "category",
                },
                {
                  type: "postback",
                  title: "View course's detail",
                  payload: "detail",
                },
              ],
            },
          ],
        },
      },
    };
  } else {
    response = { text: `Type "Start" to chat with bot` };
  }
  callSendAPI(sender_psid, response);
}

function handlePostback(sender_psid, received_postback) {
  let response;

  // Get the payload for the postback
  let payload = received_postback.payload;

  // Set the response based on the postback payload
  if (payload === "keyword") {
    response = {
      text: "Please type your keyword. (Example: Keyword YOUR-KEYWORD)",
    };
  } else if (payload === "category") {
    response = { text: "Please choose one of these categories below" };
  } else if (payload === "detail") {
    response = { text: "Please give me the course ID ( Example: Course 15 )" };
  }
  // Send the message to acknowledge the postback
  callSendAPI(sender_psid, response);
}

module.exports = {
  webhookget: (req, res) => {
    let VERIFY_TOKEN = "quangdeptrai";

    // Parse the query params
    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];

    // Checks if a token and mode is in the query string of the request
    if (mode && token) {
      // Checks the mode and token sent is correct
      if (mode === "subscribe" && token === VERIFY_TOKEN) {
        // Responds with the challenge token from the request
        console.log("WEBHOOK_VERIFIED");
        res.status(200).send(challenge);
      } else {
        // Responds with '403 Forbidden' if verify tokens do not match
        res.sendStatus(403);
      }
    }
  },
  // Đoạn code xử lý khi có người nhắn tin cho bot
  webhookpost: (req, res) => {
    // Parse the request body from the POST
    let body = req.body;

    // Check the webhook event is from a Page subscription
    if (body.object === "page") {
      // Iterate over each entry - there may be multiple if batched
      body.entry.forEach(function (entry) {
        // Gets the body of the webhook event
        let webhook_event = entry.messaging[0];
        console.log(webhook_event);

        // Get the sender PSID
        let sender_psid = webhook_event.sender.id;
        console.log("Sender PSID: " + sender_psid);

        // Check if the event is a message or postback and
        // pass the event to the appropriate handler function
        if (webhook_event.message) {
          handleMessage(sender_psid, webhook_event.message);
        } else if (webhook_event.postback) {
          handlePostback(sender_psid, webhook_event.postback);
        }
      });

      // Return a '200 OK' response to all events
      res.status(200).send("EVENT_RECEIVED");
    } else {
      // Return a '404 Not Found' if event is not from a page subscription
      res.sendStatus(404);
    }
  },
};
