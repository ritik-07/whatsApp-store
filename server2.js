
import express from "express";
import path from "path";
import bodyParser from "body-Parser";

const app = express();

const router = express.Router();

const __dirname = path.resolve();

//app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "uploads")));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
 // used to get posted date on page 

app.get("/about", (req, res) => {
     res.send("<h1>about page</h1>")
 // res.sendFile(__dirname + "/public/index.html");
      res.redirect("/contact");
});

app.post("/about", function (req, res) {
  console.log(req.body);
  res.json(req.body);
    res.redirect('/');
});

app.get("/about/contact", (req, res) => {
    res.send("<h1>contact page</h1>");
  //   res.redirect('/about')
});

app.get("/", (req, res) => {

  res.send("<h1>home page</h1>");

});

app.get("/contact", (req, res) => {
  res.send("<h1>contact /contact vala  page</h1>");
});

app.listen(3000, console.log("server started "));




