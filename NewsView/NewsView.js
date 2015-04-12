/**
 * Created by dabler on 11/04/15.
 */
Handlebars.registerHelper('getPhoto', function () {
    var ph = Photos.findOne(this.photo);
    console.log(this.photo);
    console.log(ph);
    return ph.url();
});

if (Meteor.isClient) {
    //    var p = Meteor.subscribe('newsesWithPhotos');



    Template.NewsView.helpers({
        allNewses: function () {
            return Newses.find({}, {
                sort: {
                    createdAt: -1
                }
            })
        },
        isOwner: function () {
            return this.owner === Meteor.userId();
        }
    });

    Template.NewsView.gestures({
        'swipeleft .myItem': function (e, t) {
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
        'swiperight .myItem': function (e, t) {
            e.preventDefault();
            var currentUserId = Meteor.user().userId
            if (Newses.find({
                    $or: [{
                        votedFor: currentUserId
                    }, {
                        votedAgainst: currentUserId
                    }]
                }).count() == 0) {

            }
            console.log("Swipe right!");
        }
    });
}
