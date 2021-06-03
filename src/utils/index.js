'use strict';

const fieldsWithChatId = {
    message: (update) => update.message.chat.id,
    edited_message: (update) => update.edited_message.chat.id,
    channel_post: (update) => update.channel_post.chat.id,
    edited_channel_post: (update) => update.edited_channel_post.chat.id,
    callback_query: (update) => update.callback_query.message.chat.id,
    my_chat_member: (update) => update.my_chat_member.chat.id,
    chat_member: (update) => update.chat_member.chat.id,
};

const getUpdateChatId = (update) => {
    for (const key in fieldsWithChatId) {
        if (Object.hasOwnProperty.call(fieldsWithChatId, key)) {
            if (update[key]) {
                const projection = fieldsWithChatId[key];
                return projection(update);
            }
        }
    }
    return undefined;
};

module.exports = {
    getUpdateChatId,
};
