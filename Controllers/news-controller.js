// MODEL
// NEWS : ENTITY
// userId <FK>
// photo <?>
// header <string>
// bullets <list<string>>
// votedFor <user>
// votedAgainst <user>

Newses = new Mongo.Collection("newses");



Meteor.methods({
    allNewses: function () {
        return Newses.find({});
    },

    userNewses: function (userId) {
        return Newses.find({
            userId: {
                $eq: userId
            }
        }, {
            sort: {
                createdAt: -1
            }
        });
    },

    addNews: function (header, photo, bullets) {
        //is user logged check
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        var votedFor = [Meteor.userId()];
        var votedAgainst = [Meteor.userId()];

        Newses.insert({
            author: Meteor.userId(),
            nick: Meteor.user().username,
            createdAt: new Date(),
            header: header,
            photo: photo,
            bullets: bullets,
            votedFor: votedFor,
            votedAgainst: votedAgainst
        });
    },

    deleteNews: function (newsId) {
        Newses.remove(taskId);
    }
});

//Meteor.publish('newsesWithPhotos', function() {
//  // first, get the top 30 posts
//  var topPostsCursor = Newses.find({}, {sort: {createdAt: -1}});
//  // then extract those posts' userIds
//  var userIds = topPostsCursor.map(function(p) { return p.photo });
//
//  // then return an array containing both the posts, and their corresponding comments
//  return [
//    topPostsCursor,
//    Photos.find({_id: {$in: userIds}})
//  ];
//});
