const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); 
mongoose.connect('mongodb+srv://shanmukhduvvuri_db_user:JjDq4vDcSkasXNkx@cluster1.kgnz7q4.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error(err));
const studentSchema = new mongoose.Schema({
  username: String,
  roll: String,
  phone: String,
  gender: String,
});
const Student = mongoose.model('Student', studentSchema);
app.post('/api/students', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).send({ message: 'Student saved' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to save student' });
  }
});
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
