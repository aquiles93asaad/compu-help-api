const Computer = require('../models/computer.model');
const Question = require('../models/question.model');

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

async function searchFindQuestions(range) {
    try {
        const createdComputer = await Computer(computer).save();
        return createdComputer;
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
 * Get all computers
 * @returns Array of Computer
*/
async function search() {
    try {
        const computers = await Computer.find({}, '-specifications -scores');
        return computers;
    } catch (error) {
        console.log(error);
        return error;
    }
}

/**
 * Get an array of computers based on their scores
 * @param filters Filters
 * @returns Array of Computer
*/
async function searchByScore(answers) {
    try {
        var filters = {
            "processorMinScore": 0,
            "processorMaxScore": 0,
            "ramMinScore": 0,
            "ramMaxScore": 0,
            "storageMinScore": 0,
            "storageMaxScore": 0,
            "graphicsCardMinScore": 0,
            "graphicsCardMaxScore": 0
        };
        for (var i = 0; i < answers.length; i++) {
            filters = await updateFilters(filters, answers[i]);
        }
        //return getComputerByFilters(filters); prueba de concepto al filtro 
        //return getComputerByFiltersQuery(filters); version 1
        return getComputerByFiltersQueryMin(filters);//version por filtro.
    } catch (error) {
        console.log(error);
        return error;
    }
}


function updateFilters(filters, answer) {
    var fieldNames = Object.keys(answer);
    for (var i = 0; i < fieldNames.length; i++) {
        if (fieldNames[i] == "label" || fieldNames[i] == "value")
            continue;
        if (answer[fieldNames[i]] > filters[fieldNames[i]])
            filters[fieldNames[i]] = answer[fieldNames[i]];
    }
    return filters;
}

async function getComputerByFilters(filters) {
    const computers = {};
    const computersAux = await Computer.find({});
    var i = 0;
    computersAux.forEach(element => {
        if (JSON.stringify(element.scores) != '{}') {
            if (element.scores.processorScore >= filters.processorMinScore
                && element.scores.processorScore >= filters.processorMaxScore
                && element.scores.ramScore >= filters.ramMinScore
                && element.scores.ramScore >= filters.ramMaxScore
                && element.scores.storageScore >= filters.storageMinScore
                && element.scores.storageScore >= filters.storageMaxScore
                && element.scores.graphicsCardScore >= filters.graphicsCardMinScore
                && element.scores.graphicsCardScore >= filters.graphicsCardMaxScore) {
                computers[i] = element;
                i++;
            }
        }
    });
    return computers;
}

async function getComputerByFiltersQuery(filters) {
    const computers = await Computer.find({
        "scores.processorScore": { $gte: filters.processorMinScore },
        "scores.processorScore": { $lte: filters.processorMaxScore },
        "scores.ramScore": { $gte: filters.ramMinScore },
        "scores.ramScore": { $lte: filters.ramMaxScore },
        "scores.storageScore": { $gte: filters.storageMinScore },
        "scores.storageScore": { $lte: filters.storageMaxScore },
        "scores.graphicsCardScore": { $gte: filters.graphicsCardMinScore },
        "scores.graphicsCardScore": { $lte: filters.graphicsCardMaxScore }
    });
    return computers;
}
/**
 * busca la computadora que coumple con los requistos minimos y maximos.
 * @param computer
 * @returns scores
*/
async function getComputerByFiltersQueryMin(filters) {
    const computers = await Computer.find({
        "scores.processorScore": { $gte: filters.processorMinScore },
        "scores.ramScore": { $gte: filters.ramMinScore },
        "scores.storageScore": { $gte: filters.storageMinScore },
        "scores.graphicsCardScore": { $gte: filters.graphicsCardMinScore }},
        '-specifications -scores')
        .sort({ "scores.processorScore": 1, "scores.ramScore": 1, "scores.storageScore": 1, "scores.graphicsCardScore": 1 });
    return orderByComputerByPromedio(computers);
}
/**
 * Calcula y ordena las computadores por scores.
 * @param {array} computers 
 */
function orderByComputerByPromedio(computers){
    promedios = [];
    for (let index = 0; index < computers.length; index++) {
     const element = computers[index];
         var computerAvg = {"avg": 0,"computer": Computer}   
         computerAvg.avg =getAvg(element.scores) ;
         computerAvg.computer = element;
         promedios[index] = computerAvg;
     }
     computers = [];
     i = 0;
     orderByDesc(promedios).forEach(element => {     
         console.log("Promedios: " + element.avg + " computer: " +element.computer.name);
         computers[i] = element.computer;
         i++;
     });
     return computers;
}

/**
 * Ordena el array de promedios por score de computadoras.
 * @param {computerAvg} promedios 
 */
function orderByDesc(promedios){
    return promedios.sort(function(a, b){return b.avg-a.avg});
}
/**
 * Calcula el promedio de los score de  computadoras.
 * @param {Computer.scores} scores 
 */
function getAvg(scores){
    return ((scores.processorScore+scores.ramScore+scores.storageScore+scores.graphicsCardScore)/4)
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


        //It calculates scoring based on brand.
        switch (processorSpecs.brand.toUpperCase()) {
            case "INTEL":
                score += 20;
                break;
            case "AMD":
                score += 15;
                break;
        }

        //It calculates scoring based on processor's cores.
        aux = processorSpecs.cores;
        switch (true) {
            case aux <= 2:
                score += 5;
                break;
            case aux <= 4:
                score += 10;
                break;
            case aux <= 6:
                score += 15;
                break;
            case aux <= 8:
                score += 20;
                break;
            case aux > 8:
                score += 25;
                break;
        }

        //It calculates scoring based on processor's cache memory (MB).
        aux = processorSpecs.cache;
        switch (true) {
            case aux <= 1:
                score += 2;
                break;
            case aux <= 2:
                score += 3;
                break;
            case aux <= 3:
                score += 4;
                break;
            case aux <= 4:
                score += 5;
                break;
            case aux <= 8:
                score += 7;
                break;
            case aux <= 12:
                score += 10;
                break;
            case aux > 12:
                score += 15;
                break;
        }


        switch (computerType) {

            //It calculates processor scoring for PC category.
            case "PC":

                //It calculates scoring based on processor's rate (GHz).
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
                    case aux <= 4:
                        score += 30;
                        break;
                    case aux <= 4.2:
                        score += 35;
                        break;
                    case aux > 4.2:
                        score += 40;
                }

                break;

            //It calculates processor scoring for 'NOTEBOOK' category.
            case "NOTEBOOK":

                //It calculates scoring based on processor's rate (Ghz).
                aux = processorSpecs.rate;
                switch (true) {
                    case aux <= 1.1:
                        score += 5;
                        break;
                    case aux <= 1.2:
                        score += 7;
                        break;
                    case aux <= 1.3:
                        score += 10;
                        break;
                    case aux <= 1.4:
                        score += 14;
                        break;
                    case aux <= 1.5:
                        score += 15;
                        break;
                    case aux <= 1.6:
                        score += 16;
                        break;
                    case aux <= 1.8:
                        score += 18;
                        break;
                    case aux <= 2.1:
                        score += 21;
                        break;
                    case aux <= 2.2:
                        score += 22;
                        break;
                    case aux <= 2.3:
                        score += 23;
                        break;
                    case aux <= 2.6:
                        score += 25;
                        break;
                    case aux <= 3.4:
                        score += 30;
                        break;
                    case aux <= 3.6:
                        score += 33;
                        break;
                    case aux <= 4.5:
                        score += 35;
                        break;
                    case aux <= 4.6:
                        score += 37;
                        break;
                    case aux > 4.6:
                        score += 40;
                        break;
                }

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


        //It calculates scoring based on ram's memory (GB).
        score += ramSpecs.ram / 2;

        //It calculates scoring based on ram's types.
        switch (ramSpecs.ramType.toUpperCase()) {
            case 'DDR2':
                score += 5;
                break;
            case 'LPDDR2':
                score += 7;
                break;
            case 'LPDDR3':
                score += 12;
                break;
            case 'DDR3':
                score += 15;
                break;
            case 'DDR4':
                score += 25;
                break;
            case 'DDR5':
                score += 35;
                break;
        }


        switch (computerType) {

            //It calculates ram scoring for 'PC' category.
            case "PC":

                //It calculates scoring based on ram's speed (MHz).
                aux = ramSpecs.speed;
                switch (true) {
                    case aux <= 800:
                        score += 2;
                        break;
                    case aux <= 1600:
                        score += 5;
                        break;
                    case aux <= 2133:
                        score += 10;
                        break;
                    case aux <= 2400:
                        score += 17;
                        break;
                    case aux <= 3000:
                        score += 20;
                        break;
                    case aux <= 3200:
                        score += 35;
                        break;
                    case aux <= 4000:
                        score += 40;
                        break;
                    case aux > 4000:
                        score += 50;
                        break;
                }

                break;

            //It calculates scoring for 'NOTEBOOK' category.
            case "NOTEBOOK":

                //It calculates scoring based on ram's speed (MHz).
                aux = ramSpecs.speed;
                switch (true) {
                    case aux <= 533:
                        score += 2;
                        break;
                    case aux <= 600:
                        score += 5;
                        break;
                    case aux <= 733:
                        score += 7;
                        break;
                    case aux <= 800:
                        score += 10;
                        break;
                    case aux <= 933:
                        score += 13;
                        break;
                    case aux <= 1000:
                        score += 15;
                        break;
                    case aux <= 1600:
                        score += 20;
                        break;
                    case aux <= 2133:
                        score += 25;
                        break;
                    case aux <= 2400:
                        score += 30;
                        break;
                    case aux <= 3000:
                        score += 35;
                        break;
                    case aux <= 3200:
                        score += 40;
                        break;
                    case aux <= 4000:
                        score += 45;
                        break;
                    case aux > 4000:
                        score += 50;
                        break;
                }

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

                //It calculates scoring based on storage type, its speed and space.
                aux = storageSpecs.speed;
                switch (storageSpecs.storageType.toUpperCase()) {

                    case 'HDD':
                        score += 5;

                        //It calculates scoring based on storage speed.
                        switch (true) {
                            case aux <= 5400:
                                score += 10;
                                break;
                            case aux <= 7200:
                                score += 15;
                                break;
                            case aux > 7200:
                                score += 20;
                                break;
                        }


                        //It calculates scoring based on storage space.
                        aux = storageSpecs.space;
                        switch (true) {
                            case aux <= 500:
                                score += 5;
                                break;
                            case aux <= 1000:
                                score += 10;
                                break;
                            case aux <= 2000:
                                score += 15;
                                break;
                            case aux > 2000:
                                score += 20;
                                break;
                        }

                        break;

                    case 'SSD':
                        score += 20;

                        //It calculates scoring based on storage speed.
                        switch (true) {
                            case aux <= 1400:
                                score += 5;
                                break;
                            case aux <= 1500:
                                score += 10;
                                break;
                            case aux <= 2800:
                                score += 20;
                                break;
                            case aux <= 3000:
                                score += 30;
                                break;
                            case aux > 3000:
                                score += 40;
                                break;
                        }



                        //It calculates scoring based on storage space.
                        aux = storageSpecs.space;
                        switch (true) {
                            case aux <= 32:
                                score += 5;
                                break;
                            case aux <= 64:
                                score += 10;
                                break;
                            case aux <= 128:
                                score += 20;
                                break;
                            case aux <= 256:
                                score += 30;
                                break;
                            case aux <= 512:
                                score += 40;
                                break;
                            case aux <= 1000:
                                score += 50;
                                break;
                            case aux > 1000:
                                score += 60;
                                break;
                        }

                        break;
                }

                break;

            //It calculates scoring for 'NOTEBOOK' category.
            case "NOTEBOOK":


                //It calculates scoring based on storage type, its speed and space.
                aux = storageSpecs.speed;
                switch (storageSpecs.storageType.toUpperCase()) {

                    case 'HDD':
                        score += 5;

                        //It calculates scoring based on storage speed.
                        switch (true) {
                            case aux <= 5400:
                                score += 10;
                                break;
                            case aux <= 7200:
                                score += 15;
                                break;
                            case aux > 7200:
                                score += 20;
                                break;
                        }


                        //It calculates scoring based on storage space.
                        aux = storageSpecs.space;
                        switch (true) {
                            case aux <= 500:
                                score += 5;
                                break;
                            case aux <= 1000:
                                score += 10;
                                break;
                            case aux <= 2000:
                                score += 15;
                                break;
                            case aux > 2000:
                                score += 20;
                                break;
                        }

                        break;

                    case 'SSD':
                        score += 20;

                        //It calculates scoring based on storage speed.
                        switch (true) {
                            case aux <= 1400:
                                score += 5;
                                break;
                            case aux <= 1500:
                                score += 10;
                                break;
                            case aux <= 2800:
                                score += 20;
                                break;
                            case aux <= 3000:
                                score += 30;
                                break;
                            case aux > 3000:
                                score += 40;
                                break;
                        }


                        //It calculates scoring based on storage space.
                        aux = storageSpecs.space;
                        switch (true) {
                            case aux <= 32:
                                score += 5;
                                break;
                            case aux <= 64:
                                score += 10;
                                break;
                            case aux <= 128:
                                score += 20;
                                break;
                            case aux <= 256:
                                score += 30;
                                break;
                            case aux <= 512:
                                score += 40;
                                break;
                            case aux <= 1000:
                                score += 50;
                                break;
                            case aux > 1000:
                                score += 60;
                                break;
                        }

                        break;
                }

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

        //It calculates scoring based on graphics card brand.
        switch (graphicSpecs.brand) {
            case 'AMD':
                score += 5;
                break;
            case 'INTEL':
                score += 10;
                break;
            case 'NVIDIA':
                score += 10;
                break;
        }

        //It calculates scoring based on graphics card ram type.
        switch (graphicSpecs.ramType) {
            case 'DDR2':
                score += 5;
                break;
            case 'DDR3':
                score += 10;
                break;
            case 'DDR4':
                score += 15;
                break;
            case 'DDR5':
                score += 20;
                break;
            default:
                break;
        }


        switch (computerType) {

            //It calculates scoring for 'PC' category.
            case "PC":


                //It calculates scoring based on graphics card type and its ram.
                switch (graphicSpecs.graphicCardType) {
                    case 'INTEGRADA':
                        score += 10;

                    case 'DEDICADA':
                        score += 30;

                        //It calculates scoring based on graphics ram.
                        aux = graphicSpecs.ram;
                        switch (true) {
                            case aux <= 1:
                                score += 5;
                                break;
                            case aux <= 3:
                                score += 10;
                                break;
                            case aux <= 6:
                                score += 20;
                                break;
                            case aux <= 8:
                                score += 30;
                                break;
                            case aux > 8:
                                score += 40;
                                break;
                        }

                        break;
                }

                break;


            //It calculates scoring for 'NOTEBOOK' category.
            case "NOTEBOOK":


                //It calculates scoring based on graphics card type and its ram.
                switch (graphicSpecs.graphicCardType) {
                    case 'INTEGRADA':
                        score += 10;

                    case 'DEDICADA':
                        score += 30;

                        //It calculates scoring based on graphics ram.
                        aux = graphicSpecs.ram;
                        switch (true) {
                            case aux <= 1:
                                score += 5;
                                break;
                            case aux <= 3:
                                score += 10;
                                break;
                            case aux <= 6:
                                score += 20;
                                break;
                            case aux <= 8:
                                score += 30;
                                break;
                            case aux > 8:
                                score += 40;
                                break;
                        }

                        break;
                }

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
    search,
    searchByScore
};
