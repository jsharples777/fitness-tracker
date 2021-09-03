"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const request_1 = __importDefault(require("request"));
const xml2js_1 = require("xml2js");
const debug_1 = __importDefault(require("debug"));
const bggLogger = debug_1.default('bgg');
class BGGDataSourceDelegate {
    static convertToBoardGame(item) {
        bggLogger(item.name);
        let year = 0;
        if (item.yearpublished) {
            year = parseInt(item.yearpublished[0].$.value);
        }
        let boardGame = {
            gameId: parseInt(item.$.id),
            name: item.name[0].$.value,
            year: year
        };
        return boardGame;
    }
    static convertToDetails(item) {
        let thumb = '';
        if (item.thumbnail) {
            thumb = item.thumbnail[0];
        }
        let image = '';
        if (item.image) {
            image = item.image[0];
        }
        let year = 0;
        if (item.yearpublished) {
            year = parseInt(item.yearpublished[0].$.value);
        }
        let minPlayers = 0;
        if (item.minplayers) {
            minPlayers = parseInt(item.minplayers[0].$.value);
        }
        let maxPlayers = 0;
        if (item.maxplayers) {
            maxPlayers = parseInt(item.maxplayers[0].$.value);
        }
        let minPlayTime = 0;
        if (item.minplaytime) {
            minPlayTime = parseInt(item.minplaytime[0].$.value);
        }
        let maxPlayTime = 0;
        if (item.maxplaytime) {
            maxPlayTime = parseInt(item.maxplaytime[0].$.value);
        }
        let minAge = 0;
        if (item.minage) {
            minAge = parseInt(item.minage[0].$.value);
        }
        let numOfRaters = 0;
        let averageScore = 0.0;
        let rank = 0;
        if (item.statistics[0].ratings) {
            let stats = item.statistics[0].ratings[0];
            if (stats.usersrated)
                numOfRaters = parseInt(stats.usersrated[0]['$'].value);
            if (stats.average)
                averageScore = parseFloat(stats.average[0]['$'].value);
            if (stats.ranks)
                rank = parseInt(stats.ranks[0].rank[0]['$'].value);
        }
        let categories = [];
        let publisher = '';
        let designersString = '';
        let artistsString = '';
        let categoriesString = '';
        if (item.link) {
            let publishers = [];
            let designers = [];
            let artists = [];
            // find the categories, the first publisher, designers, and artists
            item.link.forEach((linkItem) => {
                let linkItemValues = linkItem['$'];
                if (linkItemValues.type === 'boardgamedesigner') {
                    designers.push(linkItemValues.value);
                }
                if (linkItemValues.type === 'boardgameartist') {
                    artists.push(linkItemValues.value);
                }
                if (linkItemValues.type === 'boardgamecategory') {
                    categories.push(linkItemValues.value);
                }
                if (linkItemValues.type === 'boardgamepublisher') {
                    publishers.push(linkItemValues.value);
                }
                if (publishers.length > 0) {
                    publisher = publishers[0];
                }
                if (designers.length > 0) {
                    designersString = publishers.join(', ');
                }
                if (artists.length > 0) {
                    artistsString = artists.join(', ');
                }
                if (categories.length > 0) {
                    categoriesString = categories.join(', ');
                }
            });
        }
        let boardGame = {
            id: -1,
            gameId: parseInt(item.$.id),
            thumb: thumb,
            image: image,
            name: item.name[0].$.value,
            description: item.description[0],
            year: year,
            minPlayers: minPlayers,
            maxPlayers: maxPlayers,
            minPlayTime: minPlayTime,
            maxPlayTime: maxPlayTime,
            minAge: minAge,
            designers: designersString,
            artists: artistsString,
            publisher: publisher,
            categories: categoriesString,
            numOfRaters: numOfRaters,
            averageScore: averageScore,
            rank: rank
        };
        return boardGame;
    }
    // @ts-ignore
    findBoardGames(_, { query }) {
        bggLogger(`Requesting board games matching ${query}`);
        let url = process.env.URL_Search + query;
        return new Promise((resolve, reject) => {
            request_1.default(url, function (error, response, body) {
                bggLogger('error:', error); // Print the error if one occurred
                bggLogger('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                bggLogger('body:', body);
                let results = [];
                if (error)
                    reject(error.message);
                try {
                    let parser = new xml2js_1.Parser();
                    parser.parseString(body, (err, parsedResults) => {
                        if (err)
                            reject("xml parsing error");
                        if (parsedResults.items) {
                            if (parsedResults.items.item) {
                                let parsedResultItems = parsedResults.items.item;
                                parsedResultItems.forEach((item) => {
                                    let boardGame = BGGDataSourceDelegate.convertToBoardGame(item);
                                    bggLogger(boardGame);
                                    results.push(boardGame);
                                });
                            }
                        }
                    });
                    bggLogger(results);
                    resolve(results);
                }
                catch (error) {
                    reject(error);
                }
            });
        });
    }
    // @ts-ignore
    getBoardGameDetails(_, data) {
        bggLogger(data);
        let url = process.env.URL_FindById + data.gameId;
        bggLogger(`Looking for board game details for id ${data.gameId}`);
        return new Promise((resolve, reject) => {
            request_1.default(url, function (error, response, body) {
                bggLogger('error:', error); // Print the error if one occurred
                bggLogger('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                let result = {};
                if (error)
                    reject(error.message);
                let parser = new xml2js_1.Parser();
                parser.parseString(body, (err, parsedResults) => {
                    if (err)
                        reject("xml parsing error");
                    if (parsedResults.items) {
                        if (parsedResults.items.item) {
                            let item = parsedResults.items.item[0];
                            result = BGGDataSourceDelegate.convertToDetails(item);
                        }
                    }
                });
                bggLogger(result);
                resolve(result);
            });
        });
    }
}
module.exports = BGGDataSourceDelegate;
//# sourceMappingURL=BGGDataSourceDelegate.js.map