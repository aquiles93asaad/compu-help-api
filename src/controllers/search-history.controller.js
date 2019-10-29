const SearchHistory = require('../models/search-history.model');

/**
 * Creates a SearchHistory.
 * @param searchHistory SearchHistory
 * @returns SearchHistory
*/
async function create(searchHistory) {
    try {
        const createdSearchHistory = await SearchHistory(searchHistory).save();
        return createdSearchHistory;
    } catch(error) {
        console.log(error);
        return error;
    }
}

/**
 * Get a searchHistory by Id.
 * @param id string - ObjectId
 * @returns SearchHistory
*/
async function get(id) {
    try {
        const searchHistory = await SearchHistory.findOne({
            '_id': id
        });
        return searchHistory;
    } catch(error) {
        console.log(error);
        return error;
    }
}

/**
 * Updates a searchHistory data and returns the updated searchHistory
 * @param searchHistory SearchHistory
 * @returns SearchHistory
*/
async function update(searchHistory) {
    try {
        const updatedSearchHistory = await SearchHistory.findOneAndUpdate(
            { _id: searchHistory._id },
            searchHistory,
            { new: true }
        );
        return updatedSearchHistory;
    } catch(error) {
        console.log(error);
        return error;
    }
}

module.exports = {
    create,
    get,
    update,
};
