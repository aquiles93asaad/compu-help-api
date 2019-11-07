const Question = require('../models/question.model');

/**
 * Creates a Question.
 * @param question Question
 * @returns Question
*/
async function create(question) {
    try {
        const createdQuestion = await Question(question).save();
        return createdQuestion;
    } catch(error) {
        console.log(error);
        return error;
    }
}

/**
 * Get a question by Id.
 * @param id string - ObjectId
 * @returns Question
*/
async function get(id) {
    try {
        const question = await Question.findOne({
            '_id': id
        });
        return question;
    } catch(error) {
        console.log(error);
        return error;
    }
}

/**
 * Updates a question data and returns the updated question
 * @param question Question
 * @returns Question
*/
async function update(question) {
    try {
        const updatedQuestion = await Question.findOneAndUpdate(
            { _id: question._id },
            question,
            { new: true }
        );
        return updatedQuestion;
    } catch(error) {
        console.log(error);
        return error;
    }
}

/**
 * searches for questions filtered by the filters sent.
 * @param filters object
 * @returns Array of Question
*/
async function search(filters) {
    try {
        const questions = await Question.find(filters); 
        return questions;
    } catch (error) {
        console.log(error);
        return error;
    }
}

module.exports = {
    create,
    get,
    update,
    search,
};
