var Game = Backbone.Model.extend({
  idAttribute: '_id',
  sync: function(method, model, options) {
    socket.emit('sync', {method: method, model: model, options: options});
  }
});
