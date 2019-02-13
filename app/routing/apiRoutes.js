const friendsList = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friendsList);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body parsing middleware
    let newFriendScores = req.body.scores;
    let scoresArray = [];
    // const friendCount = 0;
    let bestMatch = 0;

    //iterates through all current friends in friendsList
    for (let i = 0; i < friendsList.length; i++) {
      let totalDifference = 0;
      //iterate through scores to compare friends
      for ( let j = 0; j < newFriendScores.length; j++) {
        totalDifference += (Math.abs(parseInt(friendsList[i].scores[j]) - parseInt(newFriendScores[j])));
      }

      //pushes results into scoresArray
      scoresArray.push(totalDifference);
    }
   
    //find best match after all friends are compared
    for (let i = 0; i < scoresArray.length; i++) {
      if (scoresArray[i] <= scoresArray[bestMatch]) {
        bestMatch = i;
      }
    }
    
    //push new submission into friendList Array
    friendsList.push(req.body);
    
    //return bestMatch data
    const newBuddy = friendsList[bestMatch];
    res.json(newBuddy);

    
  });
};

  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  // app.post("/api/clear", function(req, res) {
  //   // Empty out the arrays of data
  //   tableData.length = [];
  //   waitListData.length = [];

  //   res.json({ ok: true });
  // });

