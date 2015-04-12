/**
 * Created by dabler on 12/04/15.
 */
if (Meteor.isClient) {
    Template.DeleteConfirmationView.helpers({
        isOwner: function () {
            return this.owner === Meteor.userId();
        }
    });

    Template.NewsView.events({
        'click .acceptDelete': function (event, template) {
            var param = Session.get('cardToDelete')
            console.log(param);
            db.products.remove( { _id: param } )
            Router.go('/');
        },

        'click .declineDelete': function (event, template) {
            Router.go('/');
        }
    });
}