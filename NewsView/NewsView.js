/**
 * Created by dabler on 11/04/15.
 */


if (Meteor.isClient) {
    Handlebars.registerHelper('getPhoto', function () {
        var ph = Photos.findOne(this.photo);
        if (ph) {
            return ph.url();
        } else {
            return "Images/lublin" + Math.round(Math.random() * 2 + 1) + ".jpg";
        }
    });

    Handlebars.registerHelper('getVotes', function () {
        var c = this.votedFor.length - this.votedAgainst.length;
        if (c === "NaN") {
            return 0;
        } else {
            return c;
        }
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
        'swipeleft .swipeitem': function (e, t) {
            if (Meteor.userId() != null) {
                var newsKey = e.target.children[0].value;
                var voteValid = checkVote(false, newsKey);
                console.log("voteValid: " + voteValid);
                if (voteValid) {
                    Newses.update({
                        _id: newsKey
                    }, {
                        $push: {
                            votedFor: Meteor.userId()
                        }
                    });
                }
            }
        },
        'swiperight .swipeitem': function (e, t) {
            e.preventDefault();
            if (Meteor.userId() != null) {
                var newsKey = e.target.children[0].value;
                var voteValid = checkVote(true, newsKey);
                console.log("voteValid: " + voteValid);
                if (voteValid) {
                    Newses.update({
                        _id: newsKey
                    }, {
                        $push: {
                            votedFor: Meteor.userId()
                        }
                    });
                }
            }
        }
    });

    function checkVote(isFor, newsKey) {
        console.log("newsKey: " + newsKey);
        console.log("userId: " + Meteor.userId());


        var news = Newses.findOne(newsKey);

        console.log("news: ");
        console.log(news);

        var vfor = news.votedFor;
        var vagainst = news.votedAgainst;

        console.log("for: " + vfor);
        console.log("against: " + vagainst);

        var vforContains = vfor.indexOf(Meteor.userId()) !== -1;
        var vagainstContains = vagainst.indexOf(Meteor.userId()) !== -1;

        console.log("isFor: " + isFor);
        console.log("vforContains: " + vforContains);
        console.log("vagainstContains: " + vagainstContains);


        if (isFor && vforContains) {
            return false;
        } else if (!isFor && vagainstContains) {
            return false;
        } else {
            return true;
        }
    };

    var indexOf = function (needle) {
        if (this === null) return -1;
        if (typeof this === 'undefined') return -1;
        if (typeof Array.prototype.indexOf === 'function') {
            indexOf = Array.prototype.indexOf;
        } else {
            indexOf = function (needle) {
                var i = -1,
                    index = -1;
                for (i = 0; i < this.length; i++) {
                    if (this[i] === needle) {
                        index = i;
                        break;
                    }
                }

                return index;
            };
        }

        return indexOf.call(this, needle);
    };
}
