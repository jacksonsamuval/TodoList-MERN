const todo = require("../model/todo");

const createTodo = async (req, res) => {
    const { message} = req.body;    

    if(req.body.message === ""){
        return res.status(400).json({message: "Message Cannot be empty"});
    }

    if(!message || message.length < 4 || message.length > 20){
        return res
            .status(400)
            .json({message: "Message must be between 4 and 20 characters"});
    }

    try {
        const addTodo = await todo.create({message});
        res.status(201).json({success: "created", date :addTodo});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error"});
    }
};

const getAllTodo = async (req, res) => {
    try {
        const getToDo = await todo.find({});
        res.status(200).json({data: getToDo});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal Server Error"});
    }
};

const deleteTodo = async (req, res) => {
    try {
        const deleted = await todo.findByIdAndDelete(req.params.id);
        res.status(200).json({success: "deleted", data: deleted});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error"});
    }
};

const updateTodo = async (req, res) => {
    try {
        const updatedTodo = await todo.findByIdAndUpdate(
            req.params.id,
            {
                message: req.body.message,
            }, 
            {
                new: true
            }
        );
        if(updatedTodo){
            res.status(200).json({success: "updated", data: updatedTodo});
        }
        else {
            res.status(404).json({error: "Todo Not Found"});
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

// {new : true} is used to return the updated document instead of old document.

module.exports = {
    createTodo,
    getAllTodo,
    deleteTodo,
    updateTodo
};

