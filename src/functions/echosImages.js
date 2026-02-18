const pool = require("../models/db");

getByColor = async (color) => {
    return await pool.query(`
            SELECT * FROM echos_images WHERE color = $1;
        `, [color]);
}

module.exports = {
    getByColor
}