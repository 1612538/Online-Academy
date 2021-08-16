const request = require("request");
const db = require("../../utils/db");
const dotenv = require("dotenv");
dotenv.config();

const accesstoken = process.env.accessToken;

function callSendAPI(senderId, message) {
  let request_body = {
    recipient: {
      id: senderId,
    },
    message: message,
  };
  console.log(request_body);
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

async function handleMessage(sender_psid, received_message) {
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
    response = { text: `I can't recognize your command` };
  }
  if (received_message.text) {
    if (received_message.text.includes("Keyword ")) {
      const allwords = received_message.text.split(" ");
      let keyword = "";
      for (let i = 1; i < allwords.length; i++)
        keyword = keyword + allwords[i] + " ";
      console.log(keyword);
      response = await showCourses(sender_psid, keyword, 2);
    }
  } else if (typeof received_message.quick_reply.payload === "string") {
    let payload = received_message.quick_reply.payload;
    if (payload.includes("cat-")) {
      const catid = parseInt(payload.split("-")[1]);
      console.log(catid);
      response = await showCourses(sender_psid, catid, 1);
    }
  }
  callSendAPI(sender_psid, response);
}

function getStarted() {
  return {
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
}

async function getCategories() {
  const sql = `SELECT * FROM small_category`;
  const results = await new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
  return results;
}

async function getCoursesByCat(cat_id) {
  const sql = `SELECT * FROM courses WHERE idsmall_category = ? AND isBlocked=0`;
  const results = await new Promise((resolve, reject) => {
    db.query(sql, [cat_id], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
  return results;
}

async function getCoursesByKeyword(keyword) {
  const sql1 = `ALTER TABLE courses ADD FULLTEXT(name);`;
  let sql2 = `SELECT * FROM courses WHERE MATCH(name) AGAINST ('${keyword}') AND isBlocked=0;`;
  const sql3 = ` ALTER TABLE courses DROP INDEX name;`;
  const sql = sql1 + sql2 + sql3;
  const results = await new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result[1]);
    });
  });
  return results;
}

async function showCategories() {
  const data = await getCategories();
  let array = [];
  for (let item of data) {
    array.push({
      content_type: "text",
      title: item.name,
      payload: `cat-${item.idsmall_category}`,
    });
  }
  return {
    text: "Pick one category",
    quick_replies: array,
  };
}

async function showDetail(sender_psid, cat_id) {}

async function showCourses(sender_psid, value, type) {
  let response = { text: "This list is what I have found" };
  callSendAPI(sender_psid, response);
  let data;
  if (type === 1) data = await getCoursesByCat(value);
  if (type === 2) data = await getCoursesByKeyword(value);
  console.log(data[0].name);
  let array = [];
  for (let item of data) {
    array.push({
      title: item.name,
      image_url: `https://my-academy-webhook.herokuapp.com${item.img}`,
      subtitle: `Price: ${item.price}   Rate: ${item.rate} (${item.ratevotes})`,
      buttons: [
        {
          type: "postback",
          title: "View detail",
          payload: `course-${item.idcourses}`,
        },
      ],
    });
  }
  return {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: array,
      },
    },
  };
}

async function handlePostback(sender_psid, received_postback) {
  let response;

  // Get the payload for the postback
  let payload = received_postback.payload;

  // Set the response based on the postback payload
  if (typeof payload === "string") {
    switch (payload) {
      case "keyword":
        response = {
          text: "Please type your keyword. (Example: Keyword <YOUR-KEYWORD>)",
        };
        break;
      case "category":
        response = await showCategories(sender_psid);
        break;
      case "detail":
        response = {
          text: "Please give me the course ID ( Example: Course 15 )",
        };
        break;
      case "Restart":
      case "GET_STARTED":
        response = getStarted();
        break;
      default:
        response = {
          text: `Opps! I don't know response with payload ${payload}`,
        };
    }
  }
  // if (payload.includes("cat-")) {
  //   const catid = parseInt(payload.split("-")[1]);
  //   console.log(catid);
  //   response = await showCoursesByCat(catid);
  // }
  if (payload.includes("course-")) {
    const courseid = parseInt(payload.split("-"[1]));
  }
  // Send the message to acknowledge the postback
  callSendAPI(sender_psid, response);
}

module.exports = {
  webhookget: (req, res) => {
    let VERIFY_TOKEN = process.env.VERIFY_TOKEN;

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
  webhookpost: async (req, res) => {
    // Parse the request body from the POST
    let body = req.body;
    // Check the webhook event is from a Page subscription
    if (body.object === "page") {
      // Iterate over each entry - there may be multiple if batched
      body.entry.forEach(async function (entry) {
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
          await handlePostback(sender_psid, webhook_event.postback);
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
