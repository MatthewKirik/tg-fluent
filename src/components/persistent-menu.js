'use strict';

const { getRawMarkup } = require('../utils/inline-keyboard.js');

class PersistentMenuBaseComponent {
    setMenu(title, markup) {
        this.menu = {
            title,
            markup,
            raw_markup: getRawMarkup(markup),
        };
        this.callbacks = new Map();
        for (const row of this.menu.markup) {
            for (const btn of row) {
                this.callbacks.set(btn.data.callback_data, btn.callback);
            }
        }
    }

    async onUpdate(params) {
        const callbackData = params?.update?.callback_query?.data;
        if (callbackData) {
            const callback = this.callbacks.get(callbackData);
            if (callback) callback();
        }
    }

    async open({ chatId, previousComponent, findLastMessage, bot }) {
        let existingMsg = null;
        const isPreviousTheSame =
            previousComponent instanceof PersistentMenuBaseComponent;
        if (isPreviousTheSame) {
            existingMsg = await findLastMessage(chatId, {
                tags: ['persistent-menu'],
            });
        }
        if (existingMsg) {
            await bot.editMessageText(this.menu.title, {
                chat_id: chatId,
                message_id: existingMsg.id,
                reply_markup: this.menu.rowMarkup,
            });
        } else {
            await bot.sendMessage(chatId, this.menu.title, {
                reply_markup: this.menu.rowMarkup,
            });
        }
    }

    async close({ chatId, nextComponent, findLastMessage, bot }) {
        const isNextTheSame =
            nextComponent instanceof PersistentMenuBaseComponent;
        if (!isNextTheSame) {
            const existingMsg = await findLastMessage(chatId, {
                tags: ['persistent-menu'],
            });
            if (existingMsg) {
                bot.deleteMessage(chatId, existingMsg.id);
            }
        }
    }
}

module.exports = PersistentMenuBaseComponent;
