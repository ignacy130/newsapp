// MODEL
// NEWS : ENTITY
// userId <FK>
// photo <?>
// header <string>
// bullets <list<string>>
// votedFor <user>
// votedAgainst <user>

Newses = new Mongo.Collection("newses");

if (Meteor.isClient) {
    // This code only runs on the client
    Template.body.helpers({

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
        }
    });
}

Meteor.methods({
    addNews: function (header, photo, bullets) {
        //is user logged check
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        Newses.insert({
            author: Meteor.userId(),
            createdAt: new Date(),
            header: header,
            photo: photo,
            bullets: bullets
        });
    },

    deleteNews: function (newsId) {
        Newses.remove(taskId);
    }
});