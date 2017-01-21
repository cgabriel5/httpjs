document.onreadystatechange = function() {

    "use strict";

    // custom function to check status of request
    function check_status(xhr) {
        if ((xhr.status >= 200 && xhr.status < 300) && xhr.readyState === 4) return xhr; // no HTTP error
        else throw new Error(xhr);
    }

    // all resources have loaded
    if (document.readyState == "complete") {

        // get the library
        var libs = app.libs,
            http = libs.http;

        // ----------------------------------------------- Post JSON

        // create a new http request
        var req = new http("test.php");
        // set wanted options
        req.method("POST");
        // set flag to stringify data. will also set content-type header
        // to "application/json"
        req.postJSON(true);
        req.data({ "msg": "Hello World!!", "name": "Selena Gomez" }); // object data

        // run the req
        req.run()
            .then(check_status)
            .then(function(xhr) {
                console.log("The Server Response:", xhr);
            })
            .catch(function(xhr) {
                console.log("The XHR Error:", xhr);
            });

        // ----------------------------------------------- Parse JSON

        // create a new http request
        var req = new http("test.php?verified=true");
        // set wanted options
        req.parseJSON(true);
        // will try and parse the requests responseText
        // if successfully parsed the value will be set the
        // XHRs responseJSON property. the JSON can then be
        // accessed like so, var json = xhr.responseJSON;

        // run the req
        req.run()
            .then(check_status)
            .then(function(xhr) {
                console.log("The Server Response:", xhr);
            })
            .catch(function(xhr) {
                console.log("The XHR Error:", xhr);
            });

        // ----------------------------------------------- HTTP POST

        // create a new http request
        var req = new http("test.php");
        // set wanted options
        req.method("POST");
        req.header("Content-Type", "application/text");
        // req.data({ "msg": "Hello World!!", "name": "Selena Gomez" }); // object data
        req.data("msg=Hello World!&name=Selena Gomez"); // string data

        // run the req
        req.run()
            .then(check_status)
            .then(function(xhr) {
                console.log("The Server Response:", xhr);
            })
            .catch(function(xhr) {
                console.log("The XHR Error:", xhr);
            });

        // ----------------------------------------------- HTTP GET

        // create a new http request
        var req = new http("test.php?verified=true");

        // run the req
        req.run()
            .then(check_status)
            .then(function(xhr) {
                console.log("The Server Response:", xhr);
            })
            .catch(function(xhr) {
                console.log("The XHR Error:", xhr);
            });

        // ----------------------------------------------- HTTP GET w/ Error

        var callbacks = {
            "abort": function(e) { console.log("The req was aborted!!!:", e); },
            "progress": function(e, percent) { console.log("The progress:", percent, e); },
            "timeout": function(e) { console.log("The function timed out!", e); },
        };

        // create a new http request
        var req = new http("tes.php?verified=false");
        // set wanted options
        req.events({
            "abort": callbacks.abort,
            "timeout": callbacks.timeout,
            "progress": callbacks.progress
        });

        // run the req
        req.run()
            .then(check_status)
            .then(function(xhr) {
                console.log("The Server Response:", xhr);
            })
            .catch(function(xhr) {
                console.log("The XHR Error:", xhr);
            });

        setTimeout(function() {
            // abort XHR request
            req.abort();
        }, 1000);

        // ----------------------------------------------- Multiple File Upload

        document.getElementById("file").addEventListener("change", function(e) {

            // cache the input form, the parent in this case
            var form = this.parentNode;

            // formdata resources...
            // https://www.new-bamboo.co.uk/blog/2012/01/10/ridiculously-simple-ajax-uploads-with-formdata/
            // https://developer.mozilla.org/en-US/docs/Web/API/FormData
            // https://developer.mozilla.org/en-US/docs/Web/API/FormData/getAll
            // https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
            // https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData
            // https://developer.mozilla.org/en-US/docs/Web/API/FormData/append
            var form_data = new FormData(),
                files = this.files, // https://developer.mozilla.org/en-US/docs/Web/API/FileList
                file;

            // loop through files to add to FormData object
            for (var i = 0, l = files.length; i < l; i++) {
                file = files.item(i);
                form_data.append(this.getAttribute("name"), file, file.name);
            }

            // upload files to server

            // create a new http request
            var req = new http("test.php?files=true");
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
                });

        });

        // ----------------------------------------------- Abort All Pending Requests

        // http.abortAll();

    }

};
