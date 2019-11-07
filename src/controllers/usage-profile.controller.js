const UsageProfile = require('../models/usage-profile.model');

/**
 * Creates a UsageProfile.
 * @param usageProfile UsageProfile
 * @returns UsageProfile
*/
async function create(usageProfile) {
    try {
        const createdUsageProfile = await UsageProfile(usageProfile).save();
        return createdUsageProfile;
    } catch(error) {
        console.log(error);
        return error;
    }
}

/**
 * Get a usageProfile by Id.
 * @param id string - ObjectId
 * @returns UsageProfile
*/
async function get(id) {
    try {
        const usageProfile = await UsageProfile.findOne({
            '_id': id
        }).populate('questions');
        return usageProfile;
    } catch(error) {
        console.log(error);
        return error;
    }
}

/**
 * Updates a usageProfile data and returns the updated usageProfile
 * @param usageProfile UsageProfile
 * @returns UsageProfile
*/
async function update(usageProfile) {
    try {
        const updatedUsageProfile = await UsageProfile.findOneAndUpdate(
            { _id: usageProfile._id },
            usageProfile,
            { new: true }
        );
        return updatedUsageProfile;
    } catch(error) {
        console.log(error);
        return error;
    }
}

/**
 * searches for usageProfiles filtered by the filters sent.
 * @param filters object
 * @returns Array of UsageProfile
*/
async function search(filters) {
    try {
        const usageProfiles = await UsageProfile.find(filters).populate('questions');
        return usageProfiles;
    } catch(error) {
        console.log(error);
        return error;
    }
}

module.exports = {
    create,
    get,
    update,
    search
};
