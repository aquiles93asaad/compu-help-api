const Computer = require('../models/computer.model');

/**
 * Creates a Computer.
 * @param computer Computer
 * @returns Computer
*/
async function create(computer) {
    try {

        computer.scores = getScoring(computer);
        const createdComputer = await Computer(computer).save();
        return createdComputer;
    } catch (error) {
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
    } catch (error) {
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
    } catch (error) {
        console.log(error);
        return error;
    }
}




/**
 * Generate computer's score based on the full specification.
 * @param computer
 * @returns scores
*/
function getScoring(computer) {
    try {
        const scores = {};
        scores.processorScore = getProcessorScoring(computer.specifications.processor, computer.computerType.toUpperCase());
        scores.ramScore = getRamScoring(computer.specifications.memory, computer.computerType.toUpperCase());
        scores.storageScore = getStorageScoring(computer.specifications.storage, computer.computerType.toUpperCase());
        scores.graphicsCardScore = getGraphicsCardScoring(computer.specifications.graphicsCard, computer.computerType.toUpperCase());
        console.log(scores);
        return scores;
    } catch (error) {
        console.log(error);
        return error;
    }
}



/**
 * It generates processor scoring based on the processor's specification.
 * @param processorSpecs
 * @param computerType
 * @returns Processor Scoring
*/
function getProcessorScoring(processorSpecs, computerType) {
    try {
        let score = 0;
        let aux = 0;
        switch (computerType) {

            //It calculates processor scoring for PC category.
            case "PC":

                //It calculates scoring based on brand.
                switch (processorSpecs.brand.toUpperCase()) {
                    case "INTEL":
                        score += 20;
                        break;
                    case "AMD":
                        score += 15;
                        break;
                }

                //It calculates scoring based on processor's rate (Ghz).
                aux = processorSpecs.rate;
                switch (true) {
                    case aux <= 2.8:
                        score += 5;
                        break;
                    case aux <= 3.5:
                        score += 10;
                        break;
                    case aux <= 3.6:
                        score += 15;
                        break;
                    case aux <= 3.7:
                        score += 20;
                        break;
                    case aux <= 3.8:
                        score += 25;
                        break;
                }

                //It calculates scoring based on processor's cores.
                aux = processorSpecs.cores;
                switch (true) {
                    case aux == 2:
                        score += 5;
                        break;
                    case aux == 4:
                        score += 10;
                        break;
                    case aux == 6:
                        score += 15;
                        break;
                }

                //It calculates scoring based on processor's cache memory (MB).
                aux = processorSpecs.cache;
                switch (true) {
                    case aux == 1:
                        score += 2;
                        break;
                    case aux == 2:
                        score += 3;
                        break;
                    case aux == 3:
                        score += 4;
                        break;
                    case aux == 4:
                        score += 5;
                        break;
                    case aux <= 8:
                        score += 7;
                        break;
                    case aux <= 12:
                        score += 10;
                        break;
                }

                break;

            //It calculates processor scoring for 'NOTEBOOK' category.
            case "NOTEBOOK":

                break;
        }

        return score;
    } catch (error) {
        console.log(error);
        return error;
    }
}



/**
 * It generates ram scoring based on the ram's specification.
 * @param ramSpecs
 * @param computerType
 * @returns Ram Scoring
*/
function getRamScoring(ramSpecs, computerType) {
    try {
        let score = 0;
        let aux = 0;
        switch (computerType) {

            //It calculates ram scoring for 'PC' category.
            case "PC":

                //It calculates scoring based on ram's memory (GB).
                score += ramSpecs.ram / 2;

                //It calculates scoring based on ram's types.
                switch (ramSpecs.ramType.toUpperCase()) {
                    case 'DDR2':
                        score += 5;
                        break;
                    case 'DDR3':
                        score += 15;
                        break;
                    case 'DDR4':
                        score += 30;
                        break;
                    case 'DDR5':
                        score += 40;
                        break;
                }

                //It calculates scoring based on ram's speed (MHz).
                aux = ramSpecs.speed;
                switch (true) {
                    case aux <= 1600:
                        score += 2;
                        break;
                    case aux <= 2133:
                        score += 5;
                        break;
                    case aux <= 2400:
                        score += 10;
                        break;
                    case aux <= 3000:
                        score += 17;
                        break;
                    case aux <= 3200:
                        score += 20;
                        break;
                    case aux <= 4000:
                        score += 35;
                        break;
                    case aux > 4000:
                        score += 40;
                        break;
                }

                break;

            //It calculates scoring for 'NOTEBOOK' category.
            case "NOTEBOOK":

                break;
        }

        return score;
    } catch (error) {
        console.log(error);
        return error;
    }
}



/**
 * It generates storage scoring based on the storage's specification.
 * @param storageSpecs
 * @param computerType
 * @returns Storage Scoring
*/
function getStorageScoring(storageSpecs, computerType) {
    try {
        let score = 0;
        let aux = 0;
        switch (computerType) {

            //It calculates scoring for 'PC' category.
            case "PC":
                break;

            //It calculates scoring for 'NOTEBOOK' category.
            case "NOTEBOOK":
                break;
        }

        return score;
    } catch (error) {
        console.log(error);
        return error;
    }
}



/**
 * It generates graphics card scoring based on the graphic card's specification.
 * @param graphicSpecs
 * @param computerType
 * @returns Graphic Card Scoring
*/
function getGraphicsCardScoring(graphicSpecs, computerType) {
    try {
        let score = 0;
        let aux = 0;
        switch (computerType) {

            //It calculates scoring for 'PC' category.
            case "PC":
                break;

            //It calculates scoring for 'NOTEBOOK' category.
            case "NOTEBOOK":
                break;
        }

        return score;
    } catch (error) {
        console.log(error);
        return error;
    }

}


module.exports = {
    create,
    get,
    update,
};
