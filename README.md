# xhr-wrapper (http)

A lightweight JavaScript XHR wrapper.

##### Table of Contents

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

<a name="what-it-does"></a>
### What It Does

* Provides a wrapper for the XMLHttpRequest Object
* Uses JavaScript Promises
* Allows for cancelable XHR calls

<a name="add-to-project"></a>
### Add To Project

```html
<script src="path/to/lib.js"></script>
```

<a name="access-library"></a>
### Access Library

```js
var http = window.app.libs.http;
```

<a name="instance-creation"></a>
### Instance Creation

```js
var req = new http();

// Using the "new" keyword is not necessary. If not used
// the library will make sure to use it for you.
var req = http();

// **Note: URL can also be provided upon instance creation.
// If not provided it must be provided later with the
// http.url() method.
var req = new http("posts.php?foo=bar");
```

<a name="api"></a>
### API

<a name="signature-api"></a>
### API &mdash; Signature

```js
/**
 * @param  {String: Optional} [The resource URL. It can be provided on
 *                             instance creation or can be provided later via
 *                             the url() method.]
 * @return {Object}           [The new inactive http instance.]
 */
```

<a name="global-api"></a>
### API &mdash; Global

<a name="global-quicktable-reference"></a>
### Global QuickTable Reference

Method | Function
------------ | -------------
**abortAll** | Aborts all pending requests

<a name="global-methods-long"></a>
### Global Methods

**http.abortAll** &mdash; Aborts all pending requests.

```js
http.abortAll();
```

<a name="instance-api"></a>
### API &mdash; Instance

<a name="instance-quicktable-reference"></a>
### Instance QuickTable Reference

Method | Function
------------ | -------------
**url** | Sets request URL
**data** | Sets request data
**method** | Sets request method
**fileUpload** | Sets fileUpload flag indicating whether files are being uploaded
**processData** | Sets processData flag indicating whether the passed data should be processed
**postJSON** | Sets postJSON flag indicating whether the data should be stringified
**parseJSON** | Sets parseJSON flag indicating whether the responded data should be parse with JSON.parse()
**withCredentials** | Sets withCredentials flag indicating whether CORS needs to be used
**cache** |  Sets cache flag indicating whether cache the request
**async** | Sets async flag indicating whether request will be async or not
**header** |  Sets a request header
**id** | Sets request ID
**responseType** | Sets request responseType
**timeout** | Sets request timeout time
**events** | Sets request events
**run** | Runs the request
**getProp** | Gets http object property
**abort** | Aborts request

<a name="instance-methods-long"></a>
### Instance Methods

**http.url** &mdash; Sets request URL.

```js
http.url("posts.php?foo=bar");
```

**http.data** &mdash; Sets request data.

```js
// string data
req.data("msg=Hello World!&name=Selena Gomez");
// object data
req.data({ "msg": "Hello World!!", "name": "Selena Gomez" });
// form data
req.data(new FormData());
```

**http.method** &mdash; Sets request method.

```js
// Defaults to "GET" if no method is set.
req.method("GET|POST|PUT|DELETE|HEAD|OPTIONS");
```

**http.fileUpload** &mdash; Sets fileUpload flag indicating whether files are being uploaded.

```js
// Defaults to false (not a file upload)
req.fileUpload(true|false);
```

**http.processData** &mdash; Sets processData flag indicating whether the passed data should be processed.

```js
// Defaults to true, causing strings and objects to be processed.
// Set to false if your data does not need processing.
req.processData(true|false);
```

**http.postJSON** &mdash; Sets postJSON flag indicating whether the data should be stringified.

```js
// Defaults to false. Setting flag to true will also set the content type
// header to "application/json".
req.postJSON(true|false);
```

**http.parseJSON** &mdash; Sets parseJSON flag indicating whether the responded data should be parse with JSON.parse().

```js
// Defaults to false. Setting flag to true will parse the returned data and
// set the requests responseJSON (synthetic) property to the parse JSON result.
req.parseJSON(true|false);
```

**http.withCredentials** &mdash; Sets withCredentials flag indicating whether CORS needs to be used.

```js
// Defaults to false.
req.withCredentials(true|false);
```

**http.cache** &mdash; Sets cache flag indicating whether cache the request.

```js
// Defaults to false
req.cache(true|false);
```

**http.async** &mdash; Sets async flag indicating whether request will be async or not.

```js
// Defaults to true
req.async(true|false);
```

**http.header** &mdash; Sets a request header.

```js
// If not provided the only header set is the Content-Type header. It's
// set with a value of "application/x-www-form-urlencoded;charset=UTF-8"
// The content type header is left out for file uploads to let browser 
// determine correct contentType + boundaries.
req.header("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
```

**http.id** &mdash; Sets request ID.

```js
// Defaults to randomly generated ID.
// The ID is used to track the request to abort later if needed.
// **Note: If you are provided an ID it needs to be unique.
req.id("unique-id");
```
**http.responseType** &mdash; Sets request responseType.

```js
// Defaults to ""
req.responseType("json");
```

**http.timeout** &mdash; Sets request timeout time.

```js
// Defaults to 10000 (10 seconds)
req.timeout(5000);
```

**http.events** &mdash; Sets request events.

```js
// Defaults to empty events object (no events)
req.events({
    "abort": function() { /* logic... */ },
    "timeout": function() { /* logic... */ },
    "progress": function() { /* logic... */ }
    "loadstart": function() { /* logic... */ }
    "loadend": function() { /* logic... */ }
    "readystatechange": function() { /* logic... */ }
    // load and error handle via Promise then/catch
    // however, supplying the events will still fire them
    // "load": function() { /* logic... */ }
    // "error": function() { /* logic... */ }
});
```

**http.run** &mdash; Runs the request.

```js
// Once the request is run the object is locked. This means
// the object can no longer be modified with instance methods.
// A Promise is returned.
req.run();
```

**http.getProp** &mdash; Gets http object property.

```js
// Returns the http instances property.
// Possible properties to retrieve include:
// id|callbacks|aborted|locked|opened|resolved|rejected|path
req.getProp("id"); // returns http instance ID
```

**http.abort** &mdash; Aborts request.

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