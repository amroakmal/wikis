//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true});

const articleSchema = {
    title: String,
    content: String
}

const Article = mongoose.model("Article", articleSchema);

app.route("/articles")
    .get(function(req, res) {
        Article.find(function(err, foundArticles) {
        if(err) {
            console.log("Error occured!");
            res.send(err);
        }
        else {  
            res.send(foundArticles);
        }
        });
    })
    .post(function(req, res) {
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });
        newArticle.save(function(err) {
            if(err) {
                console.log("Error occured!");
                res.send(err);
            }
        });
    })
    .delete(function(req, res) {
        Article.deleteMany(function(err) {
            if(err) {
                console.log("Error occured!");
                res.send(err);
            }
            else {
                res.send("Success!");
            }
        });
    })

app.listen(3000, function() {

});