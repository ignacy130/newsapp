if (Meteor.isClient) {
    Template.AddNewsView.helpers({
        allNewses: function () {
            return Newses.find({});
        },

        bullets: function () {
            var bs = [1, 2, 3, 4, 5, 6];
            return bs;
        }
    });

    Template.AddNewsView.events({
        'change #addPhoto': function (event, template) {
            FS.Utility.eachFile(event, function (file) {
                Photos.insert(file, function (err, fileObj) {
                    // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
                });
            });
        },

        "submit #addNews": function (event) {
            // This function is called when the new task form is submitted
            var file = event.target.photo.files[0];
            var photo = Photos.insert(file);

            var text = event.target.text.value;
            var b1 = event.target.b1.value;
            var b2 = event.target.b2.value;
            var b3 = event.target.b3.value;
            var b4 = event.target.b4.value;
            var b5 = event.target.b5.value;
            var b6 = event.target.b6.value;
            var bullets = [b1, b2, b3, b4, b5, b6];


            Meteor.call("addNews", text, photo._id, bullets);

            // Clear form
            event.target.text.value = "";

            // Prevent default form submit
            return false;
        }
    });
}