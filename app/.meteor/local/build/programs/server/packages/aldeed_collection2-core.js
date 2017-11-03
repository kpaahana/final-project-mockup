(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var _ = Package.underscore._;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;
var LocalCollection = Package.minimongo.LocalCollection;
var Minimongo = Package.minimongo.Minimongo;
var EJSON = Package.ejson.EJSON;
var EventEmitter = Package['raix:eventemitter'].EventEmitter;
var ECMAScript = Package.ecmascript.ECMAScript;
var meteorInstall = Package.modules.meteorInstall;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var Symbol = Package['ecmascript-runtime-server'].Symbol;
var Map = Package['ecmascript-runtime-server'].Map;
var Set = Package['ecmascript-runtime-server'].Set;

/* Package-scope variables */
var Collection2;

var require = meteorInstall({"node_modules":{"meteor":{"aldeed:collection2-core":{"collection2.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/aldeed_collection2-core/collection2.js                                                                    //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _typeof2 = require("babel-runtime/helpers/typeof");                                                               //
                                                                                                                      //
var _typeof3 = _interopRequireDefault(_typeof2);                                                                      //
                                                                                                                      //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                     //
                                                                                                                      //
var EventEmitter = void 0;                                                                                            // 1
module.watch(require("meteor/raix:eventemitter"), {                                                                   // 1
  EventEmitter: function (v) {                                                                                        // 1
    EventEmitter = v;                                                                                                 // 1
  }                                                                                                                   // 1
}, 0);                                                                                                                // 1
var Meteor = void 0;                                                                                                  // 1
module.watch(require("meteor/meteor"), {                                                                              // 1
  Meteor: function (v) {                                                                                              // 1
    Meteor = v;                                                                                                       // 1
  }                                                                                                                   // 1
}, 1);                                                                                                                // 1
var EJSON = void 0;                                                                                                   // 1
module.watch(require("meteor/ejson"), {                                                                               // 1
  EJSON: function (v) {                                                                                               // 1
    EJSON = v;                                                                                                        // 1
  }                                                                                                                   // 1
}, 2);                                                                                                                // 1
                                                                                                                      //
var _ = void 0;                                                                                                       // 1
                                                                                                                      //
module.watch(require("meteor/underscore"), {                                                                          // 1
  _: function (v) {                                                                                                   // 1
    _ = v;                                                                                                            // 1
  }                                                                                                                   // 1
}, 3);                                                                                                                // 1
var checkNpmVersions = void 0;                                                                                        // 1
module.watch(require("meteor/tmeasday:check-npm-versions"), {                                                         // 1
  checkNpmVersions: function (v) {                                                                                    // 1
    checkNpmVersions = v;                                                                                             // 1
  }                                                                                                                   // 1
}, 4);                                                                                                                // 1
checkNpmVersions({                                                                                                    // 7
  'simpl-schema': '0.x.x'                                                                                             // 7
}, 'aldeed:meteor-collection2-core');                                                                                 // 7
                                                                                                                      //
var SimpleSchema = require('simpl-schema').default; // Exported only for listening to events                          // 9
                                                                                                                      //
                                                                                                                      //
var Collection2 = new EventEmitter(); /**                                                                             // 12
                                       * Mongo.Collection.prototype.attachSchema                                      //
                                       * @param {SimpleSchema|Object} ss - SimpleSchema instance or a schema definition object
                                       *    from which to create a new SimpleSchema instance                          //
                                       * @param {Object} [options]                                                    //
                                       * @param {Boolean} [options.transform=false] Set to `true` if your document must be passed
                                       *    through the collection's transform to properly validate.                  //
                                       * @param {Boolean} [options.replace=false] Set to `true` to replace any existing schema instead of combining
                                       * @return {undefined}                                                          //
                                       *                                                                              //
                                       * Use this method to attach a schema to a collection created by another package,
                                       * such as Meteor.users. It is most likely unsafe to call this method more than
                                       * once for a single collection, or to call this for a collection that had a    //
                                       * schema object passed to its constructor.                                     //
                                       */                                                                             //
                                                                                                                      //
Mongo.Collection.prototype.attachSchema = function () {                                                               // 29
  function c2AttachSchema(ss, options) {                                                                              // 29
    var self = this;                                                                                                  // 30
    options = options || {}; // Allow passing just the schema object                                                  // 31
                                                                                                                      //
    if (!(ss instanceof SimpleSchema)) {                                                                              // 34
      ss = new SimpleSchema(ss);                                                                                      // 35
    }                                                                                                                 // 36
                                                                                                                      //
    self._c2 = self._c2 || {}; // If we've already attached one schema, we combine both into a new schema unless options.replace is `true`
                                                                                                                      //
    if (self._c2._simpleSchema && options.replace !== true) {                                                         // 41
      if (ss.version >= 2) {                                                                                          // 42
        var newSS = new SimpleSchema(self._c2._simpleSchema);                                                         // 43
        newSS.extend(ss);                                                                                             // 44
        ss = newSS;                                                                                                   // 45
      } else {                                                                                                        // 46
        ss = new SimpleSchema([self._c2._simpleSchema, ss]);                                                          // 47
      }                                                                                                               // 48
    }                                                                                                                 // 49
                                                                                                                      //
    var selector = options.selector;                                                                                  // 51
                                                                                                                      //
    function attachTo(obj) {                                                                                          // 53
      if ((typeof selector === "undefined" ? "undefined" : (0, _typeof3.default)(selector)) === "object") {           // 54
        // Index of existing schema with identical selector                                                           // 55
        var schemaIndex = -1; // we need an array to hold multiple schemas                                            // 56
                                                                                                                      //
        obj._c2._simpleSchemas = obj._c2._simpleSchemas || []; // Loop through existing schemas with selectors        // 59
                                                                                                                      //
        obj._c2._simpleSchemas.forEach(function (schema, index) {                                                     // 62
          // if we find a schema with an identical selector, save it's index                                          // 63
          if (_.isEqual(schema.selector, selector)) {                                                                 // 64
            schemaIndex = index;                                                                                      // 65
          }                                                                                                           // 66
        });                                                                                                           // 67
                                                                                                                      //
        if (schemaIndex === -1) {                                                                                     // 68
          // We didn't find the schema in our array - push it into the array                                          // 69
          obj._c2._simpleSchemas.push({                                                                               // 70
            schema: new SimpleSchema(ss),                                                                             // 71
            selector: selector                                                                                        // 72
          });                                                                                                         // 70
        } else {                                                                                                      // 74
          // We found a schema with an identical selector in our array,                                               // 75
          if (options.replace !== true) {                                                                             // 76
            // Merge with existing schema unless options.replace is `true`                                            // 77
            if (obj._c2._simpleSchemas[schemaIndex].schema.version >= 2) {                                            // 78
              obj._c2._simpleSchemas[schemaIndex].schema.extend(ss);                                                  // 79
            } else {                                                                                                  // 80
              obj._c2._simpleSchemas[schemaIndex].schema = new SimpleSchema([obj._c2._simpleSchemas[schemaIndex].schema, ss]);
            }                                                                                                         // 82
          } else {                                                                                                    // 83
            // If options.repalce is `true` replace existing schema with new schema                                   // 84
            obj._c2._simpleSchemas[schemaIndex].schema = ss;                                                          // 85
          }                                                                                                           // 86
        } // Remove existing schemas without selector                                                                 // 88
                                                                                                                      //
                                                                                                                      //
        delete obj._c2._simpleSchema;                                                                                 // 91
      } else {                                                                                                        // 92
        // Track the schema in the collection                                                                         // 93
        obj._c2._simpleSchema = ss; // Remove existing schemas with selector                                          // 94
                                                                                                                      //
        delete obj._c2._simpleSchemas;                                                                                // 97
      }                                                                                                               // 98
    }                                                                                                                 // 99
                                                                                                                      //
    attachTo(self); // Attach the schema to the underlying LocalCollection, too                                       // 101
                                                                                                                      //
    if (self._collection instanceof LocalCollection) {                                                                // 103
      self._collection._c2 = self._collection._c2 || {};                                                              // 104
      attachTo(self._collection);                                                                                     // 105
    }                                                                                                                 // 106
                                                                                                                      //
    defineDeny(self, options);                                                                                        // 108
    keepInsecure(self);                                                                                               // 109
    Collection2.emit('schema.attached', self, ss, options);                                                           // 111
  }                                                                                                                   // 112
                                                                                                                      //
  return c2AttachSchema;                                                                                              // 29
}();                                                                                                                  // 29
                                                                                                                      //
_.each([Mongo.Collection, LocalCollection], function (obj) {                                                          // 114
  /**                                                                                                                 // 115
   * simpleSchema                                                                                                     //
   * @description function detect the correct schema by given params. If it                                           //
   * detect multi-schema presence in `self`, then it made an attempt to find a                                        //
   * `selector` in args                                                                                               //
   * @param {Object} doc - It could be <update> on update/upsert or document                                          //
   * itself on insert/remove                                                                                          //
   * @param {Object} [options] - It could be <update> on update/upsert etc                                            //
   * @param {Object} [query] - it could be <query> on update/upsert                                                   //
   * @return {Object} Schema                                                                                          //
   */obj.prototype.simpleSchema = function (doc, options, query) {                                                    //
    if (!this._c2) return null;                                                                                       // 127
    if (this._c2._simpleSchema) return this._c2._simpleSchema;                                                        // 128
    var schemas = this._c2._simpleSchemas;                                                                            // 130
                                                                                                                      //
    if (schemas && schemas.length > 0) {                                                                              // 131
      if (!doc) throw new Error('collection.simpleSchema() requires doc argument when there are multiple schemas');   // 132
      var schema, selector, target;                                                                                   // 134
                                                                                                                      //
      for (var i = 0; i < schemas.length; i++) {                                                                      // 135
        schema = schemas[i];                                                                                          // 136
        selector = Object.keys(schema.selector)[0]; // We will set this to undefined because in theory you might want to select
        // on a null value.                                                                                           // 140
                                                                                                                      //
        target = undefined; // here we are looking for selector in different places                                   // 141
        // $set should have more priority here                                                                        // 144
                                                                                                                      //
        if (doc.$set && typeof doc.$set[selector] !== 'undefined') {                                                  // 145
          target = doc.$set[selector];                                                                                // 146
        } else if (typeof doc[selector] !== 'undefined') {                                                            // 147
          target = doc[selector];                                                                                     // 148
        } else if (options && options.selector) {                                                                     // 149
          target = options.selector[selector];                                                                        // 150
        } else if (query && query[selector]) {                                                                        // 151
          // on upsert/update operations                                                                              // 151
          target = query[selector];                                                                                   // 152
        } // we need to compare given selector with doc property or option to                                         // 153
        // find right schema                                                                                          // 156
                                                                                                                      //
                                                                                                                      //
        if (target !== undefined && target === schema.selector[selector]) {                                           // 157
          return schema.schema;                                                                                       // 158
        }                                                                                                             // 159
      }                                                                                                               // 160
    }                                                                                                                 // 161
                                                                                                                      //
    return null;                                                                                                      // 163
  };                                                                                                                  // 164
}); // Wrap DB write operation methods                                                                                // 165
                                                                                                                      //
                                                                                                                      //
_.each(['insert', 'update'], function (methodName) {                                                                  // 168
  var _super = Mongo.Collection.prototype[methodName];                                                                // 169
                                                                                                                      //
  Mongo.Collection.prototype[methodName] = function () {                                                              // 170
    var self = this,                                                                                                  // 171
        options,                                                                                                      // 171
        args = _.toArray(arguments);                                                                                  // 171
                                                                                                                      //
    options = methodName === "insert" ? args[1] : args[2]; // Support missing options arg                             // 174
                                                                                                                      //
    if (!options || typeof options === "function") {                                                                  // 177
      options = {};                                                                                                   // 178
    }                                                                                                                 // 179
                                                                                                                      //
    if (self._c2 && options.bypassCollection2 !== true) {                                                             // 181
      var userId = null;                                                                                              // 182
                                                                                                                      //
      try {                                                                                                           // 183
        // https://github.com/aldeed/meteor-collection2/issues/175                                                    // 183
        userId = Meteor.userId();                                                                                     // 184
      } catch (err) {}                                                                                                // 185
                                                                                                                      //
      args = doValidate.call(self, methodName, args, true, // getAutoValues                                           // 187
      userId, Meteor.isServer // isFromTrustedCode                                                                    // 192
      );                                                                                                              // 187
                                                                                                                      //
      if (!args) {                                                                                                    // 195
        // doValidate already called the callback or threw the error so we're done.                                   // 196
        // But insert should always return an ID to match core behavior.                                              // 197
        return methodName === "insert" ? self._makeNewID() : undefined;                                               // 198
      }                                                                                                               // 199
    } else {                                                                                                          // 200
      // We still need to adjust args because insert does not take options                                            // 201
      if (methodName === "insert" && typeof args[1] !== 'function') args.splice(1, 1);                                // 202
    }                                                                                                                 // 203
                                                                                                                      //
    return _super.apply(self, args);                                                                                  // 205
  };                                                                                                                  // 206
}); /*                                                                                                                // 207
     * Private                                                                                                        //
     */                                                                                                               //
                                                                                                                      //
function doValidate(type, args, getAutoValues, userId, isFromTrustedCode) {                                           // 213
  var self = this,                                                                                                    // 214
      doc,                                                                                                            // 214
      callback,                                                                                                       // 214
      error,                                                                                                          // 214
      options,                                                                                                        // 214
      isUpsert,                                                                                                       // 214
      selector,                                                                                                       // 214
      last,                                                                                                           // 214
      hasCallback;                                                                                                    // 214
                                                                                                                      //
  if (!args.length) {                                                                                                 // 216
    throw new Error(type + " requires an argument");                                                                  // 217
  } // Gather arguments and cache the selector                                                                        // 218
                                                                                                                      //
                                                                                                                      //
  if (type === "insert") {                                                                                            // 221
    doc = args[0];                                                                                                    // 222
    options = args[1];                                                                                                // 223
    callback = args[2]; // The real insert doesn't take options                                                       // 224
                                                                                                                      //
    if (typeof options === "function") {                                                                              // 227
      args = [doc, options];                                                                                          // 228
    } else if (typeof callback === "function") {                                                                      // 229
      args = [doc, callback];                                                                                         // 230
    } else {                                                                                                          // 231
      args = [doc];                                                                                                   // 232
    }                                                                                                                 // 233
  } else if (type === "update") {                                                                                     // 234
    selector = args[0];                                                                                               // 235
    doc = args[1];                                                                                                    // 236
    options = args[2];                                                                                                // 237
    callback = args[3];                                                                                               // 238
  } else {                                                                                                            // 239
    throw new Error("invalid type argument");                                                                         // 240
  }                                                                                                                   // 241
                                                                                                                      //
  var validatedObjectWasInitiallyEmpty = _.isEmpty(doc); // Support missing options arg                               // 243
                                                                                                                      //
                                                                                                                      //
  if (!callback && typeof options === "function") {                                                                   // 246
    callback = options;                                                                                               // 247
    options = {};                                                                                                     // 248
  }                                                                                                                   // 249
                                                                                                                      //
  options = options || {};                                                                                            // 250
  last = args.length - 1;                                                                                             // 252
  hasCallback = typeof args[last] === 'function'; // If update was called with upsert:true, flag as an upsert         // 254
                                                                                                                      //
  isUpsert = type === "update" && options.upsert === true; // we need to pass `doc` and `options` to `simpleSchema` method, that's why
  // schema declaration moved here                                                                                    // 260
                                                                                                                      //
  var schema = self.simpleSchema(doc, options, selector);                                                             // 261
  var isLocalCollection = self._connection === null; // On the server and for local collections, we allow passing `getAutoValues: false` to disable autoValue functions
                                                                                                                      //
  if ((Meteor.isServer || isLocalCollection) && options.getAutoValues === false) {                                    // 265
    getAutoValues = false;                                                                                            // 266
  } // Determine validation context                                                                                   // 267
                                                                                                                      //
                                                                                                                      //
  var validationContext = options.validationContext;                                                                  // 270
                                                                                                                      //
  if (validationContext) {                                                                                            // 271
    if (typeof validationContext === 'string') {                                                                      // 272
      validationContext = schema.namedContext(validationContext);                                                     // 273
    }                                                                                                                 // 274
  } else {                                                                                                            // 275
    validationContext = schema.namedContext();                                                                        // 276
  } // Add a default callback function if we're on the client and no callback was given                               // 277
                                                                                                                      //
                                                                                                                      //
  if (Meteor.isClient && !callback) {                                                                                 // 280
    // Client can't block, so it can't report errors by exception,                                                    // 281
    // only by callback. If they forget the callback, give them a                                                     // 282
    // default one that logs the error, so they aren't totally                                                        // 283
    // baffled if their writes don't work because their database is                                                   // 284
    // down.                                                                                                          // 285
    callback = function (err) {                                                                                       // 286
      if (err) {                                                                                                      // 287
        Meteor._debug(type + " failed: " + (err.reason || err.stack));                                                // 288
      }                                                                                                               // 289
    };                                                                                                                // 290
  } // If client validation is fine or is skipped but then something                                                  // 291
  // is found to be invalid on the server, we get that error back                                                     // 294
  // as a special Meteor.Error that we need to parse.                                                                 // 295
                                                                                                                      //
                                                                                                                      //
  if (Meteor.isClient && hasCallback) {                                                                               // 296
    callback = args[last] = wrapCallbackForParsingServerErrors(validationContext, callback);                          // 297
  }                                                                                                                   // 298
                                                                                                                      //
  var schemaAllowsId = schema.allowsKey("_id");                                                                       // 300
                                                                                                                      //
  if (type === "insert" && !doc._id && schemaAllowsId) {                                                              // 301
    doc._id = self._makeNewID();                                                                                      // 302
  } // Get the docId for passing in the autoValue/custom context                                                      // 303
                                                                                                                      //
                                                                                                                      //
  var docId;                                                                                                          // 306
                                                                                                                      //
  if (type === 'insert') {                                                                                            // 307
    docId = doc._id; // might be undefined                                                                            // 308
  } else if (type === "update" && selector) {                                                                         // 309
    docId = typeof selector === 'string' || selector instanceof Mongo.ObjectID ? selector : selector._id;             // 310
  } // If _id has already been added, remove it temporarily if it's                                                   // 311
  // not explicitly defined in the schema.                                                                            // 314
                                                                                                                      //
                                                                                                                      //
  var cachedId;                                                                                                       // 315
                                                                                                                      //
  if (doc._id && !schemaAllowsId) {                                                                                   // 316
    cachedId = doc._id;                                                                                               // 317
    delete doc._id;                                                                                                   // 318
  }                                                                                                                   // 319
                                                                                                                      //
  function doClean(docToClean, getAutoValues, filter, autoConvert, removeEmptyStrings, trimStrings) {                 // 321
    // Clean the doc/modifier in place                                                                                // 322
    schema.clean(docToClean, {                                                                                        // 323
      mutate: true,                                                                                                   // 324
      filter: filter,                                                                                                 // 325
      autoConvert: autoConvert,                                                                                       // 326
      getAutoValues: getAutoValues,                                                                                   // 327
      isModifier: type !== "insert",                                                                                  // 328
      removeEmptyStrings: removeEmptyStrings,                                                                         // 329
      trimStrings: trimStrings,                                                                                       // 330
      extendAutoValueContext: _.extend({                                                                              // 331
        isInsert: type === "insert",                                                                                  // 332
        isUpdate: type === "update" && options.upsert !== true,                                                       // 333
        isUpsert: isUpsert,                                                                                           // 334
        userId: userId,                                                                                               // 335
        isFromTrustedCode: isFromTrustedCode,                                                                         // 336
        docId: docId,                                                                                                 // 337
        isLocalCollection: isLocalCollection                                                                          // 338
      }, options.extendAutoValueContext || {})                                                                        // 331
    });                                                                                                               // 323
  } // Preliminary cleaning on both client and server. On the server and for local                                    // 341
  // collections, automatic values will also be set at this point.                                                    // 344
                                                                                                                      //
                                                                                                                      //
  doClean(doc, getAutoValues, options.filter !== false, options.autoConvert !== false, options.removeEmptyStrings !== false, options.trimStrings !== false); // We clone before validating because in some cases we need to adjust the
  // object a bit before validating it. If we adjusted `doc` itself, our                                              // 355
  // changes would persist into the database.                                                                         // 356
                                                                                                                      //
  var docToValidate = {};                                                                                             // 357
                                                                                                                      //
  for (var prop in meteorBabelHelpers.sanitizeForInObject(doc)) {                                                     // 358
    // We omit prototype properties when cloning because they will not be valid                                       // 359
    // and mongo omits them when saving to the database anyway.                                                       // 360
    if (Object.prototype.hasOwnProperty.call(doc, prop)) {                                                            // 361
      docToValidate[prop] = doc[prop];                                                                                // 362
    }                                                                                                                 // 363
  } // On the server, upserts are possible; SimpleSchema handles upserts pretty                                       // 364
  // well by default, but it will not know about the fields in the selector,                                          // 367
  // which are also stored in the database if an insert is performed. So we                                           // 368
  // will allow these fields to be considered for validation by adding them                                           // 369
  // to the $set in the modifier. This is no doubt prone to errors, but there                                         // 370
  // probably isn't any better way right now.                                                                         // 371
                                                                                                                      //
                                                                                                                      //
  if (Meteor.isServer && isUpsert && _.isObject(selector)) {                                                          // 372
    var set = docToValidate.$set || {};                                                                               // 373
    docToValidate.$set = _.clone(selector);                                                                           // 374
    if (!schemaAllowsId) delete docToValidate.$set._id;                                                               // 375
                                                                                                                      //
    _.extend(docToValidate.$set, set);                                                                                // 376
  } // Set automatic values for validation on the client.                                                             // 377
  // On the server, we already updated doc with auto values, but on the client,                                       // 380
  // we will add them to docToValidate for validation purposes only.                                                  // 381
  // This is because we want all actual values generated on the server.                                               // 382
                                                                                                                      //
                                                                                                                      //
  if (Meteor.isClient && !isLocalCollection) {                                                                        // 383
    doClean(docToValidate, true, false, false, false, false);                                                         // 384
  } // XXX Maybe move this into SimpleSchema                                                                          // 385
                                                                                                                      //
                                                                                                                      //
  if (!validatedObjectWasInitiallyEmpty && _.isEmpty(docToValidate)) {                                                // 388
    throw new Error('After filtering out keys not in the schema, your ' + (type === 'update' ? 'modifier' : 'object') + ' is now empty');
  } // Validate doc                                                                                                   // 392
                                                                                                                      //
                                                                                                                      //
  var isValid;                                                                                                        // 395
                                                                                                                      //
  if (options.validate === false) {                                                                                   // 396
    isValid = true;                                                                                                   // 397
  } else {                                                                                                            // 398
    isValid = validationContext.validate(docToValidate, {                                                             // 399
      modifier: type === "update" || type === "upsert",                                                               // 400
      upsert: isUpsert,                                                                                               // 401
      extendedCustomContext: _.extend({                                                                               // 402
        isInsert: type === "insert",                                                                                  // 403
        isUpdate: type === "update" && options.upsert !== true,                                                       // 404
        isUpsert: isUpsert,                                                                                           // 405
        userId: userId,                                                                                               // 406
        isFromTrustedCode: isFromTrustedCode,                                                                         // 407
        docId: docId,                                                                                                 // 408
        isLocalCollection: isLocalCollection                                                                          // 409
      }, options.extendedCustomContext || {})                                                                         // 402
    });                                                                                                               // 399
  }                                                                                                                   // 412
                                                                                                                      //
  if (isValid) {                                                                                                      // 414
    // Add the ID back                                                                                                // 415
    if (cachedId) {                                                                                                   // 416
      doc._id = cachedId;                                                                                             // 417
    } // Update the args to reflect the cleaned doc                                                                   // 418
    // XXX not sure this is necessary since we mutate                                                                 // 421
                                                                                                                      //
                                                                                                                      //
    if (type === "insert") {                                                                                          // 422
      args[0] = doc;                                                                                                  // 423
    } else {                                                                                                          // 424
      args[1] = doc;                                                                                                  // 425
    } // If callback, set invalidKey when we get a mongo unique error                                                 // 426
                                                                                                                      //
                                                                                                                      //
    if (Meteor.isServer && hasCallback) {                                                                             // 429
      args[last] = wrapCallbackForParsingMongoValidationErrors(validationContext, args[last]);                        // 430
    }                                                                                                                 // 431
                                                                                                                      //
    return args;                                                                                                      // 433
  } else {                                                                                                            // 434
    error = getErrorObject(validationContext);                                                                        // 435
                                                                                                                      //
    if (callback) {                                                                                                   // 436
      // insert/update/upsert pass `false` when there's an error, so we do that                                       // 437
      callback(error, false);                                                                                         // 438
    } else {                                                                                                          // 439
      throw error;                                                                                                    // 440
    }                                                                                                                 // 441
  }                                                                                                                   // 442
}                                                                                                                     // 443
                                                                                                                      //
function getErrorObject(context) {                                                                                    // 445
  var message;                                                                                                        // 446
  var invalidKeys = typeof context.validationErrors === 'function' ? context.validationErrors() : context.invalidKeys();
                                                                                                                      //
  if (invalidKeys.length) {                                                                                           // 448
    message = context.keyErrorMessage(invalidKeys[0].name);                                                           // 449
  } else {                                                                                                            // 450
    message = "Failed validation";                                                                                    // 451
  }                                                                                                                   // 452
                                                                                                                      //
  var error = new Error(message);                                                                                     // 453
  error.invalidKeys = invalidKeys;                                                                                    // 454
  error.validationContext = context; // If on the server, we add a sanitized error, too, in case we're                // 455
  // called from a method.                                                                                            // 457
                                                                                                                      //
  if (Meteor.isServer) {                                                                                              // 458
    error.sanitizedError = new Meteor.Error(400, message, EJSON.stringify(error.invalidKeys));                        // 459
  }                                                                                                                   // 460
                                                                                                                      //
  return error;                                                                                                       // 461
}                                                                                                                     // 462
                                                                                                                      //
function addUniqueError(context, errorMessage) {                                                                      // 464
  var name = errorMessage.split('c2_')[1].split(' ')[0];                                                              // 465
  var val = errorMessage.split('dup key:')[1].split('"')[1];                                                          // 466
  var addValidationErrorsPropName = typeof context.addValidationErrors === 'function' ? 'addValidationErrors' : 'addInvalidKeys';
  context[addValidationErrorsPropName]([{                                                                             // 469
    name: name,                                                                                                       // 470
    type: 'notUnique',                                                                                                // 471
    value: val                                                                                                        // 472
  }]);                                                                                                                // 469
}                                                                                                                     // 474
                                                                                                                      //
function wrapCallbackForParsingMongoValidationErrors(validationContext, cb) {                                         // 476
  return function () {                                                                                                // 477
    function wrappedCallbackForParsingMongoValidationErrors(error) {                                                  // 477
      var args = _.toArray(arguments);                                                                                // 478
                                                                                                                      //
      if (error && (error.name === "MongoError" && error.code === 11001 || error.message.indexOf('MongoError: E11000' !== -1)) && error.message.indexOf('c2_') !== -1) {
        addUniqueError(validationContext, error.message);                                                             // 482
        args[0] = getErrorObject(validationContext);                                                                  // 483
      }                                                                                                               // 484
                                                                                                                      //
      return cb.apply(this, args);                                                                                    // 485
    }                                                                                                                 // 486
                                                                                                                      //
    return wrappedCallbackForParsingMongoValidationErrors;                                                            // 477
  }();                                                                                                                // 477
}                                                                                                                     // 487
                                                                                                                      //
function wrapCallbackForParsingServerErrors(validationContext, cb) {                                                  // 489
  var addValidationErrorsPropName = typeof validationContext.addValidationErrors === 'function' ? 'addValidationErrors' : 'addInvalidKeys';
  return function () {                                                                                                // 491
    function wrappedCallbackForParsingServerErrors(error) {                                                           // 491
      var args = _.toArray(arguments); // Handle our own validation errors                                            // 492
                                                                                                                      //
                                                                                                                      //
      if (error instanceof Meteor.Error && error.error === 400 && error.reason === "INVALID" && typeof error.details === "string") {
        var invalidKeysFromServer = EJSON.parse(error.details);                                                       // 498
        validationContext[addValidationErrorsPropName](invalidKeysFromServer);                                        // 499
        args[0] = getErrorObject(validationContext);                                                                  // 500
      } // Handle Mongo unique index errors, which are forwarded to the client as 409 errors                          // 501
      else if (error instanceof Meteor.Error && error.error === 409 && error.reason && error.reason.indexOf('E11000') !== -1 && error.reason.indexOf('c2_') !== -1) {
          addUniqueError(validationContext, error.reason);                                                            // 508
          args[0] = getErrorObject(validationContext);                                                                // 509
        }                                                                                                             // 510
                                                                                                                      //
      return cb.apply(this, args);                                                                                    // 511
    }                                                                                                                 // 512
                                                                                                                      //
    return wrappedCallbackForParsingServerErrors;                                                                     // 491
  }();                                                                                                                // 491
}                                                                                                                     // 513
                                                                                                                      //
var alreadyInsecured = {};                                                                                            // 515
                                                                                                                      //
function keepInsecure(c) {                                                                                            // 516
  // If insecure package is in use, we need to add allow rules that return                                            // 517
  // true. Otherwise, it would seemingly turn off insecure mode.                                                      // 518
  if (Package && Package.insecure && !alreadyInsecured[c._name]) {                                                    // 519
    c.allow({                                                                                                         // 520
      insert: function () {                                                                                           // 521
        return true;                                                                                                  // 522
      },                                                                                                              // 523
      update: function () {                                                                                           // 524
        return true;                                                                                                  // 525
      },                                                                                                              // 526
      remove: function () {                                                                                           // 527
        return true;                                                                                                  // 528
      },                                                                                                              // 529
      fetch: [],                                                                                                      // 530
      transform: null                                                                                                 // 531
    });                                                                                                               // 520
    alreadyInsecured[c._name] = true;                                                                                 // 533
  } // If insecure package is NOT in use, then adding the two deny functions                                          // 534
  // does not have any effect on the main app's security paradigm. The                                                // 536
  // user will still be required to add at least one allow function of her                                            // 537
  // own for each operation for this collection. And the user may still add                                           // 538
  // additional deny functions, but does not have to.                                                                 // 539
                                                                                                                      //
}                                                                                                                     // 540
                                                                                                                      //
var alreadyDefined = {};                                                                                              // 542
                                                                                                                      //
function defineDeny(c, options) {                                                                                     // 543
  if (!alreadyDefined[c._name]) {                                                                                     // 544
    var isLocalCollection = c._connection === null; // First define deny functions to extend doc with the results of clean
    // and autovalues. This must be done with "transform: null" or we would be                                        // 549
    // extending a clone of doc and therefore have no effect.                                                         // 550
                                                                                                                      //
    c.deny({                                                                                                          // 551
      insert: function (userId, doc) {                                                                                // 552
        // Referenced doc is cleaned in place                                                                         // 553
        c.simpleSchema(doc).clean(doc, {                                                                              // 554
          mutate: true,                                                                                               // 555
          isModifier: false,                                                                                          // 556
          // We don't do these here because they are done on the client if desired                                    // 557
          filter: false,                                                                                              // 558
          autoConvert: false,                                                                                         // 559
          removeEmptyStrings: false,                                                                                  // 560
          trimStrings: false,                                                                                         // 561
          extendAutoValueContext: {                                                                                   // 562
            isInsert: true,                                                                                           // 563
            isUpdate: false,                                                                                          // 564
            isUpsert: false,                                                                                          // 565
            userId: userId,                                                                                           // 566
            isFromTrustedCode: false,                                                                                 // 567
            docId: doc._id,                                                                                           // 568
            isLocalCollection: isLocalCollection                                                                      // 569
          }                                                                                                           // 562
        });                                                                                                           // 554
        return false;                                                                                                 // 573
      },                                                                                                              // 574
      update: function (userId, doc, fields, modifier) {                                                              // 575
        // Referenced modifier is cleaned in place                                                                    // 576
        c.simpleSchema(modifier).clean(modifier, {                                                                    // 577
          mutate: true,                                                                                               // 578
          isModifier: true,                                                                                           // 579
          // We don't do these here because they are done on the client if desired                                    // 580
          filter: false,                                                                                              // 581
          autoConvert: false,                                                                                         // 582
          removeEmptyStrings: false,                                                                                  // 583
          trimStrings: false,                                                                                         // 584
          extendAutoValueContext: {                                                                                   // 585
            isInsert: false,                                                                                          // 586
            isUpdate: true,                                                                                           // 587
            isUpsert: false,                                                                                          // 588
            userId: userId,                                                                                           // 589
            isFromTrustedCode: false,                                                                                 // 590
            docId: doc && doc._id,                                                                                    // 591
            isLocalCollection: isLocalCollection                                                                      // 592
          }                                                                                                           // 585
        });                                                                                                           // 577
        return false;                                                                                                 // 596
      },                                                                                                              // 597
      fetch: ['_id'],                                                                                                 // 598
      transform: null                                                                                                 // 599
    }); // Second define deny functions to validate again on the server                                               // 551
    // for client-initiated inserts and updates. These should be                                                      // 603
    // called after the clean/autovalue functions since we're adding                                                  // 604
    // them after. These must *not* have "transform: null" if options.transform is true because                       // 605
    // we need to pass the doc through any transforms to be sure                                                      // 606
    // that custom types are properly recognized for type validation.                                                 // 607
                                                                                                                      //
    c.deny(_.extend({                                                                                                 // 608
      insert: function (userId, doc) {                                                                                // 609
        // We pass the false options because we will have done them on client if desired                              // 610
        doValidate.call(c, "insert", [doc, {                                                                          // 611
          trimStrings: false,                                                                                         // 617
          removeEmptyStrings: false,                                                                                  // 618
          filter: false,                                                                                              // 619
          autoConvert: false                                                                                          // 620
        }, function (error) {                                                                                         // 616
          if (error) {                                                                                                // 623
            throw new Meteor.Error(400, 'INVALID', EJSON.stringify(error.invalidKeys));                               // 624
          }                                                                                                           // 625
        }], false, // getAutoValues                                                                                   // 626
        userId, false // isFromTrustedCode                                                                            // 629
        );                                                                                                            // 611
        return false;                                                                                                 // 633
      },                                                                                                              // 634
      update: function (userId, doc, fields, modifier) {                                                              // 635
        // NOTE: This will never be an upsert because client-side upserts                                             // 636
        // are not allowed once you define allow/deny functions.                                                      // 637
        // We pass the false options because we will have done them on client if desired                              // 638
        doValidate.call(c, "update", [{                                                                               // 639
          _id: doc && doc._id                                                                                         // 643
        }, modifier, {                                                                                                // 643
          trimStrings: false,                                                                                         // 646
          removeEmptyStrings: false,                                                                                  // 647
          filter: false,                                                                                              // 648
          autoConvert: false                                                                                          // 649
        }, function (error) {                                                                                         // 645
          if (error) {                                                                                                // 652
            throw new Meteor.Error(400, 'INVALID', EJSON.stringify(error.invalidKeys));                               // 653
          }                                                                                                           // 654
        }], false, // getAutoValues                                                                                   // 655
        userId, false // isFromTrustedCode                                                                            // 658
        );                                                                                                            // 639
        return false;                                                                                                 // 662
      },                                                                                                              // 663
      fetch: ['_id']                                                                                                  // 664
    }, options.transform === true ? {} : {                                                                            // 608
      transform: null                                                                                                 // 665
    })); // note that we've already done this collection so that we don't do it again                                 // 665
    // if attachSchema is called again                                                                                // 668
                                                                                                                      //
    alreadyDefined[c._name] = true;                                                                                   // 669
  }                                                                                                                   // 670
}                                                                                                                     // 671
                                                                                                                      //
module.exportDefault(Collection2);                                                                                    // 1
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});
var exports = require("./node_modules/meteor/aldeed:collection2-core/collection2.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['aldeed:collection2-core'] = exports, {
  Collection2: Collection2
});

})();

//# sourceMappingURL=aldeed_collection2-core.js.map
