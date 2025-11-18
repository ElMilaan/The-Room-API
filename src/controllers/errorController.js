exports.error = (res, status, msg) => {
    return res.status(status).json({ error: msg });
}