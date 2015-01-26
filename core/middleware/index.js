var util = require('util');

var options = opts;

/**
 * get object value safely
 * @param {Object|Null|undefined} object
 * @param {String|Number|Array} [key] object proterties keys
 * @returns {*} result || null
 */
function getValueByObjectKeys(object, key){
    var keyTypeof = typeof key,
        i,
        iMax,
        keysList,
        cache,
        result,
        u;
    if (object){
        if ((keyTypeof !== 'string')
            && (keyTypeof !== 'number')){
            keysList = key;
            i = 0;
        } else{
            keysList = arguments;
            i = 1;
        }
        iMax = keysList.length - 1;
        for (; i < iMax; i += 1){
            cache = object[keysList[i]];
            if (cache === u){
                return null;
            } else{
                object = cache;
            }
        }
        result = object[keysList[i]];
        if (result !== u){
            return result;
        }
    }
    return null;
}


/**
 *
 * @param {Object} request Express request object
 * @return {Boolean}
 */
function isNotIgnoreFile (request) {
    var ignoreURLs = getValueByObjectKeys(
            options,
            'assets',
            'pluginsOptions',
            'smiles',
            'ignoreURLs'
        );

    var path = request.path;
    var index = path.indexOf('/index.src');
    if (index !== -1) {
        path = path.substr(0, index + 1);
    }

    return !(ignoreURLs
            && (ignoreURLs.indexOf(path) !== -1));
}

/**
 *
 * @param {Object} request Express request object
 * @return {Boolean}
 */
function isNeedProcessing(request) {
    var specData = request.specData;
    return isNotIgnoreFile(request)
        && specData
        && specData.renderedHtml;
}

/*
 * Get pre-final HTML from request, and replace smiles to images
 *
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {function} next - The callback function
 * */
exports.process = function (req, res, next) {

    if (isNeedProcessing(req)) {
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