const app = require('./app.js');
const connectDB = require('./config/db.js');

connectDB();

app.get('/api/health', (req, res) => {
  res.status(400).json({
        "success" : true,
        "message" : "Server health is good"
    });
})