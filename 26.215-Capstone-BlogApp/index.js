import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const posts = [];

app.get("/", (req, res) => {
  res.render("index.ejs", {
    posts
  });
});

app.get("/create", (req, res) => {
  res.render("create.ejs");
});

app.post("/create", (req, res) => {
  // Assign a random ID each time a post is made
  const postID = Math.floor(Math.random() * 100) + 1;

  const postTitle = req.body.articleTitle;
  const postContent = req.body.articleBody;

  const pubDate = new Date();
  const pubDateString = pubDate.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  const postObj = {
    id: postID,
    title: postTitle,
    content: postContent,
    date: pubDateString
  };
  posts.push(postObj);
  console.log(postObj);
  res.redirect('/');
});


app.get("/post/:postID", (req, res) => {
  let postTitle = req.params.postID;
  let pubDate = '';
  let date = '';
  let postContent = '';
  let title = '';
  let content = '';
  let postID = req.params.postID;

  posts.forEach((post) => {
    postID = post.id,
    title = post.title,
    date = post.date,
    content = post.content
  });

  res.render("post.ejs", {
      postID,
      title,
      date,
      content
  })

});

app.get("/edit/:postID", (req, res) => {
  //res.send("Edit route hit for post ID: " + req.params.postID);
  let postID = req.params.postID;
  let post = posts.find(p => p.id.toString() === postID);

  if (post) {
    res.render("edit.ejs", { post });
  } else {
    res.status(404).send("Post not found");
  }
});

app.post("/edit/:postID", (req, res) => {
  let postID = req.params.postID;
  let updatedTitle = req.body.articleTitle;
  let updatedContent = req.body.articleBody;

  let post = posts.find(p => p.id.toString() === postID);
  if (post) {
    post.title = updatedTitle;
    post.content = updatedContent;
  }

  res.redirect(`/post/${postID}`);
});


app.post("/delete/:postID", (req, res) => {
  let postID = req.params.postID;
  let index = posts.findIndex(p => p.id.toString() === postID);

  if (index !== -1) {
    posts.splice(index, 1);
  }

  res.redirect("/");
});


app.listen(port, () => {
  console.log("Listening on port " + port);
});
