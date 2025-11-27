const { getIdParam, timerDifference } = require("./utils");
const { error } = require("./errorController");
const pool = require("../models/db");

const START_CHRONO_PLAYER = 5 * 1000 * 60;
const START_CHRONO_TEAM = 25 * 1000 * 60;

exports.getTimer = async (req, res) => {
    const id = getIdParam(req, res);
    try {
        const result = await pool.query("SELECT * FROM chronos WHERE id = $1", [id]);

        if (result.rows.length === 0) {
            return res.status(404).send("Chrono " + id + " non trouvé");
        }

        return res.json({
            message: `Affichage du chrono ${id} :`,
            chronos: result.rows[0]
        });
    }
    catch (err) {
        error(res, 500, 'Erreur serveur : ' + err.message);
    }
};

exports.getAllTimers = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM chronos ORDER BY id ASC");
        return res.json({
            message: `Affichage de tous les chronos :`,
            chronos: result.rows
        });
    }
    catch (err) {
        error(res, 500, 'Erreur serveur : ' + err.message);
    }
};

exports.resetTimer = async (req, res) => {
    const id = getIdParam(req, res);
    try {
        await pool.query(
            "UPDATE chronos SET status = 'paused' WHERE id = $1 RETURNING *",
            [id]
        );

        const result = await pool.query(
            "UPDATE chronos SET value = $1 WHERE id = $2 RETURNING *",
            [id == 0 ? START_CHRONO_TEAM : START_CHRONO_PLAYER, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).send("Chrono " + id + " non trouvé");
        }
        return res.json({
            message: `Le chrono ${id} a été réinitialisé`,
            chronos: result.rows[0]
        });
    }
    catch (err) {
        error(res, 500, 'Erreur serveur : ' + err.message);
    }
};

exports.resetAllTimers = async (req, res) => {
    try {
        await pool.query(
            "UPDATE chronos SET status = 'paused' RETURNING *"
        );

        const result1 = await pool.query(
            "UPDATE chronos SET value = $1 WHERE id != 0 RETURNING *",
            [START_CHRONO_PLAYER]
        );

        const result2 = await pool.query(
            "UPDATE chronos SET value = $1 WHERE id = 0 RETURNING *",
            [START_CHRONO_TEAM]
        );

        return res.json({
            message: "Tous les chronos ont été réinitialisés",
            chronos: result1.rows.concat(result2.rows[0])
        });
    }
    catch (err) {
        error(res, 500, 'Erreur serveur : ' + err.message);
    }
};

exports.addToTimer = async (req, res) => {
    const id = getIdParam(req, res);
    const { amount } = req.body;
    try {
        const result = await pool.query(
            `UPDATE chronos SET value = value + $1 WHERE id = $2 RETURNING *`,
            [amount, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Chrono" + id + " non trouvé" });
        }
        return res.json({
            message: `Chrono ${id} augmenté de ${amount} ms`,
            chronos: result.rows[0]
        });
    }
    catch (err) {
        error(res, 500, 'Erreur serveur : ' + err.message);
    }
};

exports.subtractFromTimer = async (req, res) => {
    const id = getIdParam(req, res);
    const { amount } = req.body;
    try {
        const result = await pool.query(
            `UPDATE chronos SET value = value - $1 WHERE id = $2 RETURNING *`,
            [amount, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Chrono" + id + " non trouvé" });
        }
        return res.json({
            message: `Chrono ${id} soustrait de ${amount} ms`,
            chronos: result.rows[0]
        });
    }
    catch (err) {
        error(res, 500, 'Erreur serveur : ' + err.message);
    }
};

exports.startTimer = async (req, res) => {
    const id = getIdParam(req, res);
    try {
        const result = await pool.query(
            `UPDATE chronos SET status = 'running' WHERE id = $1 RETURNING *`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Chrono" + id + " non trouvé" });
        }
        return res.json({
            message: `Chrono ${id} démarré`,
            chronos: result.rows[0]
        });
    }
    catch (err) {
        error(res, 500, 'Erreur serveur : ' + err.message);
    }
};

exports.startAllTimers = async (req, res) => {
    try {
        const result = await pool.query(
            `UPDATE chronos SET status = 'running' RETURNING *`
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Commande erronée" });
        }
        return res.json({
            message: `Tous les chronos ont été démarrés`,
            chronos: result.rows
        });
    }
    catch (err) {
        error(res, 500, 'Erreur serveur : ' + err.message);
    }
};

exports.stopTimer = async (req, res) => {
    const id = getIdParam(req, res);
    try {
        const result = await pool.query("SELECT * FROM chronos WHERE id = $1", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Chrono " + id + " non trouvé" });
        }

        const timer = result.rows[0];
        const newValue = timer.value - timerDifference(timer.updated_at);

        if (timer.status === "running") {
            const updateResult = await pool.query(
                `UPDATE chronos SET status = 'paused', value = $1 WHERE id = $2 RETURNING *`,
                [newValue, id]
            );

            return res.json({
                message: `Chrono ${id} arrêté`,
                chronos: updateResult.rows[0]
            });
        }
        else {
            return res.json({
                message: `Chrono ${id} déjà arrêté`,
                chronos: timer
            });
        }
    }
    catch (err) {
        error(res, 500, 'Erreur serveur : ' + err.message);
    }
};

exports.stopAllTimers = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM chronos"
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Aucun chrono trouvé" });
        }

        const timers = result.rows;
        const updatedTimers = [];

        const difference = timerDifference(timers[0].updated_at);

        for (const timer of timers) {

            if (timer.status === "running") {

                const newValue = timer.value - difference;

                const updateResult = await pool.query(
                    `UPDATE chronos SET status = 'paused', value = $1 WHERE id = $2 RETURNING *`,
                    [newValue, timer.id]
                );

                updatedTimers.push(updateResult.rows[0]);
            }
            else {
                updatedTimers.push(timer);
            }
        }

        return res.json({
            message: "Tous les chronos ont été arrêtés",
            chronos: updatedTimers
        });
    }
    catch (err) {
        error(res, 500, 'Erreur serveur : ' + err.message);
    }
};