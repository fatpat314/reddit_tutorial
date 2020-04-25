
const Post = require('../models/posts.js');
module.exports = (app) => {
    app.get('/', (req, res) => {
        var currentUser = req.user;

        Post.find({}).lean()
        .then (posts => {
            res.render("posts-index", { posts, currentUser });
        })
        .catch(err => {
            console.log(err.message);
        });
        // });

    app.get('/post/new', (req, res) => {
        // var currentUser = req.user;
        res.render('posts-new');
            });
  // CREATE
  app.post("/posts/new", (req, res) => {
      if (req.user) {
          var post = new Post(req.body);

          post.save(function(err, post) {
              return res.redirect(`/`);
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
    });
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
