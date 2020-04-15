
const Post = require('../models/posts.js');
module.exports = (app) => {
    app.get('/', (req, res) => {
        Post.find({}).lean()
        .then (posts => {
            res.render("posts-index", { posts });
        })
        .catch(err => {
            console.log(err.message);
        });
        // });

    app.get('/post/new', (req, res) => {
        res.render('posts-new');
            });
  // CREATE
    app.post("/post/new", (req, res) => {
                //INSTANTIATE INSTANCE OF POST MODEL
        const post = new Post(req.body);



    // SAVE INSTANCE OF POST MODEL TO DB
        post.save((err, post) => {
            // REDIRECT TO THE ROOT
            return res.redirect('/');
        })
    })
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
