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

    Template.NewsView.events({
        'click .myItem': function (event, template) {
            var key = event.target.children[1].value;
            Session.set('storedValue', key);
            Router.go('/NewsDetails/'+key);
        }
    });
    
    Template.NewsView.gestures({
        'swipeleft .swipeitem': function (e, t) {
            e.preventDefault();
            if(Meteor.userId() != null) {
                if(Newses.find({$or: [{votedFor: Meteor.userId()}, {votedAgainst: Meteor.userId()}]}).count()==0)
                {
                    var key = e.target.children[0].value
                    Newses.update({ _id: key },{ $push: { votedAgainst: Meteor.userId() }});
                    console.log("You voted against!");
                }
                else {console.log("You have voted already!");}
            }
        },
        'swiperight .swipeitem': function (e, t) {
            e.preventDefault();
            if(Meteor.userId() != null) {
                var key = e.target.children[0].value;
                console.log(e.target);
                console.log(key);
                console.log(Meteor.userId());
                console.log(Newses.find({$or: [{votedFor: Meteor.userId()}, {votedAgainst: Meteor.userId()}]}).count());
                var keys = Newses.find({_id: key});
                var vfor = keys.votedFor;
                var vagainst = keys.votedAgainst;
                console.log(vfor.count);
                console.log(vagainst.count);
                var vforContains = false;
                if(!(vfor === null || typeof vfor === 'undefined') && indexOf.call(vfor,key)>-1)
                {
                    console.log("vforContains");
                    vforContains = true;
                }
                var vagainstContains = false;
                if(!(vagainst === null || typeof vagainst === 'undefined') && indexOf.call(vagainst, key)>-1)
                {
                    console.log("vagainstContains");
                    vagainstContains = true;
                }
                console.log(vforContains);
                console.log(vagainstContains);
                console.log(vforContains || vagainstContains);
                if(!(vforContains || vagainstContains))
                {
                    Newses.update({ _id: key },{ $push: { votedFor: Meteor.userId() }});
                    console.log("You voted for!");
                }
                else {console.log("You have voted already!");}
            }
        }
    });

    var indexOf = function(needle) {
        if(this === null) return -1;
        if(typeof this === 'undefined') return -1;
        if(typeof Array.prototype.indexOf === 'function') {
            indexOf = Array.prototype.indexOf;
        } else {
            indexOf = function(needle) {
                var i = -1, index = -1;
                for(i = 0; i < this.length; i++) {
                    if(this[i] === needle) {
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
