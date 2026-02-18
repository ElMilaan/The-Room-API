const { error } = require("./errorController");
const buttonFunctions = require("../functions/button");

exports.getButtons = async (req, res) => {
    try {
        const result = await buttonFunctions.getButtons();
        if (result.rows.length === 0) {
            return res.status(404).json("Aucun bouton trouvé");
        }
        return res.json({
            message: `Les boutons ont été récupérés`,
            button: result.rows
        });
    }
    catch (err) {
        error(res, 500, 'Erreur serveur : ' + err.message);
    }
}

exports.getButton = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await buttonFunctions.getButton(id);
        if (result.rows.length === 0) {
            return res.status(404).json("Bouton " + id + " non trouvé");
        }
        return res.json({
            message: `Le bouton ${id} a été récupéré`,
            button: result.rows[0]
        });
    }
    catch (err) {
        error(res, 500, 'Erreur serveur : ' + err.message);
    }
}

exports.pressButton = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await buttonFunctions.pressButton(id);

        if (result.rows.length === 0) {
            return res.status(404).send("Bouton " + id + " non trouvé");
        }
        return res.json({
            message: `Le bouton ${id} a été pressé`,
            button: result.rows[0]
        });
    }
    catch (err) {
        error(res, 500, 'Erreur serveur : ' + err.message);
    }
}

exports.addTriggerOnPush = async (req, res) => {
    try {
        await buttonFunctions.addTriggerOnPush();
        return res.json({
            message: `Trigger ajouté avec succès`
        });
    }
    catch (err) {
        error(res, 500, 'Erreur serveur : ' + err.message);
    }
}

exports.removeTriggerOnPush = async (req, res) => {
    try {
        await buttonFunctions.removeTriggerOnPush();
        return res.json({
            message: `Trigger supprimé avec succès`
        });
    }
    catch (err) {
        error(res, 500, 'Erreur serveur : ' + err.message);
    }
}