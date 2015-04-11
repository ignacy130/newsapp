/**
 * Created by dabler on 11/04/15.
 */
if (Meteor.isClient) {
    Template.NewsView.helpers({
        allNewses: function () {
            return Newses.find({});
        }
    });
}