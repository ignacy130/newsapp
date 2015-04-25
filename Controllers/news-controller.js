// MODEL
// NEWS : ENTITY
// userId <FK>
// photo <id>
// header <string>
// bullets <list<string>>
// votedFor <user>
// votedAgainst <user>
// tags <list<id>>

Newses = new Mongo.Collection("newses");
Tags = new Mongo.Collection("tags");

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

    /**
    * Adds news to news collection
    * @param header - title of news
    * @param photo - id of news photo
    * @param bullets - string array of news bullet points
    * @param tags - array of tags ids
    */
    addNews: function (header, photoId, bullets, tagsIds) {
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
            photo: photoId,
            bullets: bullets,
            votedFor: votedFor,
            votedAgainst: votedAgainst,
            tags: tagsIds
        });
    },

    /* Removes news  from collection
    * @param - id of news to be removed
    */
    deleteNews: function (newsId) {
        Newses.remove(taskId);
    }
});


