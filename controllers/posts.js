
const Post = require('../models/posts.js');
const User = require('../models/user.js');

module.exports = function (app) {
    app.get('/', (req, res) => {
        var currentUser = req.user;

        Post.find({}).lean()
            .then (posts => {
                res.render("posts-index", { posts, currentUser });
            })
            .catch(err => {
                console.log(err.message);
            });
        });

    app.get('/post/new', (req, res) => {
        // var currentUser = req.user;
        res.render('posts-new');
            });
  // CREATE
  // CREATE
      app.post("/posts/new", (req, res) => {
          if (req.user) {
              var post = new Post(req.body);
              post.author = req.user._id;

              post
                  .save()
                  .then(post => {
                      return User.findById(req.user._id);
                  })
                  .then(user => {
                      user.posts.unshift(post);
                      user.save();
                      // REDIRECT TO THE NEW POST
                      res.redirect(`/posts/${post._id}`);
                  })
                  .catch(err => {
                      console.log(err.message);
                  });
          } else {
              return res.status(401); // UNAUTHORIZED
          }
      });

    app.get("/posts/:id", function(req, res){
        //lood up the post
        // LOOK UP THE POST
        Post.findById(req.params.id).lean().populate('comments').then((post) => {
            res.render('posts-show', { post })
        }).catch((err) => {
            console.log(err.message)
        })

    });
    // });
    // SUBREDDIT
    app.get("/n/:subreddit", function(req, res) {
        Post.find({ subreddit: req.params.subreddit }).lean()
            .then(posts => {
                res.render("posts-index", { posts });
            })
            .catch(err => {
                console.log(err);
            });
    });
}
//
//     // app.get("/posts/:id", function(req, res){
//     //     //lood up the post
//     //     Post.findById(req.params.id)
//     //     .then(post => {
//     //         res.render("posts-show", {post});
//     //     })
//     //     .catch(err => {
//     //         console.log(err.message);
//     //     });
//     // });
// };
