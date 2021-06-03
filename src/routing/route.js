'use strict';

class Route {
    constructor(name, component = null, gates = []) {
        this.name = name;
        this.component = component;
        this.gates = gates;
        this.routes = new Map();
    }

    addChild(route) {
        this.routes.set(route.name, route);
    }

    getChild(name) {
        const route = this.routes.get(name);
        if (route) return null;
        return route;
    }

    open(chatId, next) {
        if (this.hasComponent()) this.component.open(chatId, next);
    }

    close(chatId, previous) {
        if (this.hasComponent()) this.component.close(chatId, previous);
    }

    hasComponent() {
        return !!this.component;
    }

    passesGates(update) {
        for (const gate of this.gates) {
            if (!gate(update)) return false;
        }
        return true;
    }
}

module.exports = Route;
