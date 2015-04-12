/**
 * Created by dabler on 11/04/15.
 */


if (Meteor.isClient) {
    Handlebars.registerHelper('getPhoto', function () {
        var ph = Photos.findOne(this.photo);
        return ph.url();
    });

    Template.registerHelper('formatDate', function (date) {
        return moment(date).format('hh:mm, DD-MM-YYYY');
    });

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

//    Template.NewsView.events({
//        'click .myItem': function (event, template) {
//            var newsId = e.target.children[0].value;
//            
//        },
//    });
    
    Template.NewsView.gestures({
        'swipeleft .myItem': function (e, t) {
            e.preventDefault();
            if (Meteor.userId() != null) {
                if (Newses.find({
                        $or: [{
                            votedFor: Meteor.userId()
                        }, {
                            votedAgainst: Meteor.userId()
                        }]
                    }).count() == 0) {
                    console.log(e.target.children[0].value);
                    //Newses.update({ _id: id },{ $push: { votedAgainst: id }});
                }
            }
            console.log("Swipe left!");
        },
        'swiperight .myItem': function (e, t) {
            e.preventDefault();
            var currentUserId = Meteor.user().userId;
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