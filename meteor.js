
Posts = new Mongo.Collection("posts");
/* global Posts */ 

//Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    },
    posts: function () {
    console.log(" yo post");
      return Posts.find({});
    }
    
  });

Template.hello.helpers()
  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
      var c = Session.get('counter');
    Meteor.call('newPost', {counter: c});
    }
  });
}





Meteor.methods({
  newPost: function (post) {
    console.log(post);
    post['who'] = Meteor.isServer ? "server" : "client";
    var r=Posts.insert(post);
    console.log(post);
    console.log( String(post) + 'id='+ r);
    var p = Posts.find({_id:r}).fetch()
    console.log(p);
  }
})
