//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var Accounts = Package['accounts-base'].Accounts;
var _ = Package.underscore._;

(function(){

////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                            //
// packages/atoy40_accounts-cas/packages/atoy40_accounts-cas.js                               //
//                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                              //
(function () {                                                                                // 1
                                                                                              // 2
//////////////////////////////////////////////////////////////////////////////////////////    // 3
//                                                                                      //    // 4
// packages/atoy40:accounts-cas/cas_client.js                                           //    // 5
//                                                                                      //    // 6
//////////////////////////////////////////////////////////////////////////////////////////    // 7
                                                                                        //    // 8
                                                                                        // 1  // 9
Meteor.loginWithCas = function(callback) {                                              // 2  // 10
                                                                                        // 3  // 11
    var credentialToken = Random.id();                                                  // 4  // 12
                                                                                        // 5  // 13
    if (!Meteor.settings.public &&                                                      // 6  // 14
        !Meteor.settings.public.cas &&                                                  // 7  // 15
        !Meteor.settings.public.cas.loginUrl) {                                         // 8  // 16
        return;                                                                         // 9  // 17
    }                                                                                   // 10
                                                                                        // 11
    var settings = Meteor.settings.public.cas;                                          // 12
                                                                                        // 13
    var loginUrl = settings.loginUrl +                                                  // 14
        "?" + (settings.service || "service") + "=" +                                   // 15
        Meteor.absoluteUrl('_cas/') +                                                   // 16
        credentialToken;                                                                // 17
                                                                                        // 18
    var popup = openCenteredPopup(                                                      // 19
        loginUrl,                                                                       // 20
        settings.width || 800,                                                          // 21
        settings.height || 600                                                          // 22
    );                                                                                  // 23
                                                                                        // 24
    var checkPopupOpen = setInterval(function() {                                       // 25
        try {                                                                           // 26
            // Fix for #328 - added a second test criteria (popup.closed === undefined) // 27
            // to humour this Android quirk:                                            // 28
            // http://code.google.com/p/android/issues/detail?id=21061                  // 29
            var popupClosed = popup.closed || popup.closed === undefined;               // 30
        } catch (e) {                                                                   // 31
            // For some unknown reason, IE9 (and others?) sometimes (when               // 32
            // the popup closes too quickly?) throws "SCRIPT16386: No such              // 33
            // interface supported" when trying to read 'popup.closed'. Try             // 34
            // again in 100ms.                                                          // 35
            return;                                                                     // 36
        }                                                                               // 37
                                                                                        // 38
        if (popupClosed) {                                                              // 39
            clearInterval(checkPopupOpen);                                              // 40
                                                                                        // 41
            // check auth on server.                                                    // 42
            Accounts.callLoginMethod({                                                  // 43
                methodArguments: [{ cas: { credentialToken: credentialToken } }],       // 44
                userCallback: callback                                                  // 45
            });                                                                         // 46
        }                                                                               // 47
    }, 100);                                                                            // 48
};                                                                                      // 49
                                                                                        // 50
var openCenteredPopup = function(url, width, height) {                                  // 51
  var screenX = typeof window.screenX !== 'undefined'                                   // 52
  ? window.screenX : window.screenLeft;                                                 // 53
  var screenY = typeof window.screenY !== 'undefined'                                   // 54
  ? window.screenY : window.screenTop;                                                  // 55
  var outerWidth = typeof window.outerWidth !== 'undefined'                             // 56
  ? window.outerWidth : document.body.clientWidth;                                      // 57
  var outerHeight = typeof window.outerHeight !== 'undefined'                           // 58
  ? window.outerHeight : (document.body.clientHeight - 22);                             // 59
  // XXX what is the 22?                                                                // 60
                                                                                        // 61
  // Use `outerWidth - width` and `outerHeight - height` for help in                    // 62
  // positioning the popup centered relative to the current window                      // 63
  var left = screenX + (outerWidth - width) / 2;                                        // 64
  var top = screenY + (outerHeight - height) / 2;                                       // 65
  var features = ('width=' + width + ',height=' + height +                              // 66
      ',left=' + left + ',top=' + top + ',scrollbars=yes');                             // 67
                                                                                        // 68
  var newwindow = window.open(url, 'Login', features);                                  // 69
  if (newwindow.focus)                                                                  // 70
    newwindow.focus();                                                                  // 71
return newwindow;                                                                       // 72
};                                                                                      // 73
//////////////////////////////////////////////////////////////////////////////////////////    // 82
                                                                                              // 83
}).call(this);                                                                                // 84
                                                                                              // 85
////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['atoy40:accounts-cas'] = {};

})();
