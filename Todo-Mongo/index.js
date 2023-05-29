const express = require("express");
const mongoose = require("mongoose")
const cors=require("cors");

const app = express();

app.use(cors());
app.use(express.json({ extented: true }));

app.use('/api/auth', require('./routes/auth-route'))
app.use('/api/todo', require('./routes/todo-route'))

mongoose
    .connect('mongodb+srv://admin:wwwwww@cluster0.plkhwvg.mongodb.net/todo?retryWrites=true&w=majority')
    .then(() => console.log("DB ok"))
    .catch(() => console.log("DB Error"))

const PORT = 5000; 

app.listen(PORT, () => {
    console.log(`Server started on Port ${PORT}`)
})