const mongoose = require('mongoose');

const toDoSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 20
    }
});

const Todo = mongoose.model('todo', toDoSchema);
module.exports = Todo;