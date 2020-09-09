module.exports = (sequelize, Sequelize) => {
    const UserGames = sequelize.define("usergames", {
        gameId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        username: {
            type: Sequelize.STRING,
            primaryKey: true,
        },
        size: {
            type: Sequelize.INTEGER,
        },
        time: {
            type: Sequelize.INTEGER,
        }
    });

    return UserGames;
};
