/**
 * Created by dabler on 11/04/15.
 */
Router.configure({
    layoutTemplate:'layout'
});
Router.map(function(){
    this.route('NewsView', {path:'/'});
    this.route('AddNewsView', {path:'/AddNewsView'});
    this.route('login', {path:'/login'});
})
