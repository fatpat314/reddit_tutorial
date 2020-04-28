module.exports = function(app) {



    const Post = require('../models/posts.js');
    const Comment = require('../models/comment.js');

    // CREATE Comment
    app.post("/posts/:postsId/comments", function(req, res) {
      // INSTANTIATE INSTANCE OF MODEL
      const comment = new Comment(req.body);
      var currentUser = req.user;

      // SAVE INSTANCE OF Comment MODEL TO DB
      comment
        .save()
        .then(comment => {
          return Post.findById(req.params.postId);
        })
        .then(post => {
          post.comments.unshift(comment, currentUser);
          return post.save();
        })
        .then(post => {
          res.redirect(`/`);
        })
        .catch(err => {
          console.log(err);
        });
    });

};
