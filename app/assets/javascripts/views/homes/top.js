FixieBNB.Views.TopView = Backbone.CompositeView.extend({

  template: JST['homes/top'],

  className: 'home-top',

  initialize: function () {
  },

  events: {
    "submit": "submit",
  },

  submit: function (event) {
    event.preventDefault();
    var input = $('input[name]').val();
    console.log(input)
    console.log(" fired from Homes Top after clicking Search")
    Backbone.history.navigate("#/search/index/" + input, { trigger: true })
  },

  render: function () {
    var renderedContent = this.template({})

    this.$el.html(renderedContent);
    return this;
  },



});
