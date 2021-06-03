'use strict';

const messageGenerator =
    (text) =>
    (name = 'Argument') =>
        `${text} ${name}`;

const errors = {
    ERR_OBJ_EXPECTED: messageGenerator('should be an object!'),
    ERR_FUNC_EXPECTED: messageGenerator('should be a function!'),
};

module.exports = errors;
