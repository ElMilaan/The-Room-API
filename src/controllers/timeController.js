const pool = require("../models/db");

// PAS UTILISÉ -> Non conforme à l'utilisation SSL (requetes toutes les 10ms non supportées par les hébérgeurs)

exports.globalTimer = async () => {
    setInterval(async () => {
        try {
            await pool.query(`
                UPDATE chronos 
                SET value = value - 10
                WHERE status = 'running'
                RETURNING id;
            `);
        }
        catch (err) {
            console.error("Erreur interval timer:", err.message);
        }
    }, 10);
}