FixieBNB.Views.UserView = Backbone.CompositeView.extend({

  template: JST["users/dashboard"],
  profileTemplate: JST["users/profile"],
  listingsTemplate: JST["users/listings"],
  requestsTemplate: JST["users/requests"],

  initialize: function (options) {
    this.currentUserListings = options.listings;
    this.currentUserRequests = options.requests;
    this.addSideBar();
    this.addUserContent();
    this.addFooter();
    this.listenTo(this.sideBarView, "profileView", this.profileView);
    this.listenTo(this.sideBarView, "myListings", this.listingsView);
    this.listenTo(this.sideBarView, "myRequests", this.requestsView);
  },

  profileView: function () {
    var $userContent = $('.user-content')
    $userContent.empty();
    var profileContent = this.profileTemplate({})
    $userContent.html(profileContent)
  },

  listingsView: function () {
    var arrImages = [];
    this.currentUserListings.each(function (listing) {
      arrImages.push(listing)
    })

    var $userContent = $('.user-content');
    $userContent.empty();

    var listingsContent = this.listingsTemplate({
      images: arrImages
    })

    $userContent.html(listingsContent);
  },

  requestsView: function () {
    var arrImages = [];
    console.log(this.currentUserRequests);
    this.currentUserRequests.each(function (listing) {
      arrImages.push(listing)
    })

    var $userContent = $('.user-content')
    $userContent.empty();

    var requestsTemplate = this.requestsTemplate({
      images: arrImages
    })

    $userContent.html(requestsTemplate);
  },

  addSideBar: function () {
    var sideBarView = new FixieBNB.Views.SideBar({})
    this.sideBarView = sideBarView;
    this.addSubview("div.side-bar", sideBarView)
  },

  addUserContent: function () {
    var userContent = new FixieBNB.Views.UserContent({})
    this.addSubview("div.user-content", userContent)
  },

  addFooter: function () {
    var footerView = new FixieBNB.Views.FooterView({})
    this.addSubview("div.dashboard-footer", footerView);
  },

  render: function () {
    var renderedContent = this.template({

    })

    this.$el.html(renderedContent);
    this.attachSubviews();
    return this;
  },

})
