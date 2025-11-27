const { error } = require("./errorController");

exports.getIdParam = (req, res) => {
    const id = req.params?.id;
    if (Number(id) < 0 || Number(id) > 5) {
        error(res, 400, 'ID de timer invalide -> 0 <= timer <= 5');
    }
    return id;
}

exports.timerDifference = (updated_at) => {
    const lastUpdate = new Date(updated_at).getTime();
    const now = Date.now();
    return now - lastUpdate;
}