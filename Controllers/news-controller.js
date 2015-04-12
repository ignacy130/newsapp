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

        var votedFor = [];
        var votedAgainst = [];

        Newses.insert({
            author: Meteor.userId(),
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