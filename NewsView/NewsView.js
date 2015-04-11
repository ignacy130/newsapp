/**
 * Created by dabler on 11/04/15.
 */
NewsDataBase = new Mongo.Collection("newsDataBase");

if (Meteor.isClient) {
    // This code only runs on the client
    //Template.body.helpers({
    //    newses: function () {
    //        // Show newest tasks first
    //        return NewsDataBase.find({}, {sort: {createdAt: -1}});
    //    }
    //});
    Template.body.helpers({
        newses: [
            { header: "Wojna na bliskim wschodzie." },
            { header: "Odkryto nowe złoża ropy na morzu północnym." },
            { header: "Rosja atakuje polskę" }
        ]
    });
}