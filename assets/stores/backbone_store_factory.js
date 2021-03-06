'use strict';

var Backbone = require('backbone');
var _ = require('underscore');

var BackboneStoreFactory = function () {
  this.initialize();
};
BackboneStoreFactory.extend = Backbone.Collection.extend;

var EVENTS = 'add remove change reset sort';

_(BackboneStoreFactory.prototype).extend({
  collection: null,

  model: Backbone.Model,

  _storage: null,

  initialize: function () {
    // Prefer using this.collection over this.model
    var Collection;
    if (this.collection) {
      Collection = this.collection;
      this.model = this.collection.model;
    } else {
      Collection = Backbone.Collection.extend({ model: this.model });
    }

    this._storage = new Collection();
  },

  load: function (models) {
    this._storage.reset(models);
  },

  getAll: function () {
    return this._storage.toJSON();
  },

  get: function (id) {
    var model = this._storage.get(id);
    return model.toJSON();
  },

  update: function (id, data) {
    this._storage.get(id).set(data);
  },

  destroy: function (id) {
    this._storage.remove(id);
  },

  create: function (data) {
    var model = new this.model(data);
    var idAttr = model.idAttr || 'id';

    if (!model.get(idAttr)) {
      model.set(idAttr, model.cid);
    }

    this._storage.add(model);
  },

  addChangeListener: function (callback) {
    this._storage.on(EVENTS, callback);
  },

  removeChangeListener: function (callback) {
    this._storage.off(EVENTS, callback);
  }
});

module.exports = BackboneStoreFactory;
