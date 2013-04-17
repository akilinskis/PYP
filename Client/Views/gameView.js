var GameView = Backbone.View.extend({
  tagName: 'span',
  id: 'game',
  render: function() {
    var html = '<h3>' + this.model.get('name') + '</h3>';
    $('#games').html($(this.el).html(html));
  }
});
