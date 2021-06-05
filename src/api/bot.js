const https = require("https");
class Bot {
  constructor(token) {
    this.token = token;
  }
  get token() {
    return this.token;
  }
  req(meth, params = {}) {
    params.accept = "app;ication/json";
    const options = {
      host: "api.telegram.org",
      path: `/bot${this.token}/${meth}`,
      method: "POST",
      headers: params,
    };
    const req = https.request(options, (res) => {
      const jsonres = JSON.parse(res);
      if (!jsonres.ok)
        console.log(
          "Telegram returned: " +
            jsonres.error_code +
            "\n" +
            jsonres.description
        );
      else return jsonres;
    });
    req.on("error", (err) => {
      console.log(err);
      return;
    });
  }
  send(type, id, value, additional) {
    const params = {
      id: id,
      [type.toLowerCase()]: value,
    };
    if (additional) for ([key, value] of additional) params.key = value;
    const result = this.req(`send${type}`, params);
    if (result) return "Succesfully sent";
    else return "Unexpected error";
  }
  sendMessage(id, value, additional = null) {
    return this.send("Message", id, value, additional);
  }
  edit(type, chat_id, message_id, value, additional = null) {
    const params = {
      chat_id: chat_id,
      message_id: message_id,
      [type.toLowerCase()]: value,
    };
    if (additional) for ([key, value] of additional) params.key = value;
    const result = this.req(`editMessage${type}`, params);
    if (result) return "Succesfully edited";
    else return "Unexpected error";
  }
  delete(chat_id, message_id) {
    const params = {
      chat_id: chat_id,
      message_id: message_id,
    };
    const result = this.req(`deleteMessage`, params);
    if (result) return "Succesfully deleted";
    else return "Unexpected error";
  }
}

export default Bot;
