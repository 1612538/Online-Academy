const request = require("request");

const accesstoken =
  "EAADYReC9qMYBAF5J0lllLDVO5QlKD5fVgxHOxV6j1dDf6teJt17BQjbUP2mm8vU0GU9QLdYbRBjCPz9ofCThQwKXmAdpHELHDPoP6vJisx8tvUPOj2Rps2b4zaaJKZB1bpKTEXhdA4twn1T3HnOiw1eeifzG2KoKKJLWls7ZCkjAA6YYop";

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
        access_token: accesstoken,
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
              title: "Hi, what do you want to do?",
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
  switch (payload) {
    case "keyword":
      response = {
        text: "Please type your keyword. (Example: Keyword YOUR-KEYWORD)",
      };
      break;
    case "category":
      response = { text: "Please choose one of these categories below" };
      break;
    case "detail":
      response = {
        text: "Please give me the course ID ( Example: Course 15 )",
      };
      break;
    case "Restart":
    case "GET_STARTED":
      response = {
        attachment: {
          type: "template",
          payload: {
            template_type: "button",
            text: "Hi, what do you want to do?",
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
        },
      };
      break;
    default:
      response = {
        text: `Opps! I don't know response with payload ${payload}`,
      };
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
  setUpProfile: async (req, res) => {
    let request_body = {
      get_started: { payload: "GET_STARTED" },
      whitelisted_domains: ["https://my-academy-webhook.herokuapp.com/"],
    };
    await request(
      {
        uri: `https://graph.facebook.com/v11.0/me/messenger_profile?access_token=${accesstoken}`,
        qs: {
          access_token: accesstoken,
        },
        method: "POST",
        json: request_body,
      },
      (err, res, body) => {
        console.log(body);
        if (!err) {
          console.log("Setup user profile succeeds!");
        } else {
          console.error("Unable to setup profile:" + err);
        }
      }
    );
    return res.send("Setup user profile succeeds!");
  },
  setUpPersistent: async (req, res) => {
    let request_body = {
      persistent_menu: [
        {
          locale: "default",
          composer_input_disabled: false,
          call_to_actions: [
            {
              type: "postback",
              title: "Restart conversation",
              payload: "Restart",
            },
          ],
        },
      ],
    };
    await request(
      {
        uri: `https://graph.facebook.com/v11.0/me/messenger_profile?access_token=${accesstoken}`,
        qs: {
          access_token: accesstoken,
        },
        method: "POST",
        json: request_body,
      },
      (err, res, body) => {
        console.log(body);
        if (!err) {
          console.log("Setup persistent menu succeeds!");
        } else {
          console.error("Unable to setup persistent menu:" + err);
        }
      }
    );
    return res.send("Setup user profile succeeds!");
  },
};
