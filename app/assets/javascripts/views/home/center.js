FixieBNB.Views.CenterView = Backbone.CompositeView.extend({
  template: JST["homes/center"],

  initialize: function () {
  },

  render: function () {
    var renderedContent = this.template({
      listings: this.collection
    })
    this.$el.html(renderedContent);
    return this;
  }
});
