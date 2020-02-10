// implement your API here
const express = require("express");
const server = express();
const cors = require('cors')

server.use(express.json()); // needed for post
server.use(cors());

const Database = require("./data/db");

// server.use('/', (req, res) => {
//     res.send('hello from express')
// });

server.get("/", (req, res) => {
  res.json({ hello: "Web 26" });
});

server.get("/api/users", (req, res) => {
  Database.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({
          errorMessage: "The users information could not be retrieved."
        });
    });
});

server.get("/api/users/:id", (req, res) => {
  // const id =  req.params.id
  const { id } = req.params;

  Database.findById(id)
    .then(users => {
      if (users) {
        res.status(200).json(users);
      } else {
        res
          .status(404)
          .json({
            errorMessage: "The user with the specified ID does not exist."
          })
          .end();
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "The user information could not be retrieved." });
    });
});

server.post("/api/users", (req, res) => {
  // const id =  req.params.id
  const userInfo = req.body;

//   if (!userInfo.name || !userInfo.bio) {
//     res
//       .status(400)
//       .json({ errorMessage: "Please provide name and bio for the user." });
//   } else {
    Database.insert(userInfo)
      .then(users => {
        if (!userInfo.name || !userInfo.bio) {
            res
              .status(400)
              .json({ errorMessage: "Please provide name and bio for the user." });
          } else {
            console.log('this is fromi post',users)
            console.log('this is userinfo', userInfo)
        res.status(201).json(users);
      }})
      .catch(err => {
        console.log(err);
        res
          .status(500)
          .json({
            errorMessage:
              "There was an error while saving the user to the database"
          });
      });
  }
);

server.delete("/api/users/:id", (req, res) => {
  // const id =  req.params.id
  const { id } = req.params;

  Database.remove(id)
    .then(users => {
        if(users) {
            res.status(200).json(users);
        } else {
            res.status(404).json({  message: "The user with the specified ID does not exist."});
    }})
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "The user could not be removed"});
    });
});



server.put("/api/users/:id", (req, res) => {
  // const id =  req.params.id
  const { id } = req.params;
  const userInfo = req.body;

  if (!userInfo.name || !userInfo.bio ) {
    res.status(400).json({  errorMessage: "this user does not exist    Please provide name and bio for the user." })
  } else {

  Database.update(id, userInfo)
    .then(users => {
        if(users) {
      res.status(200).json(users);
        } else {
            res.status(404).json({  message: "The user with the specified ID does not exist."});  
        }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "The user information could not be modified." });
    });
}});

const port = 8888;
server.listen(port, () => console.log(`\n** API on port ${port} \n`));

// POST	/api/users	Creates a user using the information sent inside the request body.
// GET	/api/users	Returns an array of all the user objects contained in the database.
// GET	/api/users/:id	Returns the user object with the specified id.
// DELETE	/api/users/:id	Removes the user with the specified id and returns the deleted user.
// PUT	/api/users/:id	Updates the user with the specified id using data from the request body. Returns the modified document, NOT the original.
