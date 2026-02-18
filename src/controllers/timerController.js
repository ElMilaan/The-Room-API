const { getIdParam } = require("../functions/utils");
const { error } = require("./errorController");
const timerFunctions = require("../functions/timer");

exports.getTimer = async (req, res) => {
    const id = getIdParam(req, res);
    try {
        const result = await timerFunctions.getTimer(id);
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
        const result = await timerFunctions.getAllTimers();
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
        const result = await timerFunctions.resetTimer(id);

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
        const result = await timerFunctions.resetAllTimers();

        return res.json({
            message: "Tous les chronos ont été réinitialisés",
            chronos: result[0].rows.concat(result[1].rows[0])
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
        const result = await timerFunctions.addToTimer(id, amount);

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

exports.modifyTimersSpecific = async (req, res) => {
    const { ids_values } = req.body;
    if (Object.keys(ids_values).length === 0) {
        return res.status(400).json({ error: "Aucun ID fourni" });
    }
    try {
        const result = await timerFunctions.modifyTimersSpecific(ids_values);
        return res.json({
            message: "Les chronos spécifiés ont été modifiés",
            chronos: result
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
        const result = await timerFunctions.subtractFromTimer(id, amount);

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
        const result = await timerFunctions.startTimer(id);

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
        const result = await timerFunctions.startAllTimers();

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
        const result = await timerFunctions.stopTimer(id);

        if (result.length === 0) {
            return res.status(404).json({ error: "Chrono" + id + " non trouvé" });
        }
        return res.json({
            message: result[0],
            chronos: result[1]
        });
    }
    catch (err) {
        error(res, 500, 'Erreur serveur : ' + err.message);
    }
};

exports.stopAllTimers = async (req, res) => {
    try {
        const result = await timerFunctions.stopAllTimers();

        if (result.length === 0) {
            return res.status(404).json({ error: "Stop all timers : Aucun chrono trouvé" });
        }

        return res.json({
            message: "Tous les chronos ont été arrêtés",
            chronos: result
        });
    }
    catch (err) {
        error(res, 500, 'Erreur serveur : ' + err.message);
    }
};

exports.changeTimerSpeed = async (req, res) => {
    const id = getIdParam(req, res);
    const { speed } = req.body;
    try {
        const result = await timerFunctions.changeTimerSpeed(id, speed);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Chrono" + id + " non trouvé" });
        }
        return res.json({
            message: `Vitesse du chrono ${id} modifiée à ${speed}`,
            chronos: result.rows[0]
        });
    }
    catch (err) {
        error(res, 500, 'Erreur serveur : ' + err.message);
    }
}

exports.changeAllSpeeds = async (req, res) => {
    const { speed } = req.body;
    try {
        const result = await timerFunctions.changeAllSpeeds(speed);

        if (result.length === 0) {
            return res.status(404).json({ error: "Stop all timers : Aucun chrono trouvé" });
        }

        return res.json({
            message: "La vitesse de touus les chronos sont à " + speed,
            chronos: result[0]
        });
    }
    catch (err) {
        error(res, 500, 'Erreur serveur : ' + err.message);
    }
}