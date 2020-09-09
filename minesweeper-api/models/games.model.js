module.exports = (sequelize, Sequelize) => {
    const Games = sequelize.define("games", {
        gameId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        username: {
            type: Sequelize.STRING,
            primaryKey: true,
        },
        flag: {
            type: Sequelize.BOOLEAN,
        },
        mine: {
            type: Sequelize.BOOLEAN,
        },
        value: {
            type: Sequelize.INTEGER,
        },
        visible:{
            type: Sequelize.BOOLEAN,
        },
        cellId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
    });

    return Games;
};
