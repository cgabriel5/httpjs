// =============================== Global Library Functions/Methods/Vars
// keep track of requests
var xhrs = {};
// flag indicating whether the reqs have been
// aborted on the beforunload/unload events
var unloaded = false;
/**
 * @description [Aborts the provided http request object.]
 * @param  {Object} _ [The http object to abort.]
 * @return {Object}     [The http object.]
 */
function abort(_) {
    // get the XHR object
    var xhr = _.xhr,
        properties = _.properties;
    // check if already aborted, if so return
    if (properties.aborted) return xhr;
    // only abort if req is has not been resolved or rejected
    if (!properties.resolved && !properties.rejected) {
        // abort the request
        xhr.abort();
        // set aborted property to true
        properties.aborted = true;
        // update the path
        properties.path += ";aborted";
        delete xhrs[properties.id]; // remove xhr from pool
    } // else the req was already aborted
    return xhr; // return the xhr
}
/**
 * @description [Global library abort method. Aborts all requests.]
 * @return {Undefined}     [Nothing is returned.]
 * @concept {http://stackoverflow.com/questions/32497035/abort-ajax-request-in-a-promise}
 */
library.abortAll = function() {
    // loop over xhrs
    for (var id in xhrs) {
        if (xhrs.hasOwnProperty(id)) {
            // abort the xhr
            abort(xhrs[id]);
        }
    }
};
/**
 * @description [Unload event handler. Aborts all requests when the
 *               page is unloaded (refreshed, tab closed).]
 * @param  {Object} event [The event object.]
 * @return {Undefined}     [Nothing is returned.]
 */
function unload(e) {
    // http://stackoverflow.com/questions/4945932/window-onbeforeunload-ajax-request-problem-with-chrome
    // http://stackoverflow.com/questions/6895564/difference-between-onbeforeunload-and-onunload
    // prevent double execution of function
    if (unloaded) return;
    // abort all requests
    library.abortAll();
    // check if xhr pool is empty
    if (!Object.keys(xhrs)
        .length) {
        // set flag to true
        unloaded = true;
        // remove the event listeners
        window.removeEventListener("beforeunload", unload, false);
        window.removeEventListener("unload", unload, false);
    }
}
// set unload listeners
window.addEventListener("beforeunload", unload, false);
window.addEventListener("unload", unload, false);
