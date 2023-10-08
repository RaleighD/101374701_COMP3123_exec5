const express = require('express');
const app = express();
const router = express.Router();
const fs = require('fs');

// Create a new HTML file named home.html
// Add an <h1> tag with the message "Welcome to ExpressJs Tutorial"
// Return home.html page to the client
router.get('/home', (req, res) => {
  const htmlContent = '<h1>Welcome to ExpressJs Tutorial</h1>';
  res.send(htmlContent);
});

// Return all details from user.json file to the client as JSON format
router.get('/profile', (req, res) => {
  fs.readFile('user.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading user.json');
      return;
    }

    const userData = JSON.parse(data);

    res.json(userData);
  });
});

// Modify /login route to accept username and password as query string parameters
router.get('/login', (req, res) => {
  const { username, password } = req.query;

  // Read data from user.json file
  fs.readFile('user.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading user.json');
      return;
    }

    // Parse the JSON data
    const userData = JSON.parse(data);

    // Check if the username and password are valid
    if (userData.username === username && userData.password === password) {
      res.json({
        status: true,
        message: 'User is valid',
      });
    } else if (userData.username !== username) {
      res.json({
        status: false,
        message: 'Username is invalid',
      });
    } else if (userData.password !== password) {
      res.json({
        status: false,
        message: 'Password is invalid',
      });
    }
  });
});

// Modify /logout route to accept username as a parameter and display a message
router.get('/logout/:username', (req, res) => {
  const { username } = req.params;
  const message = `<b>${username} successfully logged out.</b>`;
  res.send(message);
});

app.use('/', router);

app.listen(process.env.PORT || 8081, () => {
  console.log('Web Server is listening at port ' + (process.env.PORT || 8081));
});
