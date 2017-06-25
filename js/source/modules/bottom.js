// =============================== Attach Library To Global Scope
// add to global scope for ease of use
// use global app var or create it if not present
var app = window.app || (window.app = {});
// get the libs object from within the app object
// if it does not exist create it
var libs = app.libs || (app.libs = {});
// add the library to the libs object
libs.http = library;
