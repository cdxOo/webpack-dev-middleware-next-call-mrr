'use strict';
module.exports = (req, res, next) => {
    res.send(`hey there`);
    next();
};
