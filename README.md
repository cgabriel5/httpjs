# xhr-wrapper (http)

A lightweight JavaScript XHR wrapper.

##### Table of Contents

- [Project Setup](#project-setup)
- [What It Does](#what-it-does)
- [Add To Project](#add-to-project)
- [Access Library](#access-library)
- [Instance Creation](#instance-creation)
- [API](#api)
    - [Global](#global-api)
        - [QuickTable](#global-quicktable-reference)
        - [Methods](#global-methods-long)
    - [Instance](#instance-api)
        - [Signature](#signature-api)
        - [QuickTable](#instance-quicktable-reference)
        - [Methods](#instance-methods-long)
- [Usage](#usage)
    - [Handling HTTP Errors](#handling-http-errors)
    - [POST](#example-post)
    - [GET](#example-get)
    - [Form Upload](#example-form-upload)
    - [File Upload](#example-file-upload)
    - [Post JSON](#example-post-json)
    - [Parse JSON](#example-parse-json)
- [Contributing](#contributing)
- [License](#license)

<a name="project-setup"></a>
### Project Setup

Project uses [this](https://github.com/cgabriel5/snippets/tree/master/boilerplate/application) boilerplate. Its [README.md](https://github.com/cgabriel5/snippets/blob/master/boilerplate/application/README.md#-read-before-use) contains instructions for `Yarn` and `Gulp`.

<a name="what-it-does"></a>
### What It Does

* Provides a wrapper for the `XMLHttpRequest` Object.
* Uses JavaScript Promises.
* Allows for cancelable XHR calls.

<a name="add-to-project"></a>
### Add To Project

**Note**: The library, both minimized and unminimized, is located in `lib/`.

```html
<script src="path/to/lib.js"></script>
```

<a name="access-library"></a>
### Access Library

```js
var http = window.app.libs.http;
```

<a name="api"></a>
## API

<a name="global-api"></a>
### Global

<a name="global-quicktable-reference"></a>
### Global QuickTable Reference

Method | Function
------------ | -------------
`abortAll` | Aborts all pending requests.

<a name="global-methods-long"></a>
### Global Methods

► **instance.abortAll** &mdash; Aborts all pending requests.

- **No Parameters**

```js
http.abortAll();
```

<a name="instance-api"></a>
### Instance

<a name="signature-api"></a>
### Instance Signature

```js
/**
 * @param  {String: Optional} [The resource URL. It can be provided on
 *                             instance creation or can be provided later via
 *                             instance.url.]
 * @return {Object}           [The new inactive http instance.]
 */
```

<a name="instance-creation"></a>
### Instance Creation

**Note**: Using the `new` keyword is not necessary. The library will make sure to use it for when when you don't. 

```js
// this...
var req = new http();
// is the same as this
var req = http();
```

**Note**: The `URL` can also be provided upon instance creation. If not provided it must be provided later via `instance.url()`.

```js
var req = new http("posts.php?foo=bar");
```
<!-- 
<a name="instance-quicktable-reference"></a>
### Instance QuickTable Reference

Method | Function
------------ | -------------
`url` | Sets the request URL.
`data` | Sets the request data.
`method` | Sets the request method.
`fileUpload` | Sets the `fileUpload` flag indicating whether files are being uploaded.
`processData` | Sets the `processData` flag indicating whether the passed data should be processed.
`postJSON` | Sets the `postJSON` flag indicating whether the data should be stringified.
`parseJSON` | Sets the `parseJSON` flag indicating whether the responded data should be parsed with `JSON.parse`.
`withCredentials` | Sets the `withCredentials` flag indicating whether `CORS` needs to be used.
`cache` |  Sets the `cache` flag indicating whether cache the request.
`async` | Sets the `async` flag indicating whether request will be async or not.
`header` |  Sets the a request header.
`id` | Sets the request ID.
`responseType` | Sets the request responseType.
`timeout` | Sets the request timeout time.
`events` | Sets the request events.
`run` | Runs the request.
`getProp` | Gets an http object property.
`abort` | Aborts request. -->

<a name="instance-methods-long"></a>
### Instance Methods

► **instance.url(`URL`)** &mdash; Sets the request URL.

- `URL` (`String`, _Required_, Default: `""`)
- **Returns** instance.

```js
req.url("posts.php?foo=bar");
```

► **instance.data(`data`)** &mdash; Sets the request data.

- `data` (`String|Object|FormData`, _Optional_, Default: `null`)
- **Returns** instance.

```js
// String Data
req.data("msg=Hello World!&name=Selena Gomez");

// Object Data
req.data({ "msg": "Hello World!!", "name": "Selena Gomez" });

// FormData
req.data(new FormData());
```

► **instance.method(`type`)** &mdash; Sets the request method.

- `type` (`String`, _Optional_, Default: `"GET"`)
    - Case insensitive.
    - Possible values: `"GET"`, `"POST"`, `"PUT"`, `"DELETE"`, `"HEAD"`, `"OPTIONS"`
- **Returns** instance.

```js
req.method("POST");
```

► **instance.fileUpload(`flag`)** &mdash; Sets the `fileUpload` flag indicating whether files are being uploaded.

- `flag` (`Boolean`, _Optional_, Default: `false`)
    - Possible values: `true`, `false`
- **Returns** instance.

```js
req.fileUpload(true);
```

► **instance.processData(`flag`)** &mdash; Sets the `processData` flag indicating whether the passed data should be processed.

- `flag` (`Boolean`, _Optional_, Default: `true`)
    - Possible values: `true`, `false`
- **Returns** instance.

**Note**: Setting flag to true will process strings and objects.

```js
req.processData(true);
```

► **instance.postJSON(`flag`)** &mdash; Sets the `postJSON` flag indicating whether the data should be stringified.

- `flag` (`Boolean`, _Optional_, Default: `false`)
    - Possible values: `true`, `false`
- **Returns** instance.

```js
req.postJSON(true);
```

► **instance.parseJSON** &mdash; Sets the `parseJSON` flag indicating whether the responded data should be parse with `JSON.parse`.

- `flag` (`Boolean`, _Optional_, Default: `false`)
    - Possible values: `true`, `false`
- **Returns** instance.

```js
// Setting flag to true will parse the returned data and set the requests 
// responseJSON (synthetic) property to the parse JSON result.
req.parseJSON(true);
```

► **instance.withCredentials(`flag`)** &mdash; Sets the withCredentials flag indicating whether CORS needs to be used.

- `flag` (`Boolean`, _Optional_, Default: `false`)
    - Possible values: `true`, `false`
- **Returns** instance.

```js
req.withCredentials(false);
```

► **instance.cache(`flag`)** &mdash; Sets the cache flag indicating whether cache the request.

- `flag` (`Boolean`, _Optional_, Default: `false`)
    - Possible values: `true`, `false`
- **Returns** instance.

```js
req.cache(false);
```

► **instance.async(`flag`)** &mdash; Sets the async flag indicating whether request will be async or not.

- `flag` (`Boolean`, _Optional_, Default: `true`)
    - Possible values: `true`, `false`
- **Returns** instance.

```js
req.async(true);
```

► **instance.header(`headerName`, `headerValue`)** &mdash; Sets the a request header.

- `headerName` (`String`, _Required_)
- `headerValue` (`String`, _Required_)
- **Returns** instance.

**Note**: If not provided the only header set is the `Content-Type` header. It's set with a value of `"application/x-www-form-urlencoded;charset=UTF-8"`. The content type header is left out for file uploads to let browser determine correct `contentType` and `boundaries`.

```js
req.header("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
```

► **instance.id(`id`)** &mdash; Sets the request ID.

- `id` (`String`, _Required_)
    - Defaults to an internally randomly generated `id` when not explicitly set via `instance.id`.
    - `id` is used to track the request to abort if needed.
    - **Note**: `id` must be unique.
- **Returns** instance.

```js
req.id("some-unique-string-id");
```

► **instance.responseType(`type`)** &mdash; Sets the request responseType.

- `type` (`String`, _Required_, Default: `""`)
- **Returns** instance.

```js
req.responseType("json");
```

► **instance.timeout(`time`)** &mdash; Sets the request timeout time.

- `time` (`Number`, _Required_, Default: `10000`)
- **Returns** instance.

```js
req.timeout(5000); // 5 seconds
```

► **instance.events(`events`)** &mdash; Sets the request events.

- `id` (`Object`, _Required_, Default: `{}`)
    - Defaults to empty events object (no events).
    - Supported events: `abort`, `timeout`, `progress`, `loadstart`, `loadend`, `readystatechange`, `load`, `error`
- **Returns** instance.

```js
req.events({
    "abort": function(event) { /* logic... */ },
    "timeout": function(event) { /* logic... */ },
    "progress": function(event) { /* logic... */ },
    "loadstart": function(event) { /* logic... */ },
    "loadend": function(event) { /* logic... */ },
    "readystatechange": function(event) { /* logic... */ }

    // load and error handle via Promise then/catch
    // however, supplying the events will still fire them
    // "load": function(event) { /* logic... */ }
    // "error": function(event) { /* logic... */ }
});
```

► **instance.run** &mdash; Runs the request.

- **No Parameters**
- **Returns** a `promise`.

**Note**: Once the request is run the object is locked. This means the object can no longer be modified via instance methods.

```js
req.run();
```

► **instance.getProp** &mdash; Gets an http object property.

- `id` (`String`, _Required_)
    - Supported gettable properties:
        - `id`: The `id` of the request.
        - `callbacks`: Object containing all the provided callbacks.
        - `aborted`: Boolean representing whether the request was aborted or not.
        - `locked`: Boolean representing whether the request instance has locked. Gets locked after running the request via `instance.run`.
        - `opened`: Boolean representing whether the request has been opened.
        - `resolved`: Boolean representing whether the request has been resolved.
        - `rejected`: Boolean representing whether the request has been rejected.
        - `path`: String representing the path the request has taken.
            - example path: `"created;unsent;headers-received;loading;finished;done;resolved"`
            - path shows, among other things, that the request was created and finally resolved.
- **Returns** the http instance property's value.

```js
req.getProp("id"); // returns the http's instance id
req.getProp("aborted"); // returns Boolean representing whether the request was aborted or not
```

► **instance.abort** &mdash; Aborts request.

- **No Parameters**
- **Returns** Nothing.

```js
// Aborts http request.
req.abort();
```

<a name="usage"></a>
### Usage

<a name="handling-http-errors"></a>
**Handling HTTP Errors** &mdash; A custom function is needed to handle HTTP errors.

```js
// custom function to check status of request
function check_status(xhr) {
    if ((xhr.status >= 200 && xhr.status < 300) && xhr.readyState === 4) return xhr; // no HTTP error
    else throw new Error(xhr);
}
```

<a name="example-post"></a>
**POST** &mdash; `POST` call.

```js
// create a new http request
var req = new http("test.php");
// set wanted options
req.method("POST");
// data as a string or within an object maybe passed
// req.data({ "msg": "Hello World!!", "name": "Selena Gomez", "simple_post": "✔" }); // object data
req.data("msg=Hello World!&name=Selena Gomez&simple_post=✔"); // string data
// run the req
req.run()
    .then(check_status)
    .then(function(xhr) {
        console.log("The Server Response:", xhr);
    })
    .catch(function(xhr) {
        console.log("The XHR Error:", xhr);
    });
```

<a name="example-get"></a>
**GET** &mdash; `GET` request.

```js
// create a new http request
var req = new http("test.php?verified=✔&simple_get=✔");
// run the req
req.run()
    .then(check_status)
    .then(function(xhr) {
        console.log("The Server Response:", xhr);
    })
    .catch(function(xhr) {
        console.log("The XHR Error:", xhr);
    });
```

<a name="example-form-upload"></a>
**Form Upload** &mdash; `HTML` form upload to `PHP` script.

```js
// get form element from DOM
var form = document.getElementById("form");

// create a new http request
var req = new http("formsubmit.php");
// set wanted options
req.method("POST");
req.data(new FormData(form)); // form data

// run the req
req.run()
    .then(check_status)
    .then(function(xhr) {
        console.log("The Server Response:", xhr);
    })
    .catch(function(xhr) {
        console.log("The XHR Error:", xhr);
    });
```

<a name="example-file-upload"></a>
**File Upload** &mdash; Multiple file upload to `PHP` script.

```html
<form id="form" enctype="multipart/form-data">
    <input id="file" type="file" name="images[]" multiple>
</form>
```

```js
document.getElementById("file").addEventListener("change", function(e) {
    // cache the input form, the parent in this case
    var form = this.parentNode;
    var form_data = new FormData(),
        files = this.files,
        file;
    // loop through files to add to FormData object
    for (var i = 0, l = files.length; i < l; i++) {
        file = files.item(i);
        form_data.append(this.getAttribute("name"), file, file.name);
    }
    // upload files to server
    // create a new http request
    var req = new http("test.php?files=✔");
    // set wanted options
    req.method("POST");
    req.data(form_data); // form data
    req.fileUpload(true);
    // run the req
    req.run()
        .then(check_status)
        .then(function(xhr) {
            console.log("The Server Response:", xhr);
            form.reset(); // reset form
        })
        .catch(function(xhr) {
            console.log("The XHR Error:", xhr);
            form.reset(); // reset form
        });
});
```

<a name="example-post-json"></a>
**Post JSON** &mdash; Set postJSON flag to stringify data.

```js
// create a new http request
var req = new http("test.php?json=✔");
// set wanted options
req.method("POST");
req.postJSON(true); // stringify via JSON.stringify
req.header("content-type", "application/json");
req.data({ // object data
    "msg": "Hello World!!",
    "name": "Selena Gomez"
});
req.processData(false);
// run the req
req.run()
    .then(check_status)
    .then(function(xhr) {
        console.log("The Server Response:", xhr);
    })
    .catch(function(xhr) {
        console.log("The XHR Error:", xhr);
    });
```

<a name="example-parse-json"></a>
**Parse JSON** &mdash; Set parseJSON flag to parse returned data.

```js
// create a new http request
var req = new http("test.php?verified=✔&return_json=✔");
// set wanted options
// will try and parse the requests responseText
// if successfully parsed the value will be set the
// XHRs responseJSON property. the JSON can then be
// accessed like so, var json = xhr.responseJSON;
req.parseJSON(true);
// run the req
req.run()
    .then(check_status)
    .then(function(xhr) {
        console.log("The Server Response:", xhr);
    })
    .catch(function(xhr) {
        console.log("The XHR Error:", xhr);
    });
```

<a name="contributing"></a>
### Contributing

Contributions are welcome! Found a bug, feel like documentation is lacking/confusing and needs an update, have performance/feature suggestions or simply found a typo? Let me know! :)

See how to contribute [here](https://github.com/cgabriel5/http/blob/master/CONTRIBUTING.md).

<a name="license"></a>
### License

This project uses the [MIT License](https://github.com/cgabriel5/http/blob/master/LICENSE.txt).