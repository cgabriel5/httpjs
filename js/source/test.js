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
        // ----------------------------------------------- HTTP POST
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
        // ----------------------------------------------- HTTP GET
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
        // ----------------------------------------------- HTTP GET w/ Error
        // create a new http request
        var req = new http("tes.php?verified=✘"); // file does not exist, gives error
        // set wanted options
        req.events({
            "abort": function(e) {
                console.log("The req was aborted!!!:", e);
            },
            "timeout": function(e) {
                console.log("The function timed out!", e);
            },
            "progress": function(e, percent) {
                console.log("The progress:", percent, e);
            }
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
            // will try to abort request if still active
            req.abort();
        }, 1000);
        // ----------------------------------------------- Post JSON To PHP File
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
        // ----------------------------------------------- Parse JSON Respone From PHP File
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
        // ----------------------------------------------- Multiple File Upload
        document.getElementById("file")
            .addEventListener("change", function(e) {
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
        // ----------------------------------------------- Abort All Pending Requests
        // http.abortAll();
    }
};
