const connection = require("./connection");
const express = require("express");
const bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json());

// to get all data
app.get("/blog", (req, res) => {
  connection.query("SELECT *FROM blogs", (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      // console.log(rows);
      res.send(rows);
    }
  });
});

//to get only one data
app.get("/blog/:id", (req, res) => {
  connection.query(
    "SELECT *FROM blogs WHERE id=?",
    [req.params.id],
    (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(rows);
        res.send(rows);
      }
    }
  );
});
// for delete any data
app.delete("/blog/:id", (req, res) => {
  connection.query(
    "DELETE FROM blogs WHERE id=?",
    [req.params.id],
    (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(rows);
        res.send(rows);
      }
    }
  );
});

//to post any new data
app.post("/blog", (req, res) => {
  var bg = req.body;
  var blogdata = [bg.name, bg.content];
  connection.query(
    "INSERT INTO blogs (name,content) values(?)",
    [blogdata],
    (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(rows);
        res.send(rows);
      }
    }
  );
});
//patch
app.patch("/blog", (req, res) => {
  var bg = req.body;
  connection.query(
    "UPDATE blogs SET ? WHERE id=" + bg.id,
    [bg],
    (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(rows);
        res.send(rows);
      }
    }
  );
});
//put
app.put("/blog", (req, res) => {
  var bg = req.body;
  connection.query(
    "UPDATE blogs SET ? WHERE id=" + bg.id,
    [bg],
    (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        if (rows.affectedRows == 0) {
          var bg = req.body;
          var blogdata = [bg.name, bg.content];
          connection.query(
            "INSERT INTO blogs (name,content) values(?)",
            [blogdata],
            (err, rows) => {
              if (err) {
                console.log(err);
              } else {
                // console.log(rows);
                res.send(rows);
              }
            }
          );
        } else {
          res.send(rows);
        }
      }
    }
  );
});

app.listen(5000, () => console.log("Server is running"));
