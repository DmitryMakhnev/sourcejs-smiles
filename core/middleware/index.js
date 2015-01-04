var util = require('util');

var options = options;

/*
 * Get pre-final HTML from request, and replace smiles to images
 *
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {function} next - The callback function
 * */
exports.process = function (req, res, next) {
    if (
        !(options && options.ignoreURLs.indexOf(req.path) >= 0)
        && req.specData
        && req.specData.renderedHtml
        ) {
        var html = req.specData.renderedHtml;

        /* some manipulations */
        var smileTpl = "<img src='/node_modules/sourcejs-smiles/assets/i/smiles/%s.png' alt='%s' />";

        html = html.replace(/\:\)/g, util.format(smileTpl, "1f600", ":)"));
        html = html.replace(/\:D/g, util.format(smileTpl, "1f602", ":D"));
        html = html.replace(/\:\|/g, util.format(smileTpl, "1f610", ":|"));
        html = html.replace(/\:\(/g, util.format(smileTpl, "1f615", ":("));
        html = html.replace(/\:0/g, util.format(smileTpl, "1f627", ":0"));

        req.specData.renderedHtml = html;
    }

    next();
};