const messages = require('./messages');

class ChatsManager {
    /**
     * @class ChatsManager
     * @constructor
     * @param {Object} store Store that implements interface for saving persistent data
     * @param {Function} [mapper] Mapping function to select needed data from Telegram message entity when saving.
     * Use tg-fluent's "createMessageMapper" function to create mapper.
     */
    constructor(store, mapper) {
        if (typeof store === 'object') this.store = store;
        else
            throw Error(
                'Store should be an object that implements interface for saving persistent data!'
            );

        if (typeof mapper === 'undefined')
            this.mapMessage = messages.createMessageMapper();
        else if (typeof mapper === 'function') this.mapMessage = mapper;
        else
            throw Error(
                'Mapper should be a function! Consider using tg-fluent "createMessageMapper" function.'
            );
    }

    /**
     * Saves message to the store.
     * @param {Message} message Telegram message entity. See: (@link https://core.telegram.org/bots/api#message).
     * @param {String} role Message sender's role (i.e. "admin", "user", "bot").
     * @param {String[]} tags Custom tags that can be used to your notice. Can be retreived and updated.
     * @param {Object} additionalData Any kind of additional data packed to object. Can be retreived and updated.
     * @return {Promise}
     */
    async saveMessage(message, role, tags, additionalData) {
        const data = this.mapMessage(message, role, tags, additionalData);
        return this.store.save(data);
    }

    /**
     * Gets message with the specified id.
     * @param {Number} chatId Telegram chat ID to look in. See: (@link https://core.telegram.org/bots/api#chat).
     * @param {Number} messageId Telegram message ID to find. See: (@link https://core.telegram.org/bots/api#message).
     * @return {Promise<import("./messages").TelegramMessage>} Promise of found message. Rejects if not found.
     */
    async getMessageById(chatId, messageId) {
        return this.store.getById(chatId, messageId);
    }

    /**
     * Gets last message in the chat that matches specified filter.
     * @param {Number} chatId Telegram chat ID. See: (@link https://core.telegram.org/bots/api#chat).
     * @param {import("./messages").TelegramMessagesFilter} [filter] Object representing a messages filter.
     * @return {Promise<import("./messages").TelegramMessage>} Promise of found message. Null if not found.
     */
    async findLastMessage(chatId, filter) {
        return this.store.findLast(chatId, filter, 1);
    }

    /**
     * Gets last messages in the chat that match specified filter.
     * @param {Number} chatId Telegram chat ID. See: (@link https://core.telegram.org/bots/api#chat).
     * @param {import("./messages").TelegramMessagesFilter} [filter] Object representing a messages filter.
     * @param {Number} limit Maximal amount of messages to return.
     * @return {Promise<Array.<import("./messages").TelegramMessage>>} Promise of found messages.
     * Resolves with empty array if no messages were found.
     */
    async findLastMessages(chatId, filter, limit) {
        return this.store.findLast(chatId, filter, limit);
    }

    /**
     * Updates message with specified id.
     * @param {Number} chatId Telegram chat ID to look in. See: (@link https://core.telegram.org/bots/api#chat).
     * @param {Number} messageId Telegram message ID to edit. See: (@link https://core.telegram.org/bots/api#message).
     * @param {Object} new_data Object containing new message data.
     * @param {String[]} new_data.tags New tags of the message.
     * @param {Object} new_data.data New additional data of the message.
     * @return {Promise} Promise that rejects if message was not found.
     */
    async updateMessage(chatId, messageId, { tags, data }) {
        return this.store.update(chatId, messageId, tags, data);
    }

    /**
     * Deletes message with specified id.
     * @param {Number} chatId Telegram chat ID to look in. See: (@link https://core.telegram.org/bots/api#chat).
     * @param {Number} messageId Telegram message ID to find. See: (@link https://core.telegram.org/bots/api#message).
     * @return {Promise} Promise that rejects if message was not found.
     */
    async deleteMessageById(chatId, messageId) {
        return this.store.deleteById(chatId, messageId);
    }

    /**
     * Deletes last message that matches specified filter.
     * @param {Number} chatId Telegram chat ID. See: (@link https://core.telegram.org/bots/api#chat).
     * @param {import("./messages").TelegramMessagesFilter} [filter] Object representing a messages filter.
     * @return {Promise<Number>} Promise of deleted message's id. Undefined if no message was found.
     */
    async deleteLastMessage(chatId, filter) {
        return this.store.deleteLast(chatId, filter, 1);
    }

    /**
     * Deletes last messages that match specified filter.
     * @param {Number} chatId Telegram chat ID. See: (@link https://core.telegram.org/bots/api#chat).
     * @param {import("./messages").TelegramMessagesFilter} [filter] Object representing a messages filter.
     * @param {Number} limit Maximal amount of messages to delete.
     * @return {Promise<Number[]>} Promise of array of deleted messages.
     * Resolves with empty array if no messages were found.
     */
    async deleteLastMessages(chatId, filter, limit) {
        return this.store.deleteLast(chatId, filter, limit);
    }

    /**
     * Deletes messages that match specified filter.
     * @param {Number} chatId Telegram chat ID. See: (@link https://core.telegram.org/bots/api#chat).
     * @param {import("./messages").TelegramMessagesFilter} [filter] Object representing a messages filter.
     * @return {Promise<Number[]>} Promise of array of deleted messages.
     * Resolves with empty array if no messages were found.
     */
    async deleteLastMessages(chatId, filter) {
        return this.store.deleteLast(chatId, filter, limit);
    }
}

module.exports = ChatsManager;
