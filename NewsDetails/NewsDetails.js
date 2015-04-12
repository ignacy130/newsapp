/**
 * Created by dabler on 12/04/15.
 */
if (Meteor.isClient) {
    Template.NewsDetails.helpers({
        news: function () {
            var param = Session.get('cardToDelete')
            console.log(param);
            return Newses.findOne(param)
        },
        isOwner: function () {
            return this.owner === Meteor.userId();
        }
    });
}