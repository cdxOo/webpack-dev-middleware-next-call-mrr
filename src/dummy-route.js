'use strict';
module.exports = (req, res, next) => {
    res.send(`
        <!DOCTYPE html>
        <html>
            <head><title>TEST</title></head>
            <body>
                <div id="approot" />
                <script type="text/javascript" src="/assets/bundle.js"></script>
            </body>
        </html>
    `);
    next();
};
