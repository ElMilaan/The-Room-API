const { getIdParam } = require("../functions/utils");
const echosImagesFunctions = require("../functions/echosImages");

exports.getIndexByColor = async (req, res) => {
    const id = getIdParam(req, res);
    try {
        const result = await echosImagesFunctions.getByColor(id);
        if (result.rows.length === 0) {
            return res.status(404).json("Aucune image trouvée pour la couleur " + id);
        }
        return res.json({
            index: result.rows[0].index
        })
    }
    catch (err) {
        error(res, 500, 'Erreur serveur : ' + err.message);
    }
}