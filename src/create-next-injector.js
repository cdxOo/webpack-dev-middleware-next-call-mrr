'use strict';
module.exports = (middleware, fn) => (req, res, next) => {
    var injection = (...args) => {
        fn();
        return next(...args);
    };
    return middleware(req, res, injection);
};
