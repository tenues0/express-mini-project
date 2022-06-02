const diagnostics = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET Route for retrieving diagnostic information
diagnostics.get('/api/diagnostics', (req, res) => {
  // TODO: Logic for sending all the content of db/diagnostics.json
  console.info(`${req.method} request received for diagnostic information`);
  readFromFile('db/diagnostics.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a error logging
diagnostics.post('/api/diagnostics', (req, res) => {
  // TODO: Logic for appending data to the db/diagnostics.json file
    // Log that a POST request was received
    console.info(`${req.method} request received to submit feedback`);

    // Destructuring assignment for the items in req.body
    const { email, feedbackType, feedback } = req.body;
  
    // If all the required properties are present
    if (email && feedbackType && feedback) {
      // Variable for the object we will save
      const newFeedback = {
        email,
        feedbackType,
        feedback,
        feedback_id: uuid(),
      };
  
      readAndAppend(newFeedback, './db/feedback.json');
  
      const response = {
        status: 'success',
        body: newFeedback,
      };
  
      res.json(response);
    } else {
      res.json('Error in posting feedback');
    }
});

module.exports = diagnostics;
