# xhr-wrapper (http)

A lightweight JavaScript XHR wrapper.

##### Table of Contents

- [Project Setup](#project-setup)
- [What It Does](#what-it-does)
- [Add To Project](#add-to-project)
- [Access Library](#access-library)
- [API](#api)
    - [Global](#global-api)
        - [TOC](#global-methods-toc)
        - [Methods](#global-methods-long)
    - [Instance](#instance-api)
        - [TOC](#instance-methods-toc)
        - [Creation](#instance-creation)
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
- [TODO](#todo)
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
### API &mdash; Global

<a name="global-methods-toc"></a>

- [http.abortAll()](#global-methods-abortall)

<a name="global-methods-long"></a>
### Global Methods

<a name="global-methods-abortall"></a>
**http.abortAll** &mdash; Aborts all pending requests.

- **No Parameters**
- **Returns** Nothing.

```js
http.abortAll();
```

<a name="instance-api"></a>
### API &mdash; Instance

<a name="instance-methods-toc"></a>

- [Instance](#instance-creation)
    - [instance.url( url )](#instance-methods-url)
    - [instance.data( data )](#instance-methods-data)
    - [instance.method( type )](#instance-methods-method)
    - [instance.fileUpload( flag )](#instance-methods-fileupload)
    - [instance.processData( flag )](#instance-methods-processdata)
    - [instance.postJSON( flag )](#instance-methods-postjson)
    - [instance.parseJSON( flag )](#instance-methods-parsejson)
    - [instance.withCredentials( flag )](#instance-methods-withcredentials)
    - [instance.cache( flag )](#instance-methods-cache)
    - [instance.async( flag )](#instance-methods-async)
    - [instance.header( headerName , headerValue )](#instance-methods-header)
    - [instance.id( id )](#instance-methods-id)
    - [instance.responseType( type )](#instance-methods-responsetype)
    - [instance.timeout( time )](#instance-methods-timeout)
    - [instance.events( events )](#instance-methods-events)
    - [instance.run() ](#instance-methods-run)
    - [instance.getProp( propertyName )](#instance-methods-getprop)
    - [instance.abort() ](#instance-methods-abort)

<a name="instance-creation"></a>
### Instance Creation

- `url` (`String`, _Optional_)
    - Internally defaults to `document.URL` when nothing explicitly set.
    - Can be provided later via `instance.url`.
- **Returns** instance.

**Note**: Using the `new` keyword is not necessary. The library will make sure to use it for when when you don't. 

```js
// this...
var req = new http();
// is the same as this
var req = http();

// instance with url
var req = new http("posts.php?foo=bar");
```

<a name="instance-methods-long"></a>
### Instance Methods

<a name="instance-methods-url"></a>
**instance.url(`url`)** &mdash; Sets the request url.

- `url` (`String`, _Required_)
    - Internally defaults to `document.URL` when nothing explicitly set.
- **Returns** instance.

```js
req.url("posts.php?foo=bar");
```

<a name="instance-methods-data"></a>
**instance.data(`data`)** &mdash; Sets the request data.

- `data` (`String|Object|FormData`, _Required_)
    - Internally defaults to `null` when nothing explicitly set.
- **Returns** instance.

```js
// String Data
req.data("msg=Hello World!&name=Selena Gomez");

// Object Data
req.data({ "msg": "Hello World!!", "name": "Selena Gomez" });

// FormData
req.data(new FormData());
```

<a name="instance-methods-method"></a>
**instance.method(`type`)** &mdash; Sets the request method.

- `type` (`String`, _Required_)
    - Internally defaults to `"GET"` when nothing explicitly set.
    - Case insensitive.
    - Possible values: `"GET"`, `"POST"`, `"PUT"`, `"DELETE"`, `"HEAD"`, `"OPTIONS"`
- **Returns** instance.

```js
req.method("POST");
```

<a name="instance-methods-fileupload"></a>
**instance.fileUpload(`flag`)** &mdash; Sets the `fileUpload` flag indicating whether files are being uploaded.

- `flag` (`Boolean`, _Required_)
    - Internally defaults to `false` when nothing explicitly set.
    - Possible values: `true`, `false`
- **Returns** instance.

```js
req.fileUpload(true);
```

<a name="instance-methods-processdata"></a>
**instance.processData(`flag`)** &mdash; Sets the `processData` flag indicating whether the passed data should be processed.

- `flag` (`Boolean`, _Required_)
    - Internally defaults to `true` when nothing explicitly set.
    - Possible values: `true`, `false`
- **Returns** instance.

**Note**: Setting flag to true will only process strings and objects.

```js
req.processData(true);
```

<a name="instance-methods-postjson"></a>
**instance.postJSON(`flag`)** &mdash; Sets the `postJSON` flag indicating whether the data should be stringified.

- `flag` (`Boolean`, _Required_)
    - Internally defaults to `false` when nothing explicitly set.
    - Possible values: `true`, `false`
- **Returns** instance.

```js
req.postJSON(true);
```

<a name="instance-methods-parsejson"></a>
**instance.parseJSON** &mdash; Sets the `parseJSON` flag indicating whether the responded data should be parse with `JSON.parse`.

- `flag` (`Boolean`, _Required_)
    - Internally defaults to `false` when nothing explicitly set.
    - Possible values: `true`, `false`
- **Returns** instance.

**Note**: Setting flag to true will try to parse the returned data with `JSON.parse` and add the result to the `XHR` object under the custom property `responseJSON`. This property defaults to a value of `null`.

```js
req.parseJSON(true);
```

<a name="instance-methods-withcredentials"></a>
**instance.withCredentials(`flag`)** &mdash; Sets the `withCredentials` flag indicating whether CORS needs to be used.

- `flag` (`Boolean`, _Required_)
    - Internally defaults to `false` when nothing explicitly set.
    - Possible values: `true`, `false`
- **Returns** instance.

```js
req.withCredentials(false);
```

<a name="instance-methods-cache"></a>
**instance.cache(`flag`)** &mdash; Sets the `cache` flag indicating whether cache the request.

- `flag` (`Boolean`, _Required_)
    - Internally defaults to `false` when nothing explicitly set.
    - Possible values: `true`, `false`
- **Returns** instance.

```js
req.cache(false);
```

<a name="instance-methods-async"></a>
**instance.async(`flag`)** &mdash; Sets the `async` flag indicating whether request will be async or not.

- `flag` (`Boolean`, _Required_)
    - Internally defaults to `true` when nothing explicitly set.
    - Possible values: `true`, `false`
- **Returns** instance.

```js
req.async(true);
```

<a name="instance-methods-header"></a>
**instance.header(`headerName`, `headerValue`)** &mdash; Sets the a request header.

- `headerName` (`String`, _Required_)
- `headerValue` (`String`, _Required_)
- **Returns** instance.

**Note**: When a `Content-Type` header is not explicitly set it will be set with a default value of `"application/x-www-form-urlencoded;charset=UTF-8"`. However, when uploading files, `instance.fileUpload(true)`, the header is left out to let the browser determine the proper and correct content-type and form boundaries. Information about form boundaries can be found [here](https://stackoverflow.com/q/12348216), [here](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#A_brief_introduction_to_the_submit_methods), [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types#multipartform-data), [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Disposition#As_a_header_for_a_multipart_body), and [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type#Directives). 

```js
req.header("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
```

<a name="instance-methods-id"></a>
**instance.id(`id`)** &mdash; Sets the request ID.

- `id` (`String`, _Required_)
    - Internally defaults to a randomly generated ID when nothing explicitly set.
    - `id` is meant to be used with a future (not yet implemented) global `http.get` method to access request from anywhere in your code.
    - **Note**: `id` must be unique.
- **Returns** instance.

```js
req.id("some-unique-string-id");
```

<a name="instance-methods-responsetype"></a>
**instance.responseType(`type`)** &mdash; Sets the request `responseType`.

- `type` (`String`, _Required_)
    - Internally defaults to `""` when nothing explicitly set.
- **Returns** instance.

```js
req.responseType("json");
```

<a name="instance-methods-timeout"></a>
**instance.timeout(`time`)** &mdash; Sets the request `timeout` time.

- `time` (`Number`, _Required_)
    - Internally defaults to `10000` (10 seconds) when nothing explicitly set.
- **Returns** instance.

```js
req.timeout(5000); // 5 seconds
```

<a name="instance-methods-events"></a>
**instance.events(`events`)** &mdash; Sets the request `events`.

- `id` (`Object`, _Required_)
    - Internally defaults to `{}`, empty events object (no events), when nothing explicitly set.
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

<a name="instance-methods-run"></a>
**instance.run** &mdash; Runs the request.

- **No Parameters**
- **Returns** a `promise`.

**Note**: Once the request is run the object gets locked. This means the object can no longer be modified via instance methods.

```js
req.run();
```

<a name="instance-methods-getprop"></a>
**instance.getProp(property)** &mdash; Gets an http object property.

- `property` (`String`, _Required_)
    - Gettable properties:
        - `id`: The ID of the request.
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

<a name="instance-methods-abort"></a>
**instance.abort** &mdash; Aborts request.

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

### TODO

- [ ] Clean/re-work code.
- [ ] Add a global `http.get` method to be able to access a request using its ID from anywhere.

<a name="license"></a>
### License

This project uses the [MIT License](https://github.com/cgabriel5/http/blob/master/LICENSE.txt).