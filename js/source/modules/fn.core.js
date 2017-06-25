// =============================== Core Library Functions
/**
 * @description [Normalizes the XHR options. In essence, function used the provided
 *               options and resorts to using the default options for user omitted
 *               options.]
 * @param  {Object} _ [The http object.]
 * @return {Object}   [The normalized options.]
 */
function normalize_options(_) {
    // get the XHR object
    var options = _.options,
        properties = _.properties;
    // lock the XHR object...properties can no longer be added
    properties.locked = true;
    // new object to contain options
    var normalized = {
        // set the defaults
        "url": (options.url || document.URL), // default: current URL location
        "method": (options.method || "GET")
            .toUpperCase(), // default: GET
        "data": (options.data || null), // default: null
        // are files being uploaded? If true the content type is left out and left up to browser.
        "fileUpload": (options.fileUpload || false),
        "async": ((!options.async) ? true : options.async), // default: true
        "processData": (options.processData === false ? false : true),
        "postJSON": (options.postJSON || false),
        "parseJSON": (options.parseJSON || false),
        "id": (options.id || properties.id),
        "withCredentials": (options.withCredentials || false),
        // {https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType}
        "responseType": (options.responseType || ""),
        "timeout": (options.timeout || 10000)
    };
    // add the id to the objects properties
    properties.id = normalized.id;
    // set the cache flag
    normalized.cache = ((!options.cache) ? false : options.cache); // default: false
    // work the event handlers
    var events = (options.events || {}),
        noop = function() { /* noop */ };
    // normalize the events object
    events = {
        "abort": (events.abort || noop),
        "progress": (events.progress || noop),
        "timeout": (events.timeout || noop),
        "readystatechange": (events.readystatechange || noop),
        "loadstart": (events.loadstart || noop),
        "loadend": (events.loadend || noop),
        "load": (events.load || noop),
        "error": (events.error || noop)
    };
    // work the headers
    var headers = (options.headers || []),
        default_content_type = "application/x-www-form-urlencoded;charset=UTF-8";
    // normalize the content-type
    // Rules...
    // 1) If it's a file upload leave content-type empty unless user provides it via the headers
    // 2) Default to application/x-www-form-urlencoded;charset=UTF-8 for non file uploads
    //
    // if files are being uploaded let the browser set
    // the content type and form boundary set the headers
    // so remove the header if set
    if (!normalized.fileUpload) { // add the default content type if nothing was provided
        // check if content type is provided, if not its added
        for (var i = 0, l = headers.length; i < l; i++) {
            // check if the content type has been added
            if (headers[i][0].toLowerCase() === "content-type") break;
            // else if we get to the last one we add the content-type
            if (i === (l - 1)) {
                // add if not a file upload
                headers.push(["Content-Type", default_content_type]);
            }
        }
        // if no headers add the basic content-type header
        if (!headers.length) {
            headers.push(["Content-Type", default_content_type]);
        }
    }
    // add the events, headers to the normalized object
    normalized.events = events;
    normalized.headers = headers;
    // set the options
    _.options = normalized;
    // return the options
    return normalized;
}
/**
 * @description [Removed all events from XHR object.]
 * @param  {Object} _ [The http object.]
 * @return {Undefined}   [Nothing is returned.]
 */
function remove_events(_) {
    // get the XHR object
    var xhr = _.xhr,
        callbacks = _.properties.callbacks;
    // loop over callbacks and remove them
    for (var callback in callbacks) {
        if (callbacks.hasOwnProperty(callback)) {
            xhr.removeEventListener(callback, callbacks[callback], false);
        }
    }
}
