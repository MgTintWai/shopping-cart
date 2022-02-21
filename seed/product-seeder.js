// var Product = require('../models/product');
// var mongoose = require('mongoose');

// mongoose.connect('mongodb+srv://admin:admin123@cluster0.rq7vb.mongodb.net/shop');

// var products = [
//     new Product({
//         imagePath: 'https://www.newgamesbox.net/wp-content/uploads/2016/10/Gothic-1-PC-Game-Free-Download.jpg',
//         title: 'Gothic Game !!!',
//         description: 'Awesome Game',
//         price: '$10'
//     }),
//     new Product({
//         imagePath: 'https://www.newgamesbox.net/wp-content/uploads/2016/10/Gothic-1-PC-Game-Free-Download.jpg',
//         title: 'Gothic Game !!!',
//         description: 'Awesome Game',
//         price: '$10'
//     }),
//     new Product({
//         imagePath: 'https://www.newgamesbox.net/wp-content/uploads/2016/10/Gothic-1-PC-Game-Free-Download.jpg',
//         title: 'Gothic Game !!!',
//         description: 'Awesome Game',
//         price: '$10'
//     }),
//     new Product({
//         imagePath: 'https://www.newgamesbox.net/wp-content/uploads/2016/10/Gothic-1-PC-Game-Free-Download.jpg',
//         title: 'Gothic Game !!!',
//         description: 'Awesome Game',
//         price: '$10'
//     })
// ];

// var done = 0;
// for (var i = 0; i < products.length; i++) {
//     products[i].save(function(err, result) {
//         done++;
//         if (done === products.length) {
//             exit();
//         }
//     });
// }

// function exit() {
//     mongoose.disconnect();
// }