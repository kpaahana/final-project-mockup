var require = meteorInstall({"imports":{"api":{"base":{"BaseCollection.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/api/base/BaseCollection.js                                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                                //
                                                                                                                       //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                       //
                                                                                                                       //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                      //
                                                                                                                       //
var module1 = module;                                                                                                  // 1
var Mongo = void 0;                                                                                                    // 1
module1.watch(require("meteor/mongo"), {                                                                               // 1
  Mongo: function (v) {                                                                                                // 1
    Mongo = v;                                                                                                         // 1
  }                                                                                                                    // 1
}, 0);                                                                                                                 // 1
var Meteor = void 0;                                                                                                   // 1
module1.watch(require("meteor/meteor"), {                                                                              // 1
  Meteor: function (v) {                                                                                               // 1
    Meteor = v;                                                                                                        // 1
  }                                                                                                                    // 1
}, 1);                                                                                                                 // 1
var check = void 0;                                                                                                    // 1
module1.watch(require("meteor/check"), {                                                                               // 1
  check: function (v) {                                                                                                // 1
    check = v;                                                                                                         // 1
  }                                                                                                                    // 1
}, 2);                                                                                                                 // 1
                                                                                                                       //
var _ = void 0;                                                                                                        // 1
                                                                                                                       //
module1.watch(require("meteor/underscore"), {                                                                          // 1
  _: function (v) {                                                                                                    // 1
    _ = v;                                                                                                             // 1
  }                                                                                                                    // 1
}, 3);                                                                                                                 // 1
                                                                                                                       //
/** @module Base */ /**                                                                                                // 6
                     * BaseCollection is an abstract superclass of all RadGrad data model entities.                    //
                     * It is the direct superclass for SlugCollection and SemesterCollection.                          //
                     * Other collection classes are derived from BaseInstanceCollection or BaseTypeCollection, which are abstract
                     * classes that inherit from this one.                                                             //
                     */var BaseCollection = function () {                                                              //
  /**                                                                                                                  // 16
   * Superclass constructor for all RadGrad entities.                                                                  //
   * Defines internal fields needed by all entities: _type, _collectionName, _collection, and _schema.                 //
   * @param {String} type The name of the entity defined by the subclass.                                              //
   * @param {SimpleSchema} schema The schema for validating fields on insertion to the DB.                             //
   */function BaseCollection(type, schema) {                                                                           //
    (0, _classCallCheck3.default)(this, BaseCollection);                                                               // 22
    this._type = type;                                                                                                 // 23
    this._collectionName = type + "Collection";                                                                        // 24
    this._collection = new Mongo.Collection(type + "Collection");                                                      // 25
    this._schema = schema;                                                                                             // 26
                                                                                                                       //
    this._collection.attachSchema(this._schema);                                                                       // 27
  } /**                                                                                                                // 28
     * Returns the number of documents in this collection.                                                             //
     * @returns { Number } The number of elements in this collection.                                                  //
     */                                                                                                                //
                                                                                                                       //
  BaseCollection.prototype.count = function () {                                                                       //
    function count() {                                                                                                 //
      return this._collection.find().count();                                                                          // 35
    }                                                                                                                  // 36
                                                                                                                       //
    return count;                                                                                                      //
  }(); /**                                                                                                             //
        * Returns the SimpleSchema instance associated with this collection.                                           //
        * @returns {SimpleSchema} The schema.                                                                          //
        */                                                                                                             //
                                                                                                                       //
  BaseCollection.prototype.getSchema = function () {                                                                   //
    function getSchema() {                                                                                             //
      return this._schema;                                                                                             // 43
    }                                                                                                                  // 44
                                                                                                                       //
    return getSchema;                                                                                                  //
  }(); /**                                                                                                             //
        * Default publication method for entities.                                                                     //
        * It publishes the entire collection.                                                                          //
        */                                                                                                             //
                                                                                                                       //
  BaseCollection.prototype.publish = function () {                                                                     //
    function publish() {                                                                                               //
      var _this = this;                                                                                                // 50
                                                                                                                       //
      if (Meteor.isServer) {                                                                                           // 51
        Meteor.publish(this._collectionName, function () {                                                             // 52
          return _this._collection.find();                                                                             // 52
        });                                                                                                            // 52
      }                                                                                                                // 53
    }                                                                                                                  // 54
                                                                                                                       //
    return publish;                                                                                                    //
  }(); /**                                                                                                             //
        * Default subscription method for entities.                                                                    //
        * It subscribes to the entire collection.                                                                      //
        */                                                                                                             //
                                                                                                                       //
  BaseCollection.prototype.subscribe = function () {                                                                   //
    function subscribe() {                                                                                             //
      if (Meteor.isClient) {                                                                                           // 61
        Meteor.subscribe(this._collectionName);                                                                        // 62
      }                                                                                                                // 63
    }                                                                                                                  // 64
                                                                                                                       //
    return subscribe;                                                                                                  //
  }(); /**                                                                                                             //
        * A stricter form of findOne, in that it throws an exception if the entity isn't found in the collection.      //
        * @param { String | Object } name Either the docID, or an object selector, or the 'name' field value, or the   //
        * username field value.                                                                                        //
        * @returns { Object } The document associated with name.                                                       //
        * @throws { Meteor.Error } If the document cannot be found.                                                    //
        */                                                                                                             //
                                                                                                                       //
  BaseCollection.prototype.findDoc = function () {                                                                     //
    function findDoc(name) {                                                                                           //
      var doc = this._collection.findOne(name) || this._collection.findOne({                                           // 74
        name: name                                                                                                     // 76
      }) || this._collection.findOne({                                                                                 // 76
        username: name                                                                                                 // 77
      }) || this._collection.findOne({                                                                                 // 77
        _id: name                                                                                                      // 78
      });                                                                                                              // 78
                                                                                                                       //
      if (!doc) {                                                                                                      // 79
        throw new Meteor.Error(name + " is not a defined " + this._type);                                              // 80
      }                                                                                                                // 81
                                                                                                                       //
      return doc;                                                                                                      // 82
    }                                                                                                                  // 83
                                                                                                                       //
    return findDoc;                                                                                                    //
  }(); /**                                                                                                             //
        * Runs find on this collection.                                                                                //
        * @see {@link http://docs.meteor.com/#/full/find|Meteor Docs on Mongo Find}                                    //
        * @param { Object } selector A MongoDB selector.                                                               //
        * @param { Object } options MongoDB options.                                                                   //
        * @returns {Mongo.Cursor}                                                                                      //
        */                                                                                                             //
                                                                                                                       //
  BaseCollection.prototype.find = function () {                                                                        //
    function find(selector, options) {                                                                                 //
      var theSelector = typeof selector === 'undefined' ? {} : selector;                                               // 93
      return this._collection.find(theSelector, options);                                                              // 94
    }                                                                                                                  // 95
                                                                                                                       //
    return find;                                                                                                       //
  }(); /**                                                                                                             //
        * Returns the entire collection via find().fetch().                                                            //
        * @returns [Array] A list of this collection as objects.                                                       //
        */                                                                                                             //
                                                                                                                       //
  BaseCollection.prototype.findAll = function () {                                                                     //
    function findAll() {                                                                                               //
      return this._collection.find().fetch();                                                                          // 102
    }                                                                                                                  // 103
                                                                                                                       //
    return findAll;                                                                                                    //
  }(); /**                                                                                                             //
        * Runs a simplified version of update on this collection.                                                      //
        * @see {@link http://docs.meteor.com/api/collections.html#Mongo-Collection-update}                             //
        * @param { Object } selector A MongoDB selector.                                                               //
        * @param { Object } modifier A MongoDB modifier                                                                //
        * @returns true                                                                                                //
        */                                                                                                             //
                                                                                                                       //
  BaseCollection.prototype.update = function () {                                                                      //
    function update(selector, modifier) {                                                                              //
      var theSelector = typeof selector === 'undefined' ? {} : selector;                                               // 113
                                                                                                                       //
      this._collection.update(theSelector, modifier);                                                                  // 114
                                                                                                                       //
      return true;                                                                                                     // 115
    }                                                                                                                  // 116
                                                                                                                       //
    return update;                                                                                                     //
  }(); /**                                                                                                             //
        * Returns true if the passed entity is in this collection.                                                     //
        * @param { String | Object } name The docID, or an object specifying a document, or the name, or the username.
        * @returns {boolean} True if name exists in this collection.                                                   //
        */                                                                                                             //
                                                                                                                       //
  BaseCollection.prototype.isDefined = function () {                                                                   //
    function isDefined(name) {                                                                                         //
      return !!this._collection.findOne(name) || !!this._collection.findOne({                                          // 124
        name: name                                                                                                     // 126
      }) || !!this._collection.findOne({                                                                               // 126
        username: name                                                                                                 // 127
      }) || !!this._collection.findOne({                                                                               // 127
        _id: name                                                                                                      // 128
      });                                                                                                              // 128
    }                                                                                                                  // 129
                                                                                                                       //
    return isDefined;                                                                                                  //
  }(); /**                                                                                                             //
        * A stricter form of remove that throws an error if the document or docID could not be found in this collection.
        * @param { String | Object } name A document or docID in this collection.                                      //
        */                                                                                                             //
                                                                                                                       //
  BaseCollection.prototype.removeIt = function () {                                                                    //
    function removeIt(name) {                                                                                          //
      var doc = this.findDoc(name);                                                                                    // 136
      check(doc, Object);                                                                                              // 137
                                                                                                                       //
      this._collection.remove(doc._id);                                                                                // 138
    }                                                                                                                  // 139
                                                                                                                       //
    return removeIt;                                                                                                   //
  }(); /**                                                                                                             //
        * Removes all elements of this collection.                                                                     //
        */                                                                                                             //
                                                                                                                       //
  BaseCollection.prototype.removeAll = function () {                                                                   //
    function removeAll() {                                                                                             //
      this._collection.remove({});                                                                                     // 145
    }                                                                                                                  // 146
                                                                                                                       //
    return removeAll;                                                                                                  //
  }(); /**                                                                                                             //
        * Return the type of this collection.                                                                          //
        * @returns { String } The type, as a string.                                                                   //
        */                                                                                                             //
                                                                                                                       //
  BaseCollection.prototype.getType = function () {                                                                     //
    function getType() {                                                                                               //
      return this._type;                                                                                               // 153
    }                                                                                                                  // 154
                                                                                                                       //
    return getType;                                                                                                    //
  }(); /**                                                                                                             //
        * Return the publication name.                                                                                 //
        * @returns { String } The publication name, as a string.                                                       //
        */                                                                                                             //
                                                                                                                       //
  BaseCollection.prototype.getPublicationName = function () {                                                          //
    function getPublicationName() {                                                                                    //
      return this._collectionName;                                                                                     // 161
    }                                                                                                                  // 162
                                                                                                                       //
    return getPublicationName;                                                                                         //
  }(); /**                                                                                                             //
        * Returns a string representing all of the documents in this collection.                                       //
        * @returns {String}                                                                                            //
        */                                                                                                             //
                                                                                                                       //
  BaseCollection.prototype.toString = function () {                                                                    //
    function toString() {                                                                                              //
      return this._collection.find().fetch();                                                                          // 169
    }                                                                                                                  // 170
                                                                                                                       //
    return toString;                                                                                                   //
  }(); /**                                                                                                             //
        * Verifies that the passed object is one of this collection's instances.                                       //
        * @param { String | List } name Should be a defined ID or doc in this collection.                              //
        * @throws { Meteor.Error } If not defined.                                                                     //
        */                                                                                                             //
                                                                                                                       //
  BaseCollection.prototype.assertDefined = function () {                                                               //
    function assertDefined(name) {                                                                                     //
      if (!this.isDefined(name)) {                                                                                     // 178
        throw new Meteor.Error(name + " is not a valid instance of " + this._type + ".");                              // 179
      }                                                                                                                // 180
    }                                                                                                                  // 181
                                                                                                                       //
    return assertDefined;                                                                                              //
  }(); /**                                                                                                             //
        * Verifies that the list of passed instances are all members of this collection.                               //
        * @param names Should be a list of docs and/or docIDs.                                                         //
        * @throws { Meteor.Error } If instances is not an array, or if any instance is not in this collection.         //
        */                                                                                                             //
                                                                                                                       //
  BaseCollection.prototype.assertAllDefined = function () {                                                            //
    function assertAllDefined(names) {                                                                                 //
      var _this2 = this;                                                                                               // 188
                                                                                                                       //
      if (!_.isArray(names)) {                                                                                         // 189
        throw new Meteor.Error(names + " is not an array.");                                                           // 190
      }                                                                                                                // 191
                                                                                                                       //
      names.map(function (name) {                                                                                      // 192
        return _this2.assertDefined(name);                                                                             // 192
      });                                                                                                              // 192
    }                                                                                                                  // 193
                                                                                                                       //
    return assertAllDefined;                                                                                           //
  }(); /**                                                                                                             //
        * Define the default integrity checker for all applications.                                                   //
        * Returns an array with a string indicating that this method is not overridden.                                //
        * @returns { array } An array containing a string indicating the use of the default integrity checker.         //
        */                                                                                                             //
                                                                                                                       //
  BaseCollection.prototype.checkIntegrity = function () {                                                              //
    function checkIntegrity() {                                                                                        //
      // eslint-disable-line class-methods-use-this                                                                    // 200
      return ['There is no integrity checker defined for this collection.'];                                           // 201
    }                                                                                                                  // 202
                                                                                                                       //
    return checkIntegrity;                                                                                             //
  }(); /**                                                                                                             //
        * Returns an object with two fields: name and contents.                                                        //
        * Name is the name of this collection.                                                                         //
        * Contents is an array of objects suitable for passing to the restore() method.                                //
        * @returns {Object} An object representing the contents of this collection.                                    //
        */                                                                                                             //
                                                                                                                       //
  BaseCollection.prototype.dumpAll = function () {                                                                     //
    function dumpAll() {                                                                                               //
      var _this3 = this;                                                                                               // 210
                                                                                                                       //
      var dumpObject = {                                                                                               // 211
        name: this._collectionName,                                                                                    // 211
        contents: this.find().map(function (docID) {                                                                   // 211
          return _this3.dumpOne(docID);                                                                                // 211
        })                                                                                                             // 211
      }; // sort the contents array by slug (if present)                                                               // 211
                                                                                                                       //
      if (dumpObject.contents[0] && dumpObject.contents[0].slug) {                                                     // 213
        dumpObject.contents = _.sortBy(dumpObject.contents, function (obj) {                                           // 214
          return obj.slug;                                                                                             // 214
        });                                                                                                            // 214
      }                                                                                                                // 215
                                                                                                                       //
      return dumpObject;                                                                                               // 216
    }                                                                                                                  // 217
                                                                                                                       //
    return dumpAll;                                                                                                    //
  }(); /**                                                                                                             //
        * Returns an object representing the definition of docID in a format appropriate to the restoreOne function.   //
        * Must be overridden by each collection.                                                                       //
        * @param docID A docID from this collection.                                                                   //
        * @returns { Object } An object representing this document.                                                    //
        */                                                                                                             //
                                                                                                                       //
  BaseCollection.prototype.dumpOne = function () {                                                                     //
    function dumpOne(docID) {                                                                                          //
      // eslint-disable-line                                                                                           // 225
      throw new Meteor.Error("Default dumpOne method invoked by collection " + this._collectionName);                  // 226
    }                                                                                                                  // 227
                                                                                                                       //
    return dumpOne;                                                                                                    //
  }(); /**                                                                                                             //
        * Defines the entity represented by dumpObject.                                                                //
        * Defaults to calling the define() method if it exists.                                                        //
        * @param dumpObject An object representing one document in this collection.                                    //
        * @returns { String } The docID of the newly created document.                                                 //
        */                                                                                                             //
                                                                                                                       //
  BaseCollection.prototype.restoreOne = function () {                                                                  //
    function restoreOne(dumpObject) {                                                                                  //
      if (typeof this.define === 'function') {                                                                         // 236
        return this.define(dumpObject);                                                                                // 237
      }                                                                                                                // 238
                                                                                                                       //
      return null;                                                                                                     // 239
    }                                                                                                                  // 240
                                                                                                                       //
    return restoreOne;                                                                                                 //
  }(); /**                                                                                                             //
        * Defines all the entities in the passed array of objects.                                                     //
        * @param dumpObjects The array of objects representing the definition of a document in this collection.        //
        */                                                                                                             //
                                                                                                                       //
  BaseCollection.prototype.restoreAll = function () {                                                                  //
    function restoreAll(dumpObjects) {                                                                                 //
      var _this4 = this;                                                                                               // 246
                                                                                                                       //
      _.each(dumpObjects, function (dumpObject) {                                                                      // 247
        return _this4.restoreOne(dumpObject);                                                                          // 247
      });                                                                                                              // 247
    }                                                                                                                  // 248
                                                                                                                       //
    return restoreAll;                                                                                                 //
  }();                                                                                                                 //
                                                                                                                       //
  return BaseCollection;                                                                                               //
}(); /**                                                                                                               //
      * The BaseCollection used by all RadGrad entities.                                                               //
      */                                                                                                               //
                                                                                                                       //
module1.exportDefault(BaseCollection);                                                                                 // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"BaseUtilities.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/api/base/BaseUtilities.js                                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({                                                                                                        // 1
  removeAllEntities: function () {                                                                                     // 1
    return removeAllEntities;                                                                                          // 1
  }                                                                                                                    // 1
});                                                                                                                    // 1
var Profiles = void 0;                                                                                                 // 1
module.watch(require("/imports/api/profile/ProfileCollection"), {                                                      // 1
  Profiles: function (v) {                                                                                             // 1
    Profiles = v;                                                                                                      // 1
  }                                                                                                                    // 1
}, 0);                                                                                                                 // 1
var Interests = void 0;                                                                                                // 1
module.watch(require("/imports/api/interest/InterestCollection"), {                                                    // 1
  Interests: function (v) {                                                                                            // 1
    Interests = v;                                                                                                     // 1
  }                                                                                                                    // 1
}, 1);                                                                                                                 // 1
                                                                                                                       //
function removeAllEntities() {                                                                                         // 4
  Profiles.removeAll();                                                                                                // 5
  Interests.removeAll();                                                                                               // 6
}                                                                                                                      // 7
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/api/base/index.js                                                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.watch(require("./BaseCollection"));                                                                             // 1
module.watch(require("./BaseUtilities"));                                                                              // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"interest":{"InterestCollection.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/api/interest/InterestCollection.js                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                                //
                                                                                                                       //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                       //
                                                                                                                       //
var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");                          //
                                                                                                                       //
var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);                                 //
                                                                                                                       //
var _inherits2 = require("babel-runtime/helpers/inherits");                                                            //
                                                                                                                       //
var _inherits3 = _interopRequireDefault(_inherits2);                                                                   //
                                                                                                                       //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                      //
                                                                                                                       //
var module1 = module;                                                                                                  // 1
module1.export({                                                                                                       // 1
  Interests: function () {                                                                                             // 1
    return Interests;                                                                                                  // 1
  }                                                                                                                    // 1
});                                                                                                                    // 1
var SimpleSchema = void 0;                                                                                             // 1
module1.watch(require("simpl-schema"), {                                                                               // 1
  "default": function (v) {                                                                                            // 1
    SimpleSchema = v;                                                                                                  // 1
  }                                                                                                                    // 1
}, 0);                                                                                                                 // 1
var BaseCollection = void 0;                                                                                           // 1
module1.watch(require("/imports/api/base/BaseCollection"), {                                                           // 1
  "default": function (v) {                                                                                            // 1
    BaseCollection = v;                                                                                                // 1
  }                                                                                                                    // 1
}, 1);                                                                                                                 // 1
var check = void 0;                                                                                                    // 1
module1.watch(require("meteor/check"), {                                                                               // 1
  check: function (v) {                                                                                                // 1
    check = v;                                                                                                         // 1
  }                                                                                                                    // 1
}, 2);                                                                                                                 // 1
var Meteor = void 0;                                                                                                   // 1
module1.watch(require("meteor/meteor"), {                                                                              // 1
  Meteor: function (v) {                                                                                               // 1
    Meteor = v;                                                                                                        // 1
  }                                                                                                                    // 1
}, 3);                                                                                                                 // 1
                                                                                                                       //
var _ = void 0;                                                                                                        // 1
                                                                                                                       //
module1.watch(require("meteor/underscore"), {                                                                          // 1
  _: function (v) {                                                                                                    // 1
    _ = v;                                                                                                             // 1
  }                                                                                                                    // 1
}, 4);                                                                                                                 // 1
var Tracker = void 0;                                                                                                  // 1
module1.watch(require("meteor/tracker"), {                                                                             // 1
  Tracker: function (v) {                                                                                              // 1
    Tracker = v;                                                                                                       // 1
  }                                                                                                                    // 1
}, 5);                                                                                                                 // 1
                                                                                                                       //
/** @module Interest */ /**                                                                                            // 8
                         * Represents a specific interest, such as "Software Engineering".                             //
                         * @extends module:Base~BaseCollection                                                         //
                         */var InterestCollection = function (_BaseCollection) {                                       //
  (0, _inherits3.default)(InterestCollection, _BaseCollection);                                                        //
                                                                                                                       //
  /**                                                                                                                  // 16
   * Creates the Interest collection.                                                                                  //
   */function InterestCollection() {                                                                                   //
    (0, _classCallCheck3.default)(this, InterestCollection);                                                           // 19
    return (0, _possibleConstructorReturn3.default)(this, _BaseCollection.call(this, 'Interest', new SimpleSchema({    // 19
      name: {                                                                                                          // 21
        type: String                                                                                                   // 21
      },                                                                                                               // 21
      description: {                                                                                                   // 22
        type: String,                                                                                                  // 22
        optional: true                                                                                                 // 22
      }                                                                                                                // 22
    }, {                                                                                                               // 20
      tracker: Tracker                                                                                                 // 23
    })));                                                                                                              // 23
  } /**                                                                                                                // 24
     * Defines a new Interest.                                                                                         //
     * @example                                                                                                        //
     * Interests.define({ name: 'Software Engineering',                                                                //
     *                    description: 'Methods for group development of large, high quality software systems' });     //
     * @param { Object } description Object with keys name and description.                                            //
     * Name must be previously undefined. Description is optional.                                                     //
     * Creates a "slug" for this name and stores it in the slug field.                                                 //
     * @throws {Meteor.Error} If the interest definition includes a defined name.                                      //
     * @returns The newly created docID.                                                                               //
     */                                                                                                                //
                                                                                                                       //
  InterestCollection.prototype.define = function () {                                                                  //
    function define(_ref) {                                                                                            //
      var name = _ref.name,                                                                                            // 37
          description = _ref.description;                                                                              // 37
      check(name, String);                                                                                             // 38
      check(description, String);                                                                                      // 39
                                                                                                                       //
      if (this.find({                                                                                                  // 40
        name: name                                                                                                     // 40
      }).count() > 0) {                                                                                                // 40
        throw new Meteor.Error(name + " is previously defined in another Interest");                                   // 41
      }                                                                                                                // 42
                                                                                                                       //
      return this._collection.insert({                                                                                 // 43
        name: name,                                                                                                    // 43
        description: description                                                                                       // 43
      });                                                                                                              // 43
    }                                                                                                                  // 44
                                                                                                                       //
    return define;                                                                                                     //
  }(); /**                                                                                                             //
        * Returns the Interest name corresponding to the passed interest docID.                                        //
        * @param interestID An interest docID.                                                                         //
        * @returns { String } An interest name.                                                                        //
        * @throws { Meteor.Error} If the interest docID cannot be found.                                               //
        */                                                                                                             //
                                                                                                                       //
  InterestCollection.prototype.findName = function () {                                                                //
    function findName(interestID) {                                                                                    //
      this.assertDefined(interestID);                                                                                  // 53
      return this.findDoc(interestID).name;                                                                            // 54
    }                                                                                                                  // 55
                                                                                                                       //
    return findName;                                                                                                   //
  }(); /**                                                                                                             //
        * Returns a list of Interest names corresponding to the passed list of Interest docIDs.                        //
        * @param interestIDs A list of Interest docIDs.                                                                //
        * @returns { Array }                                                                                           //
        * @throws { Meteor.Error} If any of the instanceIDs cannot be found.                                           //
        */                                                                                                             //
                                                                                                                       //
  InterestCollection.prototype.findNames = function () {                                                               //
    function findNames(interestIDs) {                                                                                  //
      var _this2 = this;                                                                                               // 63
                                                                                                                       //
      return interestIDs.map(function (interestID) {                                                                   // 64
        return _this2.findName(interestID);                                                                            // 64
      });                                                                                                              // 64
    }                                                                                                                  // 65
                                                                                                                       //
    return findNames;                                                                                                  //
  }(); /**                                                                                                             //
        * Throws an error if the passed name is not a defined Interest name.                                           //
        * @param name The name of an interest.                                                                         //
        */                                                                                                             //
                                                                                                                       //
  InterestCollection.prototype.assertName = function () {                                                              //
    function assertName(name) {                                                                                        //
      this.findDoc(name);                                                                                              // 72
    }                                                                                                                  // 73
                                                                                                                       //
    return assertName;                                                                                                 //
  }(); /**                                                                                                             //
        * Throws an error if the passed list of names are not all Interest names.                                      //
        * @param names An array of (hopefully) Interest names.                                                         //
        */                                                                                                             //
                                                                                                                       //
  InterestCollection.prototype.assertNames = function () {                                                             //
    function assertNames(names) {                                                                                      //
      var _this3 = this;                                                                                               // 79
                                                                                                                       //
      _.each(names, function (name) {                                                                                  // 80
        return _this3.assertName(name);                                                                                // 80
      });                                                                                                              // 80
    }                                                                                                                  // 81
                                                                                                                       //
    return assertNames;                                                                                                //
  }(); /**                                                                                                             //
        * Returns the docID associated with the passed Interest name, or throws an error if it cannot be found.        //
        * @param { String } name An interest name.                                                                     //
        * @returns { String } The docID associated with the name.                                                      //
        * @throws { Meteor.Error } If name is not associated with an Interest.                                         //
        */                                                                                                             //
                                                                                                                       //
  InterestCollection.prototype.findID = function () {                                                                  //
    function findID(name) {                                                                                            //
      return this.findDoc(name)._id;                                                                                   // 90
    }                                                                                                                  // 91
                                                                                                                       //
    return findID;                                                                                                     //
  }(); /**                                                                                                             //
        * Returns the docIDs associated with the array of Interest names, or throws an error if any name cannot be found.
        * If nothing is passed, then an empty array is returned.                                                       //
        * @param { String[] } names An array of interest names.                                                        //
        * @returns { String[] } The docIDs associated with the names.                                                  //
        * @throws { Meteor.Error } If any instance is not an Interest name.                                            //
        */                                                                                                             //
                                                                                                                       //
  InterestCollection.prototype.findIDs = function () {                                                                 //
    function findIDs(names) {                                                                                          //
      var _this4 = this;                                                                                               // 100
                                                                                                                       //
      return names ? names.map(function (instance) {                                                                   // 101
        return _this4.findID(instance);                                                                                // 101
      }) : [];                                                                                                         // 101
    }                                                                                                                  // 102
                                                                                                                       //
    return findIDs;                                                                                                    //
  }(); /**                                                                                                             //
        * Returns an object representing the Interest docID in a format acceptable to define().                        //
        * @param docID The docID of an Interest.                                                                       //
        * @returns { Object } An object representing the definition of docID.                                          //
        */                                                                                                             //
                                                                                                                       //
  InterestCollection.prototype.dumpOne = function () {                                                                 //
    function dumpOne(docID) {                                                                                          //
      var doc = this.findDoc(docID);                                                                                   // 110
      var name = doc.name;                                                                                             // 111
      var description = doc.description;                                                                               // 112
      return {                                                                                                         // 113
        name: name,                                                                                                    // 113
        description: description                                                                                       // 113
      };                                                                                                               // 113
    }                                                                                                                  // 114
                                                                                                                       //
    return dumpOne;                                                                                                    //
  }();                                                                                                                 //
                                                                                                                       //
  return InterestCollection;                                                                                           //
}(BaseCollection); /**                                                                                                 //
                    * Provides the singleton instance of this class to all other entities.                             //
                    */                                                                                                 //
                                                                                                                       //
var Interests = new InterestCollection();                                                                              // 120
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/api/interest/index.js                                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.watch(require("./InterestCollection.js"));                                                                      // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"profile":{"ProfileCollection.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/api/profile/ProfileCollection.js                                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                                //
                                                                                                                       //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                       //
                                                                                                                       //
var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");                          //
                                                                                                                       //
var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);                                 //
                                                                                                                       //
var _inherits2 = require("babel-runtime/helpers/inherits");                                                            //
                                                                                                                       //
var _inherits3 = _interopRequireDefault(_inherits2);                                                                   //
                                                                                                                       //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                      //
                                                                                                                       //
var module1 = module;                                                                                                  // 1
module1.export({                                                                                                       // 1
  Profiles: function () {                                                                                              // 1
    return Profiles;                                                                                                   // 1
  }                                                                                                                    // 1
});                                                                                                                    // 1
var SimpleSchema = void 0;                                                                                             // 1
module1.watch(require("simpl-schema"), {                                                                               // 1
  "default": function (v) {                                                                                            // 1
    SimpleSchema = v;                                                                                                  // 1
  }                                                                                                                    // 1
}, 0);                                                                                                                 // 1
var BaseCollection = void 0;                                                                                           // 1
module1.watch(require("/imports/api/base/BaseCollection"), {                                                           // 1
  "default": function (v) {                                                                                            // 1
    BaseCollection = v;                                                                                                // 1
  }                                                                                                                    // 1
}, 1);                                                                                                                 // 1
var Interests = void 0;                                                                                                // 1
module1.watch(require("/imports/api/interest/InterestCollection"), {                                                   // 1
  Interests: function (v) {                                                                                            // 1
    Interests = v;                                                                                                     // 1
  }                                                                                                                    // 1
}, 2);                                                                                                                 // 1
var check = void 0;                                                                                                    // 1
module1.watch(require("meteor/check"), {                                                                               // 1
  check: function (v) {                                                                                                // 1
    check = v;                                                                                                         // 1
  }                                                                                                                    // 1
}, 3);                                                                                                                 // 1
var Meteor = void 0;                                                                                                   // 1
module1.watch(require("meteor/meteor"), {                                                                              // 1
  Meteor: function (v) {                                                                                               // 1
    Meteor = v;                                                                                                        // 1
  }                                                                                                                    // 1
}, 4);                                                                                                                 // 1
                                                                                                                       //
var _ = void 0;                                                                                                        // 1
                                                                                                                       //
module1.watch(require("meteor/underscore"), {                                                                          // 1
  _: function (v) {                                                                                                    // 1
    _ = v;                                                                                                             // 1
  }                                                                                                                    // 1
}, 5);                                                                                                                 // 1
var Tracker = void 0;                                                                                                  // 1
module1.watch(require("meteor/tracker"), {                                                                             // 1
  Tracker: function (v) {                                                                                              // 1
    Tracker = v;                                                                                                       // 1
  }                                                                                                                    // 1
}, 6);                                                                                                                 // 1
                                                                                                                       //
/** @module Profile */ /**                                                                                             // 9
                        * Profiles provide portfolio data for a user.                                                  //
                        * @extends module:Base~BaseCollection                                                          //
                        */var ProfileCollection = function (_BaseCollection) {                                         //
  (0, _inherits3.default)(ProfileCollection, _BaseCollection);                                                         //
                                                                                                                       //
  /**                                                                                                                  // 17
   * Creates the Profile collection.                                                                                   //
   */function ProfileCollection() {                                                                                    //
    (0, _classCallCheck3.default)(this, ProfileCollection);                                                            // 20
    return (0, _possibleConstructorReturn3.default)(this, _BaseCollection.call(this, 'Profile', new SimpleSchema({     // 20
      username: {                                                                                                      // 22
        type: String                                                                                                   // 22
      },                                                                                                               // 22
      // Remainder are optional                                                                                        // 23
      firstName: {                                                                                                     // 24
        type: String,                                                                                                  // 24
        optional: true                                                                                                 // 24
      },                                                                                                               // 24
      lastName: {                                                                                                      // 25
        type: String,                                                                                                  // 25
        optional: true                                                                                                 // 25
      },                                                                                                               // 25
      bio: {                                                                                                           // 26
        type: String,                                                                                                  // 26
        optional: true                                                                                                 // 26
      },                                                                                                               // 26
      interests: {                                                                                                     // 27
        type: Array,                                                                                                   // 27
        optional: true                                                                                                 // 27
      },                                                                                                               // 27
      'interests.$': {                                                                                                 // 28
        type: String                                                                                                   // 28
      },                                                                                                               // 28
      title: {                                                                                                         // 29
        type: String,                                                                                                  // 29
        optional: true                                                                                                 // 29
      },                                                                                                               // 29
      location: {                                                                                                      // 30
        type: String,                                                                                                  // 30
        optional: true                                                                                                 // 30
      },                                                                                                               // 30
      picture: {                                                                                                       // 31
        type: SimpleSchema.RegEx.Url,                                                                                  // 31
        optional: true                                                                                                 // 31
      },                                                                                                               // 31
      github: {                                                                                                        // 32
        type: SimpleSchema.RegEx.Url,                                                                                  // 32
        optional: true                                                                                                 // 32
      },                                                                                                               // 32
      facebook: {                                                                                                      // 33
        type: SimpleSchema.RegEx.Url,                                                                                  // 33
        optional: true                                                                                                 // 33
      },                                                                                                               // 33
      instagram: {                                                                                                     // 34
        type: SimpleSchema.RegEx.Url,                                                                                  // 34
        optional: true                                                                                                 // 34
      }                                                                                                                // 34
    }, {                                                                                                               // 21
      tracker: Tracker                                                                                                 // 35
    })));                                                                                                              // 35
  } /**                                                                                                                // 36
     * Defines a new Profile.                                                                                          //
     * @example                                                                                                        //
     * Profiles.define({ firstName: 'Philip',                                                                          //
     *                   lastName: 'Johnson',                                                                          //
     *                   username: 'johnson',                                                                          //
     *                   bio: 'I have been a professor of computer science at UH since 1990.',                         //
     *                   interests: ['Application Development', 'Software Engineering', 'Databases'],                  //
     *                   title: 'Professor of Information and Computer Sciences',                                      //
     *                   picture: 'http://philipmjohnson.org/headshot.jpg',                                            //
     *                   github: 'https://github.com/philipmjohnson',                                                  //
     *                   facebook: 'https://facebook.com/philipmjohnson',                                              //
     *                   instagram: 'https://instagram.com/philipmjohnson' });                                         //
     * @param { Object } description Object with required key username.                                                //
     * Remaining keys are optional.                                                                                    //
     * Username must be unique for all users. It should be the UH email account.                                       //
     * Interests is an array of defined interest names.                                                                //
     * @throws { Meteor.Error } If a user with the supplied username already exists, or                                //
     * if one or more interests are not defined, or if github, facebook, and instagram are not URLs.                   //
     * @returns The newly created docID.                                                                               //
     */                                                                                                                //
                                                                                                                       //
  ProfileCollection.prototype.define = function () {                                                                   //
    function define(_ref) {                                                                                            //
      var _ref$firstName = _ref.firstName,                                                                             // 60
          firstName = _ref$firstName === undefined ? '' : _ref$firstName,                                              // 60
          _ref$lastName = _ref.lastName,                                                                               // 60
          lastName = _ref$lastName === undefined ? '' : _ref$lastName,                                                 // 60
          username = _ref.username,                                                                                    // 60
          _ref$bio = _ref.bio,                                                                                         // 60
          bio = _ref$bio === undefined ? '' : _ref$bio,                                                                // 60
          _ref$interests = _ref.interests,                                                                             // 60
          interests = _ref$interests === undefined ? [] : _ref$interests,                                              // 60
          _ref$picture = _ref.picture,                                                                                 // 60
          picture = _ref$picture === undefined ? '' : _ref$picture,                                                    // 60
          _ref$title = _ref.title,                                                                                     // 60
          title = _ref$title === undefined ? '' : _ref$title,                                                          // 60
          _ref$github = _ref.github,                                                                                   // 60
          github = _ref$github === undefined ? '' : _ref$github,                                                       // 60
          _ref$facebook = _ref.facebook,                                                                               // 60
          facebook = _ref$facebook === undefined ? '' : _ref$facebook,                                                 // 60
          _ref$instagram = _ref.instagram,                                                                             // 60
          instagram = _ref$instagram === undefined ? '' : _ref$instagram,                                              // 60
          _ref$location = _ref.location,                                                                               // 60
          location = _ref$location === undefined ? '' : _ref$location;                                                 // 60
      // make sure required fields are OK.                                                                             // 61
      var checkPattern = {                                                                                             // 62
        firstName: String,                                                                                             // 62
        lastName: String,                                                                                              // 62
        username: String,                                                                                              // 62
        bio: String,                                                                                                   // 62
        picture: String,                                                                                               // 62
        title: String,                                                                                                 // 63
        location: String                                                                                               // 63
      };                                                                                                               // 62
      check({                                                                                                          // 64
        firstName: firstName,                                                                                          // 64
        lastName: lastName,                                                                                            // 64
        username: username,                                                                                            // 64
        bio: bio,                                                                                                      // 64
        picture: picture,                                                                                              // 64
        title: title,                                                                                                  // 64
        location: location                                                                                             // 64
      }, checkPattern);                                                                                                // 64
                                                                                                                       //
      if (this.find({                                                                                                  // 66
        username: username                                                                                             // 66
      }).count() > 0) {                                                                                                // 66
        throw new Meteor.Error(username + " is previously defined in another Profile");                                // 67
      } // Throw an error if any of the passed Interest names are not defined.                                         // 68
                                                                                                                       //
                                                                                                                       //
      Interests.assertNames(interests); // Throw an error if there are duplicates in the passed interest names.        // 71
                                                                                                                       //
      if (interests.length !== _.uniq(interests).length) {                                                             // 74
        throw new Meteor.Error(interests + " contains duplicates");                                                    // 75
      }                                                                                                                // 76
                                                                                                                       //
      return this._collection.insert({                                                                                 // 78
        firstName: firstName,                                                                                          // 78
        lastName: lastName,                                                                                            // 78
        username: username,                                                                                            // 78
        bio: bio,                                                                                                      // 78
        interests: interests,                                                                                          // 78
        picture: picture,                                                                                              // 78
        title: title,                                                                                                  // 78
        github: github,                                                                                                // 78
        facebook: facebook,                                                                                            // 79
        instagram: instagram,                                                                                          // 79
        location: location                                                                                             // 79
      });                                                                                                              // 78
    }                                                                                                                  // 80
                                                                                                                       //
    return define;                                                                                                     //
  }(); /**                                                                                                             //
        * Returns an object representing the Profile docID in a format acceptable to define().                         //
        * @param docID The docID of a Profile.                                                                         //
        * @returns { Object } An object representing the definition of docID.                                          //
        */                                                                                                             //
                                                                                                                       //
  ProfileCollection.prototype.dumpOne = function () {                                                                  //
    function dumpOne(docID) {                                                                                          //
      var doc = this.findDoc(docID);                                                                                   // 88
      var firstName = doc.firstName;                                                                                   // 89
      var lastName = doc.lastName;                                                                                     // 90
      var username = doc.username;                                                                                     // 91
      var bio = doc.bio;                                                                                               // 92
      var interests = doc.interests;                                                                                   // 93
      var picture = doc.picture;                                                                                       // 94
      var title = doc.title;                                                                                           // 95
      var location = doc.location;                                                                                     // 96
      var github = doc.github;                                                                                         // 97
      var facebook = doc.facebook;                                                                                     // 98
      var instagram = doc.instagram;                                                                                   // 99
      return {                                                                                                         // 100
        firstName: firstName,                                                                                          // 100
        lastName: lastName,                                                                                            // 100
        username: username,                                                                                            // 100
        bio: bio,                                                                                                      // 100
        interests: interests,                                                                                          // 100
        picture: picture,                                                                                              // 100
        title: title,                                                                                                  // 100
        github: github,                                                                                                // 100
        facebook: facebook,                                                                                            // 100
        instagram: instagram,                                                                                          // 100
        location: location                                                                                             // 100
      };                                                                                                               // 100
    }                                                                                                                  // 101
                                                                                                                       //
    return dumpOne;                                                                                                    //
  }();                                                                                                                 //
                                                                                                                       //
  return ProfileCollection;                                                                                            //
}(BaseCollection); /**                                                                                                 //
                    * Provides the singleton instance of this class to all other entities.                             //
                    */                                                                                                 //
                                                                                                                       //
var Profiles = new ProfileCollection();                                                                                // 107
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/api/profile/index.js                                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.watch(require("./ProfileCollection.js"));                                                                       // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"startup":{"server":{"accounts.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/startup/server/accounts.js                                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var Accounts = void 0;                                                                                                 // 1
module.watch(require("meteor/accounts-base"), {                                                                        // 1
  Accounts: function (v) {                                                                                             // 1
    Accounts = v;                                                                                                      // 1
  }                                                                                                                    // 1
}, 0);                                                                                                                 // 1
var Profiles = void 0;                                                                                                 // 1
module.watch(require("/imports/api/profile/ProfileCollection"), {                                                      // 1
  Profiles: function (v) {                                                                                             // 1
    Profiles = v;                                                                                                      // 1
  }                                                                                                                    // 1
}, 1);                                                                                                                 // 1
/* eslint-disable no-console */ /* Create a profile document for this user if none exists already. */Accounts.validateNewUser(function () {
  function validate(user) {                                                                                            // 7
    if (user) {                                                                                                        // 8
      var username = user.services.cas.id;                                                                             // 9
                                                                                                                       //
      if (!Profiles.isDefined(username)) {                                                                             // 10
        Profiles.define({                                                                                              // 11
          username: username                                                                                           // 11
        });                                                                                                            // 11
      }                                                                                                                // 12
    } // All UH users are valid for BowFolios.                                                                         // 13
                                                                                                                       //
                                                                                                                       //
    return true;                                                                                                       // 15
  }                                                                                                                    // 16
                                                                                                                       //
  return validate;                                                                                                     // 7
}());                                                                                                                  // 7
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/startup/server/index.js                                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.watch(require("./accounts"));                                                                                   // 1
module.watch(require("./initialize-database"));                                                                        // 1
module.watch(require("./publications"));                                                                               // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"initialize-database.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/startup/server/initialize-database.js                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var Meteor = void 0;                                                                                                   // 1
module.watch(require("meteor/meteor"), {                                                                               // 1
  Meteor: function (v) {                                                                                               // 1
    Meteor = v;                                                                                                        // 1
  }                                                                                                                    // 1
}, 0);                                                                                                                 // 1
var Profiles = void 0;                                                                                                 // 1
module.watch(require("/imports/api/profile/ProfileCollection"), {                                                      // 1
  Profiles: function (v) {                                                                                             // 1
    Profiles = v;                                                                                                      // 1
  }                                                                                                                    // 1
}, 1);                                                                                                                 // 1
var Interests = void 0;                                                                                                // 1
module.watch(require("/imports/api/interest/InterestCollection"), {                                                    // 1
  Interests: function (v) {                                                                                            // 1
    Interests = v;                                                                                                     // 1
  }                                                                                                                    // 1
}, 2);                                                                                                                 // 1
                                                                                                                       //
var _ = void 0;                                                                                                        // 1
                                                                                                                       //
module.watch(require("meteor/underscore"), {                                                                           // 1
  _: function (v) {                                                                                                    // 1
    _ = v;                                                                                                             // 1
  }                                                                                                                    // 1
}, 3);                                                                                                                 // 1
                                                                                                                       //
/* global Assets */ /* eslint-disable no-console */ /**                                                                // 6
                                                     * Returns the definition array associated with collectionName in the restoreJSON structure.
                                                     * @param restoreJSON The restore file contents.                   //
                                                     * @param collection The collection of interest.                   //
                                                     */function getDefinitions(restoreJSON, collection) {              //
  return _.find(restoreJSON.collections, function (obj) {                                                              // 16
    return obj.name === collection;                                                                                    // 16
  }).contents;                                                                                                         // 16
} /**                                                                                                                  // 17
   * Given a collection and the restoreJSON structure, looks up the definitions and invokes define() on them.          //
   * @param collection The collection to be restored.                                                                  //
   * @param restoreJSON The structure containing all of the definitions.                                               //
   */                                                                                                                  //
                                                                                                                       //
function restoreCollection(collection, restoreJSON) {                                                                  // 24
  var definitions = getDefinitions(restoreJSON, collection._collectionName);                                           // 25
  console.log("Defining " + definitions.length + " " + collection._collectionName + " documents.");                    // 26
                                                                                                                       //
  _.each(definitions, function (definition) {                                                                          // 27
    return collection.define(definition);                                                                              // 27
  });                                                                                                                  // 27
}                                                                                                                      // 28
                                                                                                                       //
Meteor.startup(function () {                                                                                           // 30
  /** Only initialize database if it's empty. */var collectionList = [Interests, Profiles];                            // 31
                                                                                                                       //
  var totalDocuments = _.reduce(collectionList, function () {                                                          // 33
    function reducer(memo, collection) {                                                                               // 33
      return memo + collection.count();                                                                                // 34
    }                                                                                                                  // 35
                                                                                                                       //
    return reducer;                                                                                                    // 33
  }(), 0);                                                                                                             // 33
                                                                                                                       //
  if (totalDocuments === 0) {                                                                                          // 36
    var fileName = Meteor.settings.public.initialDatabaseFileName;                                                     // 37
    console.log("Restoring database from file " + fileName + ".");                                                     // 38
    var restoreJSON = JSON.parse(Assets.getText(fileName));                                                            // 39
                                                                                                                       //
    _.each(collectionList, function (collection) {                                                                     // 40
      restoreCollection(collection, restoreJSON);                                                                      // 41
    });                                                                                                                // 42
  }                                                                                                                    // 43
});                                                                                                                    // 44
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"publications.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// imports/startup/server/publications.js                                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var Interests = void 0;                                                                                                // 1
module.watch(require("/imports/api/interest/InterestCollection"), {                                                    // 1
  Interests: function (v) {                                                                                            // 1
    Interests = v;                                                                                                     // 1
  }                                                                                                                    // 1
}, 0);                                                                                                                 // 1
var Profiles = void 0;                                                                                                 // 1
module.watch(require("/imports/api/profile/ProfileCollection"), {                                                      // 1
  Profiles: function (v) {                                                                                             // 1
    Profiles = v;                                                                                                      // 1
  }                                                                                                                    // 1
}, 1);                                                                                                                 // 1
Interests.publish();                                                                                                   // 4
Profiles.publish();                                                                                                    // 5
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}},"server":{"main.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/main.js                                                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.watch(require("/imports/startup/server"));                                                                      // 1
module.watch(require("/imports/api/base"));                                                                            // 1
module.watch(require("/imports/api/profile"));                                                                         // 1
module.watch(require("/imports/api/interest"));                                                                        // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});
require("./server/main.js");
//# sourceMappingURL=app.js.map
