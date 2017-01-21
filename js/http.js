(function() {

    "use strict";

    var library = (function() {

        // =============================== Helper Functions

        /**
         * @description [Returns the data type of the object passed or compares against the data type
         *               if provided.]
         * @param  {Any} object         [The object to check.]
         * @param  {String} comparative [The data type to compare against. This parameter is optional.]
         * @return {String|Boolean}     [The data type of the object as a string. Or a boolean
         *                               indicating the state of the comparison.]
         */
        function dtype(object, comparative) {
            // will always return something like "[object {type}]"
            var check = Object.prototype.toString.call(object)
                .replace(/(\[object |\])/g, "")
                .toLowerCase();
            return (!comparative) ? check : (check === comparative.toLowerCase());
        }
        /**
         * @description [A class wrapper. Creates a class based on provided object containing class constructor__ and methods__.
         *               If class needs to extend another, provide it under the extend__ property.]
         * @param  {Object} cobject [The class object containing three properties: constructor__, methods__, and extend__.
         *                           .constructor__ {Function}       [The class constructor]
         *                           .methods__     {Object}         [Object containing class methods.]
         *                           .extend__      {Boolean|Object} [Set to false if does not need to extend. Otherwise, provide the
         *                                                            class to extend.]
         *                           ]
         * @return {Function}         [Returns class constructor.]
         */
        function class__(cobject) {

            // cache class data
            var constructor = cobject.constructor__,
                methods = cobject.methods__,
                parent = cobject.extend__;

            // extend if parent class provided
            if (parent) {
                constructor.prototype = Object.create(parent.prototype);
                constructor.prototype.constructor = constructor;
            }

            // cache prototype
            var prototype = constructor.prototype;

            // add class methods to prototype
            for (var method in methods) {
                if (methods.hasOwnProperty(method)) {
                    prototype[method] = methods[method];
                }
            }

            return constructor;

        }

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
                "method": (options.method || "GET").toUpperCase(), // default: GET
                "data": (options.data || null), // default: null
                // are files being uploaded? If true the content type is left out and left up to browser.
                "fileUpload": (options.fileUpload || false),
                "async": ((!options.async) ? true : options.async), // default: true
                "processData": (options.processData || true),
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
                default_content_type = (normalized.parseJSON ? "application/json" :
                    (!normalized.fileUpload ? "application/x-www-form-urlencoded;charset=UTF-8" : null));
            // check if content type is provided, if not its added
            for (var i = 0, l = headers.length; i < l; i++) {
                // check if the content type has been added
                if (headers[i][0] === "Content-Type") break;
                // else if we get to the last one we add the content-type
                if (i === (l - 1)) {
                    // add if not a file upload
                    headers.push(["Content-Type", default_content_type]);
                }
            }
            // if no headers add the basic content-type header
            // if files are being uploaded let the browser set
            // the content type and form boundary set the headers
            if (!headers.length) {
                headers.push(["Content-Type", default_content_type]);
            }

            console.log(">>>>", normalized.url);
            headers.forEach(function(header, i) {
                console.log(i, header[0], header[1]);
            });

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

        // =============================== Library Class

        var Library = class__({

            /**
             * @description [The library class constructor.]
             * @param  {String} url [The request url.]
             * @return {Undefined}     [Nothing is returned.]
             */
            "constructor__": function(url) {
                // https://toddmotto.com/writing-a-standalone-ajax-xhr-javascript-micro-library/
                // http://blog.garstasio.com/you-dont-need-jquery/ajax/#getting
                // http://www.w3schools.com/jquery/ajax_ajax.asp
                // http://stackoverflow.com/questions/14322984/differences-between-contenttype-and-datatype-in-jquery-ajax-function

                // if user does not invoke library with new keyword we use it for them by
                // returning a new instance of the library with the new keyword.
                if (!(this instanceof Library)) return new Library();

                // create the new XHR object
                this.xhr = new XMLHttpRequest();
                // set responseJSON property
                this.xhr.responseJSON = null;
                // make a users options object
                this.options = {};
                // set the url if provided
                if (url) this.options.url = url;
                // XHR library properties
                this.properties = {
                    // generate random id: {http://stackoverflow.com/a/38622545}
                    "id": Math.random().toString(36).substr(2, 22),
                    "callbacks": {},
                    "aborted": false,
                    "locked": false,
                    "opened": false,
                    "resolved": undefined,
                    "rejected": undefined,
                    "path": "created"
                };

                // return self to chain methods
                return this;

            },

            // class methods
            "methods__": {
                /**
                 * @description [Adds URL to options object.]
                 * @param  {String} url [The URL.]
                 * @return {Undefined}     [Nothing is returned.]
                 */
                "url": function(url) {

                    // cache the object
                    var _ = this;

                    // option cannot be set if object has been opened
                    if (_.properties.locked) return _;

                    // set the option
                    _.options.url = url;

                    // return self to chain methods
                    return _;

                },
                /**
                 * @description [Adds method to options object.]
                 * @param  {String} method [The request method.]
                 * @return {Undefined}     [Nothing is returned.]
                 */
                "method": function(method) {

                    // cache the object
                    var _ = this;

                    // option cannot be set if object has been opened
                    if (_.properties.locked) return _;

                    // set the option
                    _.options.method = method;

                    // return self to chain methods
                    return _;

                },
                /**
                 * @description [Adds data to options object.]
                 * @param  {Any} data [The data to send request with.]
                 * @return {Undefined}     [Nothing is returned.]
                 */
                "data": function(data) {

                    // cache the object
                    var _ = this;

                    // option cannot be set if object has been opened
                    if (_.properties.locked) return _;

                    // set the option
                    _.options.data = data;

                    // return self to chain methods
                    return _;

                },
                /**
                 * @description [Adds fileUpload flag to options object.
                 *               Flag indicates whether files are being uploaded.]
                 * @param  {Boolean} flag [Bool indicating whether to set flag.]
                 * @return {Undefined}     [Nothing is returned.]
                 */
                "fileUpload": function(flag) {

                    // return self to chain methods
                    return _;

                    // cache the object
                    var _ = this;

                    // option cannot be set if object has been opened
                    if (_.properties.locked) return _;

                    // set the option
                    _.options.fileUpload = flag;

                    // return self to chain methods
                    return _;

                },
                /**
                 * @description [Adds postJSON flag to options object.
                 *               Flag indicates whether data should be stringified.]
                 * @param  {Boolean} flag [Bool indicating whether to set flag.]
                 * @return {Undefined}     [Nothing is returned.]
                 */
                "postJSON": function(flag) {

                    // cache the object
                    var _ = this;

                    // option cannot be set if object has been opened
                    if (_.properties.locked) return _;

                    // set the option
                    _.options.postJSON = flag;

                    // return self to chain methods
                    return _;

                },
                /**
                 * @description [Adds parseJSON flag to options object.
                 *               Flag indicates whether req response should be JSON parsed.]
                 * @param  {Boolean} flag [Bool indicating whether to set flag.]
                 * @return {Undefined}     [Nothing is returned.]
                 */
                "parseJSON": function(flag) {

                    // cache the object
                    var _ = this;

                    // option cannot be set if object has been opened
                    if (_.properties.locked) return _;

                    // set the option
                    _.options.parseJSON = flag;

                    // return self to chain methods
                    return _;

                },
                /**
                 * @description [Adds cache flag to options object.
                 *               Flag indicates whether request needs to be cached.]
                 * @param  {Boolean} flag [Bool indicating whether to set flag.]
                 * @return {Undefined}     [Nothing is returned.]
                 */
                "cache": function(flag) {

                    // cache the object
                    var _ = this;

                    // option cannot be set if object has been opened
                    if (_.properties.locked) return _;

                    // set the option
                    _.options.cache = flag;

                    // return self to chain methods
                    return _;

                },
                /**
                 * @description [Adds async flag to options object.
                 *               Flag indicates whether request is async.]
                 * @param  {Boolean} flag [Bool indicating whether to set flag.]
                 * @return {Undefined}     [Nothing is returned.]
                 */
                "async": function(flag) {

                    // cache the object
                    var _ = this;

                    // option cannot be set if object has been opened
                    if (_.properties.locked) return _;

                    // set the option
                    _.options.async = flag;

                    // return self to chain methods
                    return _;

                },
                /**
                 * @description [Adds headers object to options object.]
                 * @param  {Object} key  [The header name.]
                 * @param  {Object} name [The header value.]
                 * @return {Undefined}     [Nothing is returned.]
                 */
                "header": function(key, value) {

                    // cache the object
                    var _ = this;

                    // option cannot be set if object has been opened
                    if (_.properties.locked) return _;

                    // add the option
                    if (!_.options.headers) _.options.headers = [];

                    // append provided header to the headers array
                    _.options.headers.push([key, value]);

                    // return self to chain methods
                    return _;

                },
                /**
                 * @description [Adds processData flag to options object.
                 *               Flag indicates whether data needs to be processed.]
                 * @param  {Boolean} flag [Bool indicating whether to set flag.]
                 * @return {Undefined}     [Nothing is returned.]
                 */
                "processData": function(flag) {

                    // cache the object
                    var _ = this;

                    // option cannot be set if object has been opened
                    if (_.properties.locked) return _;

                    // set the option
                    _.options.processData = flag;

                    // return self to chain methods
                    return _;

                },
                /**
                 * @description [Adds id to options object.]
                 * @param  {String} id [The id. Needs to be unique.]
                 * @return {Undefined}     [Nothing is returned.]
                 */
                "id": function(id) {

                    // cache the object
                    var _ = this;

                    // option cannot be set if object has been opened
                    if (_.properties.locked) return _;

                    // set the option
                    _.options.id = id;

                    // return self to chain methods
                    return _;

                },
                /**
                 * @description [Adds withCredentials flag to options object.
                 *               Flag indicates whether prop needs to be set for request.]
                 * @param  {Boolean} flag [Bool indicating whether to set flag.]
                 * @return {Undefined}     [Nothing is returned.]
                 */
                "withCredentials": function(flag) {

                    // cache the object
                    var _ = this;

                    // option cannot be set if object has been opened
                    if (_.properties.locked) return _;

                    // set the option
                    _.options.withCredentials = flag;

                    // return self to chain methods
                    return _;

                },
                /**
                 * @description [Adds the request response type.]
                 * @param  {Number} type [The response type..]
                 * @return {Undefined}     [Nothing is returned.]
                 */
                "responseType": function(type) {

                    // cache the object
                    var _ = this;

                    // option cannot be set if object has been opened
                    if (_.properties.locked) return _;

                    // set the option
                    _.options.responseType = type;

                    // return self to chain methods
                    return _;

                },
                /**
                 * @description [Adds timeout time to options object.]
                 * @param  {Number} time [The time to timeout request after.]
                 * @return {Undefined}     [Nothing is returned.]
                 */
                "timeout": function(time) {

                    // cache the object
                    var _ = this;

                    // option cannot be set if object has been opened
                    if (_.properties.locked) return _;

                    // set the option
                    _.options.timeout = time;

                    // return self to chain methods
                    return _;

                },
                /**
                 * @description [Adds events object to options object.]
                 * @param  {Object} events [The events object.]
                 * @return {Undefined}     [Nothing is returned.]
                 */
                "events": function(events) {

                    // cache the object
                    var _ = this;

                    // option cannot be set if object has been opened
                    if (_.properties.locked) return _;

                    // set the option
                    _.options.events = events;

                    // return self to chain methods
                    return _;

                },
                /**
                 * @description [Works the XHR request by normalizing options,
                 *               applies event listeners, sets headers, processes
                 *               data, and sends the request.]
                 * @return {Promise}     [XHR request is wrapped in a promise.]
                 */
                "run": function() {

                    // cache the object
                    var _ = this;

                    // get the XHR object
                    var xhr = _.xhr,
                        // normalize the options
                        options = normalize_options(_),
                        properties = _.properties,
                        callbacks = properties.callbacks;

                    // option cannot be set if object has been opened
                    if (properties.opened) return _;

                    // get the options
                    var url = options.url, // default: current URL location
                        method = options.method, // default: GET
                        data = options.data, // default: null
                        // are files being uploaded? If true the content type is left out and left up to browser.
                        // files = options.fileUpload,
                        cache = options.cache, // default: true for GET requests
                        async = options.async, // default: true
                        // default: application/x-www-form-urlencoded;charset=UTF-8, empty for file uploads
                        // content_type = options.contentType,
                        // default: true for strings and objects containing key:value pairs
                        process_data = options.processData,
                        // {http://stackoverflow.com/questions/17785592/difference-between-json-stringify-and-json-parse}
                        post_json = options.postJSON,
                        parse_json = options.parseJSON,
                        // {http://stackoverflow.com/a/38622545}
                        id = options.id, // default: <random_alphanum_string> (used to abort request)
                        credentials = options.credentials, // default: false
                        response_type = options.responseType, // default: ""
                        timeout = options.timeout, // default: 10 seconds
                        headers = options.headers,
                        events = options.events, // event handlers
                        abort = events.abort,
                        progress = events.progress,
                        timeoutfn = events.timeout,
                        readystatechange = events.readystatechange,
                        loadstart = events.loadstart,
                        loadend = events.loadend;
                    // not used as a promise resolved/rejected functions are used
                    // load = events.load,
                    // error = events.error;

                    // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState
                    // 0   UNSENT  Client has been created. open() not called yet.
                    // 1   OPENED  open() has been called.
                    // 2   HEADERS_RECEIVED    send() has been called, and headers and status are available.
                    // 3   LOADING Downloading; responseText holds partial data.
                    // 4   DONE    The operation is complete.

                    // xhr.readyState === 0 here
                    // set the xhr path to unsent (init xhr)
                    properties.path += ";unsent"; // http://stackoverflow.com/questions/21485545/is-there-a-way-to-tell-if-an-es6-promise-is-fulfilled-rejected-resolved

                    // -------------------------

                    // add xhr to pool
                    xhrs[id] = _;

                    // -------------------------

                    // wrap XHR in a Promise
                    return new Promise(function(resolve, reject) {

                        // store callbacks in objects properties
                        // this is done within the promise as the
                        // resolve/reject functions are needed for
                        // the load/error events
                        callbacks.loadstart = loadstart;
                        callbacks.loadend = loadend;
                        callbacks.load = function(e) { // once finished resolve promise
                            // set properties
                            properties.path += ";done;resolved";
                            properties.resolved = true;
                            properties.rejected = false;

                            // remove xhr callbacks
                            remove_events(_);

                            // check if user wants their response JSON parsed
                            if (parse_json) {
                                try {
                                    // {http://stackoverflow.com/questions/4467044/proper-way-to-catch-exception-from-javascript-method-json-parse}
                                    // parse the JSON and set result to XHR
                                    xhr.responseJSON = JSON.parse(xhr.responseText);
                                } catch (error) {
                                    console.warn(error);
                                }
                            }

                            resolve(xhr);
                        };
                        callbacks.error = function(e) { // reject on network errors
                            // set properties
                            properties.path += ";done;rejected";
                            properties.resolved = false;
                            properties.rejected = true;

                            // remove xhr callbacks
                            remove_events(_);

                            // check internet connection here {https://davidwalsh.name/detecting-online}
                            // http://www.html5rocks.com/en/tutorials/es6/promises/#toc-error-handling
                            reject(xhr);
                        };
                        callbacks.progress = function(e) {
                            if (e.lengthComputable) {
                                var percent = (e.loaded / e.total) * 100;
                                progress.call(xhr, e, percent);
                            } else {
                                // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest
                                // Unable to compute progress information since the total size is unknown
                            }
                        };
                        callbacks.abort = function(e) {
                            properties.path += ";aborted-callback";

                            // remove xhr callbacks
                            remove_events(_);

                            // run the callback
                            abort.call(xhr, e);
                        };
                        callbacks.timeout = function(e) { // reject on timeout
                            properties.path += ";timedout";
                            // reject the promise
                            // check internet connection here {https://davidwalsh.name/detecting-online}
                            // reject(xhr); // http://www.html5rocks.com/en/tutorials/es6/promises/#toc-error-handling

                            // remove xhr callbacks
                            remove_events(_);

                            // run timeout callback if provided
                            if (timeoutfn) timeoutfn.call(xhr, e);

                            reject(new TypeError("Request timedout."));

                        };
                        callbacks.readystatechange = function(e) {
                            var states = {
                                "1": ";opened",
                                "2": ";headers-received",
                                "3": ";loading",
                                "4": ";finished"
                            };
                            // append to the path according to the XHR ready state
                            properties.path += states[xhr.readyState];
                            // call handler if provided
                            if (readystatechange) readystatechange.call(xhr, e);
                        };

                        // set the request timeout
                        xhr.timeout = timeout;

                        // add timestamp to prevent caching
                        // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#Bypassing_the_cache
                        if (!cache) url += ((url.indexOf('?') !== -1) ? '&_=' : '?_=') + ((new Date()).getTime());

                        // initialize request
                        // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/open
                        xhr.open(method, url, async);

                        // set request as opened
                        properties.opened = true;

                        // http://stackoverflow.com/questions/18701282/what-is-content-type-and-datatype-in-an-ajax-request
                        // http://stackoverflow.com/questions/19694503/ajax-setrequestheader-content-type-application-x-www-form-urlencoded-and-ch
                        // http://stackoverflow.com/questions/16819502/application-x-www-form-urlencoded-and-charset-utf-8
                        // http://stackoverflow.com/questions/2053242/how-to-post-a-html-form-using-javascript-that-has-both-application-x-www-form-u
                        // http://stackoverflow.com/questions/12348216/uploading-a-file-with-xmlhttprequest-missing-boundary-in-multipart-form-data
                        // http://stackoverflow.com/questions/2436716/is-application-x-www-form-urlencoded-default-for-html-form
                        // https://www.w3.org/TR/html401/interact/forms.html#h-17.13.4
                        // https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects -> FormData tutorial
                        // for files use: multipart/form-data;charset=UTF-8, anything else: application/x-www-form-urlencoded;charset=UTF-8

                        // headers list {https://en.wikipedia.org/wiki/List_of_HTTP_header_fields}
                        for (var i = 0, l = headers.length; i < l; i++) {
                            xhr.setRequestHeader(headers[i][0], headers[i][1]);
                        }

                        // if CORS is needed...
                        // https://www.html5rocks.com/en/tutorials/cors/
                        // https://developers.google.com/web/updates/2015/03/introduction-to-fetch#sending_credentials_with_a_fetch_request
                        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS#Requests_with_credentials
                        // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials
                        // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
                        xhr.withCredentials = credentials;

                        // {https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType}
                        // set the response type
                        xhr.responseType = response_type;

                        // fetch resources
                        // https://davidwalsh.name/fetch
                        // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
                        // https://developer.mozilla.org/en-US/docs/Web/API/Response
                        // https://developer.mozilla.org/en-US/docs/Web/API/Request
                        // https://developer.mozilla.org/en-US/docs/Web/API/Request/mode
                        // https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials

                        // process data if data is either a string or [object Object] and process_data is not set to false
                        var data_type = dtype(data);
                        if (process_data !== false && (data_type === "string" || data_type === "object")) {

                            // if data is a string we turn into an object
                            if (typeof data === "string") {
                                // breakdown and turn data into an object
                                var parameters = data.split("&"),
                                    parsed_data = {};
                                for (var i = 0, l = parameters.length; i < l; i++) {
                                    var parameter = parameters[i].split("=");
                                    parsed_data[parameter[0]] = parameter[1];
                                }
                                // reset data var
                                data = parsed_data;
                            }
                            // else if already object just continue

                            // now we escape special characters in parameters
                            // http://stackoverflow.com/questions/75980/when-are-you-supposed-to-use-escape-instead-of-encodeuri-encodeuricomponent
                            // http://stackoverflow.com/questions/4540753/should-i-use-encodeuri-or-encodeuricomponent-for-encoding-urls
                            // http://stackoverflow.com/questions/15847882/how-to-send-raw-text-with-xmlhttp-request/39109184#39109184
                            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
                            var data_string = "",
                                i = 0;
                            for (var key in data) {
                                if (data.hasOwnProperty(key)) {
                                    data_string += ((i !== 0) ? "&" : "") + encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
                                    i++;
                                }
                            }
                            // reset data var
                            data = data_string;

                        }
                        // else...data is of the following types and those do not get processed.
                        // (new Int8Array(), new Blob(), new FormData(), document, null)

                        // stringify object if post_json flag is set
                        if (post_json) {
                            try {
                                data = JSON.stringify(data);
                            } catch (error) {
                                console.warn(error);
                            }
                        }

                        // -------------------------

                        // listen to when request starts and ends
                        // http://stackoverflow.com/questions/6233927/microsecond-timing-in-javascript
                        xhr.addEventListener("loadstart", callbacks.loadstart, false);
                        xhr.addEventListener("loadend", callbacks.loadend, false);

                        // listen to request state
                        xhr.addEventListener("progress", callbacks.progress, false);
                        xhr.addEventListener("abort", callbacks.abort, false);

                        // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/timeout
                        xhr.addEventListener("timeout", callbacks.timeout, false);

                        // http://stackoverflow.com/questions/14946291/can-one-replace-xhr-onreadystatechange-with-xhr-onload-for-ajax-calls
                        // http://stackoverflow.com/questions/9181090/is-onload-equal-to-readystate-4-in-xmlhttprequest
                        // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/onreadystatechange
                        // readystatechange wont fire when canceled with abort() method
                        xhr.addEventListener("readystatechange", callbacks.readystatechange, false);

                        // listen for request completion
                        // http://stackoverflow.com/questions/6783053/xmlhttprequest-is-always-calling-load-event-listener-even-when-response-has-e/21025981#21025981
                        xhr.addEventListener("load", callbacks.load, false);

                        // **Note: user must handle HTTP request error response on their own.
                        // this is really only invoked for network-level errors.
                        xhr.addEventListener("error", callbacks.error, false);

                        // -------------------------

                        // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/send
                        // possible data types: null, new Int8Array(), new Blob(), document, 'string', & new FormData()
                        xhr.send(data);

                    });

                },
                /**
                 * @description [Returns the needed http object property.]
                 * @param  {String} property [The wanted property.]
                 * @return {String}     [The wanted property.]
                 */
                "getProp": function(property) {
                    // cache the object
                    var _ = this,
                        properties = _.properties;

                    // a property must be provided
                    // it must also be a string
                    if (!property || !dtype(property, "string")) return;

                    // property must exist
                    if (!(property in properties) || !properties.hasOwnProperty(property)) return;

                    // return the property
                    return properties[property];

                },
                "abort": function() {

                    // single xhr abort...
                    abort(this);

                }
            },

            // class to extend
            "extend__": false

        });

        // return library to add to global scope later...
        return Library;

    })();

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
        if (!Object.keys(xhrs).length) {
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

    // =============================== Attach Library To Global Scope

    // add to global scope for ease of use
    // use global app var or create it if not present
    var app = (window.app || (window.app = {}));
    // get the libs object from within the app object
    // if it does not exist create it
    var libs = (app.libs || (app.libs = {}));
    // add the library to the libs object
    libs.http = library;

})();
