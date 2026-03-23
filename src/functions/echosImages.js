const { resetIndexes } = require("../controllers/echosImagesController");
const pool = require("../models/db");

getByColor = async (color) => {
    return await pool.query(`
            SELECT * FROM echos_images WHERE color = $1;
        `, [color]);
}

resetIndexes = async () => {
    return await pool.query(`
        UPDATE echos_images
        SET index = 0
        RETURNING *`)
}

module.exports = {
    getByColor,
    resetIndexes
}