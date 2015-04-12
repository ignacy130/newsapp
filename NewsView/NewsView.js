/**
 * Created by dabler on 11/04/15.
 */
if (Meteor.isClient) {
    Template.NewsView.helpers({
        allNewses: function () {
            return Newses.find({});
        },
        isOwner: function () {
            return this.owner === Meteor.userId();
        }
    });

    Template.NewsView.gestures({
        'swipeleft .myItem': function(e, t) {
            e.preventDefault();
            console.log(e.target);
            if(Meteor.userId() != null) {
                if(Newses.find({$or: [{votedFor: Meteor.userId()}, {votedAgainst: Meteor.userId()}]}).count()==0)
                {
                    console.log(e.target.id.valueOf());
                    //Newses.update({ _id: id },{ $push: { votedAgainst: id }});
                }
            }
            console.log("Swipe left!");
        },
        'swiperight .myItem': function(e, t) {
            e.preventDefault();
            var currentUserId = Meteor.user().userId
            if(Newses.find({$or: [{votedFor: currentUserId},{votedAgainst: currentUserId}]}).count() == 0)
            {

            }
            console.log("Swipe right!");
        }
    });
}

    if (Meteor.isCordova) {
        console.log("Printed only in mobile cordova apps");

    }


