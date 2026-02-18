const pool = require("../models/db");

getButtons = async () => {
    return await pool.query(`
            SELECT * FROM buttons;
        `);
}

getButton = async (id) => {
    return await pool.query(`
            SELECT * FROM buttons WHERE id = $1;
        `, [id]);
}

pressButton = async (id) => {
    return await pool.query(`
                UPDATE buttons 
                SET pressed = true
                WHERE id = $1
                RETURNING *;
            `, [id]);
}

addTriggerOnPush = async () => {
    await pool.query(`
      CREATE TRIGGER trigger_button_press
      AFTER UPDATE OF pressed
      ON buttons
      FOR EACH ROW
      EXECUTE FUNCTION update_echos_index_from_button();
    `);
}

removeTriggerOnPush = async () => {
    await pool.query(`
      DROP TRIGGER IF EXISTS trigger_button_press ON buttons;
    `);
}

module.exports = {
    getButtons,
    getButton,
    pressButton,
    addTriggerOnPush,
    removeTriggerOnPush
}