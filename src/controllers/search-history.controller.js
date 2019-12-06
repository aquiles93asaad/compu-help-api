const SearchHistory = require('../models/search-history.model');
const UsageProfile = require('../models/usage-profile.model');

/**
 * Creates a SearchHistory.
 * @param searchHistory SearchHistory
 * @returns SearchHistory
*/
async function create(searchHistory) {
    try {
        const createdSearchHistory = await SearchHistory(searchHistory).save();
        console.log(createdSearchHistory);
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

/**
 * get a user serach history
 * @param id string - ObjectId
 * @returns
*/
async function getUserSearchHistory(userId) {
    try {
        const searchHistories = await SearchHistory.find({
            'user': userId
        }).populate({ path: 'usageProfiles', model: UsageProfile, select: 'name label description answers' });
        return searchHistories;
    } catch(error) {
        console.log(error);
        return error;
    }
}

module.exports = {
    create,
    remove,
    getUserSearchHistory,
};
