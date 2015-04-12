if (Meteor.isClient) {
    //    Template.login.events({
    //        "submit #login-form": function (event, template) {
    //            event.preventDefault();
    //            console.log("logtry");
    //            Meteor.loginWithPassword(
    //                template.find("#login-username").value,
    //                template.find("#login-password").value,
    //                function (error) {
    //                    if (error) {
    //                        console.log("error");
    //                        alert("error");
    //                    } else {
    //                        console.log("go");
    //                        Router.go('./');
    //                    }
    //                }
    //
    //            );
    //            return false;
    //        }
    //    });

    Template.login.events({
            'submit #login-form': function (event, template) {
                event.preventDefault();
                var emailVar = template.find('#login-username').value;
                var passwordVar = template.find('#login-password').value;
                console.log("Form submitted.");
                Meteor.loginWithPassword(emailVar, passwordVar, function (error) {
                        if (error) {
                            console.log("error");
                        } else {
                            Router.go('/');
                        }
                    }
                );
                return false;
        }

    });
}