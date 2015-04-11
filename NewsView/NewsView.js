/**
 * Created by dabler on 11/04/15.
 */
if (Meteor.isClient) {
    Template.NewsView.helpers({
        newses: [
            { image: "http://cdn.silodrome.com/wp-content/uploads/2013/01/Lamborghini-Miura-9.jpg", header: "Wojna na bliskim wschodzie." },
            { image: "/Users/dabler/Project/WWW/Meteor/NewsApp/Assets/11118427_832951006740441_1932364961_n.jpg", header: "Odkryto nowe złoża ropy na morzu północnym." },
            { image: "/Users/dabler/Project/WWW/Meteor/NewsApp/Assets/11118427_832951006740441_1932364961_n.jpg", header: "Rosja atakuje polskę" }
        ]
    });
}