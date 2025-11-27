const { error } = require("./errorController");

// Récup les id des timers et vérifie qu'ils sont valides
exports.getIdParam = (req, res) => {
    const id = req.params?.id;
    if (Number(id) < 0 || Number(id) > 5) {
        error(res, 400, 'ID de timer invalide -> 0 <= timer <= 5');
    }
    return id;
}

// Calcule la différence de temps entre maintenant et la dernière mise à jour -> MAJ entre start et stop

exports.timerDifference = (updated_at) => {
    const lastUpdate = new Date(updated_at).getTime();
    const now = Date.now();
    return now - lastUpdate;
}