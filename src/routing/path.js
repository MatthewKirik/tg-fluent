'use strict';

const trimSlashRegex = new RegExp('^[/]+|[/]+$', 'g');

const parsePath = (path) => {
    const parts = path.split('?');

    let routePart = parts[0];
    routePart = routePart.replace(trimSlashRegex, '');
    const routeUnits = routePart.split('/');

    const params = {};
    if (parts.length > 1) {
        const paramsStr = parts[1];
        const paramsAssignments = paramsStr.split('&');
        for (const paramAssignment of paramsAssignments) {
            const paramKeyValue = paramAssignment.split('=');
            if (paramKeyValue.length === 1) paramKeyValue.push(true);
            const key = paramKeyValue[0];
            const value = paramKeyValue[1];
            params[key] = value;
        }
    }
    return { parts: routeUnits, params };
};

const createPath = (path, params) => {
    let pathWithParams = path + '?';
    let ix = 0;
    for (const key of Object.keys(params)) {
        const value = params[key];
        if (value.toString) {
            if (ix > 0) pathWithParams += '&';
            pathWithParams += key + '=' + value.toString();
            ix++;
        }
    }
    return pathWithParams;
};

module.exports = {
    parsePath,
    createPath,
};
