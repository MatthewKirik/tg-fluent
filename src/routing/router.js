'use strict';

const Route = require('./route.js');
const utils = require('../utils');
const { parsePath } = require('./path.js');

class TelegramRouter {
    constructor(bot, chatManager) {
        this.rootRoute = new Route('root');
        this.bot = bot;
        this.bot.on('update', this.onUpdate);
        this.chatManager = chatManager;
    }

    async navigate(chatId, nextPath) {
        const previousRoute = await this._getOpenedRoute(chatId);
        const nextRoute = this._getRoute(nextPath);
        if (!nextRoute || !nextRoute.hasComponent()) return null;
        if (previousRoute && previousRoute.component) {
            previousRoute.close(chatId, nextRoute.component);
        }
        nextRoute.open(chatId, previousRoute.component);
    }

    async onUpdate(update) {
        const chatId = utils.getUpdateChatId(update);
        if (chatId) {
            const route = await this._getOpenedRoute(chatId);
            if (!route || !route.component) return;
            if (route.passesGates(update)) {
                route.component.onUpdate(chatId, update);
            }
        }
    }

    register(path, component = null, gates = []) {
        const { parts } = parsePath(path);
        const totalGates = new Set(gates);

        let route = this.rootRoute;
        for (let i = 0; i < parts.length; i++) {
            route.gates.forEach((g) => totalGates.add(g));
            route = route.getChild(parts[i]);
            if (route === null) {
                for (let j = i; j < parts.length; j++) {
                    const newRoute = new Route(parts[i], null, totalGates);
                    route.addChild(newRoute);
                    route = newRoute;
                }
                break;
            }
        }
        route.component = component;
        route.gates = gates;
    }

    async _getOpenedRoute(chatId) {
        const openedPath = await this.chatManager.readHistory(chatId, 1);
        const route = this._getRoute(openedPath);
        return route;
    }

    _getRoute(path) {
        const { parts } = parsePath(path);
        let route = this.rootRoute;
        for (const part of parts) {
            route = route.getChild(part);
            if (route === null) return null;
        }
        return route;
    }
}

module.exports = TelegramRouter;
