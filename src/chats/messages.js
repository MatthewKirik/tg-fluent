'use strict';

/**
 * @typedef {Object} TelegramMessagesFilter
 *
 * @property {Number} [unix_date] Date the message was sent in Unix Time format.
 * @property {String} [sender_role] Message sender's role (i.e. "admin", "user", "bot").
 * @property {Number} [sender_id] Message sender's id.
 * @property {String[]} [tags] Tags attached to saved message.
 * Interpretation on this filter parameter is defined by the "tags_mode" filter parameter.
 * @property {'all'|'any'|except} [mode] Defines the way filter parameters will be interpreted.
 * @property {'all'|'any'|except} [tags_mode] Defines the way filter tags will be interpreted.
 * Equals to the "mode" filter parameter if not set explicitly.
 */

/**
 * @typedef {Object} TelegramMessage
 *
 * @see https://core.telegram.org/bots/api#message
 */

const createMessageMapper =
    (...tgMessagefields) =>
    (message, senderRole, tags, additionalData) => {
        const data = {
            id: message.id,
            chat_id: message.chat.id,
            unix_date: message.date,
            sender_role: senderRole,
            sender_id: message.from?.id,
            tags,
            data: additionalData,
        };
        for (const field of tgMessagefields) {
            data[field] = message[field];
        }
        return data;
    };

module.exports = {
    createMessageMapper,
};
