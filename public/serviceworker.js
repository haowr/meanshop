importScripts('/cache-polyfill.js');
self.addEventListener('install', function(e) {
e.waitUntil(
caches.open('airhorner').then(function(cache) {
return cache.addAll([
'/',
'/home'
/*
'/index.html',
'/index.html?homescreen=1',
'/?homescreen=1',
'/css/styleindex.css',
'/css/style.css',
'/css/bootstrap.css',
'/css/main.css',
'/js/angular-animate.js',
'/js/angular-animate.min.js',
'/js/angular-route.js',
'/js/angular.js',
'/js/angular.min.js',
'/js/app.js',
'/js/bootstrap.js',
'/js/bootstrap.min.js',
'/js/directive.js',
'/js/directives.js',
'/js/ng-infinite-scroll.js',
'/js/ng-infinite-scroll.min.js',
'/js/nginfiniteScroll.js',
'/js/npm.js',
'/js/routes.js',
*/
]);
})
);
});
self.addEventListener('fetch', function(e) {
console.log(e.request.url);
});