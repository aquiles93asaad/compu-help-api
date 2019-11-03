const Computer = require('../models/computer.model');

/**
 * Creates a Computer.
 * @param computer Computer
 * @returns Computer
*/
async function create(computer) {
    try {
        const createdComputer = await Computer(computer).save();
        return createdComputer;
    } catch(error) {
        console.log(error);
        return error;
    }
}

/**
 * Get a computer by Id.
 * @param id string - ObjectId
 * @returns Computer
*/
async function get(id) {
    try {
        const computer = await Computer.findOne({
            '_id': id
        });
        return computer;
    } catch(error) {
        console.log(error);
        return error;
    }
}

/**
 * Updates a computer data and returns the updated computer
 * @param computer Computer
 * @returns Computer
*/
async function update(computer) {
    try {
        const updatedComputer = await Computer.findOneAndUpdate(
            { _id: computer._id },
            computer,
            { new: true }
        );
        return updatedComputer;
    } catch(error) {
        console.log(error);
        return error;
    }
}

/**
 * Get all computers
 * @returns Array of Computer
*/
async function search() {
    try {
        const computers = await Computer.find({}); 
        return computers;
    } catch (error) {
        console.log(error);
        return error;
    }
}

/**
 * Get an array computers based on their scores
 * @param filters Filters
 * @returns Array of Computer
*/
async function searchByScore(filters) {
    try {
        const computers = await Computer.find(filters);
        return computers;
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
    searchByScore
};
