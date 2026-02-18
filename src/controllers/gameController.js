const { error } = require("./errorController");
const pool = require("../models/db");
const gameFunctions = require("../functions/game");

exports.startEchos = async (req, res) => {
    await gameFunctions.startEchos();
    return res.json({
        message: "Echos du mur lancé"
    });
}

exports.stopEchos = async (req, res) => {
    await gameFunctions.stopEchos();
    return res.json({
        message: "Echos du mur arrêté"
    });
}

exports.startPacte = async (req, res) => {
    try {
        const result = await gameFunctions.startPacte();

        return res.json({
            message: `La manche est finie.`,
            résultats: result
        },);
    }
    catch (err) {
        error(res, 500, 'Erreur serveur : ' + err.message);
    }
}

exports.stopPacte = async (req, res) => {
    try {
        const result = await pool.query(`
                UPDATE buttons 
                SET pressed = false
                RETURNING *;
            `);

        if (result.rows.length === 0) {
            return res.status(404).send("Boutons non trouvés");
        }

        return res.json({
            message: `Fin du pacte, tous les boutons ont été réinitialisés`,
            buttons: result.rows
        });
    }
    catch (err) {
        error(res, 500, 'Erreur serveur : ' + err.message);
    }
}