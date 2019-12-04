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
 * Deletes a searchHistory by Id.
 * @param id string - ObjectId
 * @returns
*/
async function remove(id) {
    try {
        const searchHistory = await SearchHistory.deleteOne({
            '_id': id
        });
        return searchHistory;
    } catch(error) {
        console.log(error);
        return error;
    }
}

module.exports = {
    create,
    remove,
};
