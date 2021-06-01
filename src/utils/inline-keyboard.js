const crypto = require('crypto');

const hash = crypto.createHash('md5');

const button = (text, callback, callbackData = null) => {
    const callback_data = callbackData ?? callback.name;
    if (callback_data === '' || callback_data === 'anonymous') {
        callback_data = callback.toString();
    }
    callback_data = hash.update(callback_data).digest('base64');
    return {
        callback,
        data: { text, callback_data },
    };
};
const url = (text, url) => ({
    data: { text, url },
});
const switchInlineQuery = (text, query) => ({
    data: {
        text,
        switch_inline_query: query,
    },
});
const switchInlineQueryCurrentChat = (text, query) => ({
    data: {
        text,
        switch_inline_query_current_chat: query,
    },
});

const row = (...buttons) => [...buttons];

const inlineKeyboard = (...rows) => [...rows];

const getRawMarkup = (markup) =>
    markup.map((row) => row.map((btn) => btn.data));

module.exports = {
    button,
    url,
    switchInlineQuery,
    switchInlineQueryCurrentChat,
    row,
    inlineKeyboard,
    getRawMarkup,
};
