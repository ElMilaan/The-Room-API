const pool = require("../models/db");
const { timerDifference } = require("./utils");

getTimer = async (id) => {
    return await pool.query("SELECT * FROM chronos WHERE id = $1", [id]);
}

getAllTimers = async () => {
    return await pool.query("SELECT * FROM chronos ORDER BY id ASC");
}

resetTimer = async (id) => {
    await pool.query(
        "UPDATE chronos SET status = 'paused' WHERE id = $1 RETURNING *",
        [id]
    );

    return await pool.query(
        "UPDATE chronos SET value = $1 WHERE id = $2 RETURNING *",
        [id == 0 ? process.env.START_CHRONO_TEAM : process.env.START_CHRONO_PLAYER, id]
    );
}

resetAllTimers = async () => {
    await pool.query(
        "UPDATE chronos SET status = 'paused' RETURNING *"
    );

    const result1 = await pool.query(
        "UPDATE chronos SET value = $1 WHERE id != 0 RETURNING *",
        [process.env.START_CHRONO_PLAYER]
    );

    const result2 = await pool.query(
        "UPDATE chronos SET value = $1 WHERE id = 0 RETURNING *",
        [process.env.START_CHRONO_TEAM]
    );

    return [result1, result2];
}

addToTimer = async (id, amount) => {
    return await pool.query(
        `UPDATE chronos SET value = value + $1 WHERE id = $2 RETURNING *`,
        [amount, id]
    );
}

modifyTimersSpecific = async (ids_values) => {
    const result = await pool.query(
        "SELECT * FROM chronos"
    );

    if (result.rows.length === 0) {
        return res.status(404).json({ error: "Stop all timers : Aucun chrono trouvé" });
    }

    const timers = result.rows;
    const updatedTimers = [];

    for (const timer of timers) {
        const valueToApply = ids_values[timer.id];
        const newValue = timer.value + (valueToApply || 0);
        const updateResult = await pool.query(
            `UPDATE chronos SET value = $1 WHERE id = $2 RETURNING *`,
            [newValue, timer.id]
        );
        updatedTimers.push(updateResult.rows[0]);
    }

    return updatedTimers;
}

subtractFromTimer = async (id, amount) => {
    return await pool.query(
        `UPDATE chronos SET value = value - $1 WHERE id = $2 RETURNING *`,
        [amount, id]
    );
}

startTimer = async (id) => {
    return await pool.query(
        `UPDATE chronos SET status = 'running' WHERE id = $1 RETURNING *`,
        [id]
    );
}

startAllTimers = async () => {
    return await pool.query(
        `UPDATE chronos SET status = 'running' RETURNING *`
    );
}

stopTimer = async (id) => {
    const result = await pool.query("SELECT * FROM chronos WHERE id = $1", [id]);

    const timer = result.rows[0];
    const newValue = timer.value - timerDifference(timer.updated_at) * timer.speed;

    if (timer.status === "running") {
        const updateResult = await pool.query(
            `UPDATE chronos SET status = 'paused', value = $1 WHERE id = $2 RETURNING *`,
            [newValue, id]
        );

        return [`Chrono ${id} arrêté`, updateResult.rows[0]]
    }
    return [`Chrono ${id} déjà arrêté`, timer]
}

stopAllTimers = async () => {
    const result = await pool.query(
        "SELECT * FROM chronos"
    );
    const timers = result.rows;
    let updatedTimers = [];

    const difference = timerDifference(timers[0].updated_at);

    for (const timer of timers) {

        if (timer.status === "running") {

            const newValue = timer.value - difference * timer.speed;

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
    return updatedTimers;
}

changeTimerSpeed = async (id, speed) => {
    return await pool.query(
        `UPDATE chronos SET speed = $1 WHERE id = $2 RETURNING *`,
        [speed, id]
    );
}

changeAllSpeeds = async (speed) => {
    const result = await pool.query(
        "SELECT * FROM chronos"
    );

    const timers = result.rows;
    const updatedTimers = [];

    for (const timer of timers) {

        const updateResult = await pool.query(
            `UPDATE chronos SET speed = $1 WHERE id = $2 RETURNING *`,
            [speed, timer.id]
        );

        updatedTimers.push(updateResult.rows[0]);
    }
    return [updatedTimers];
}

module.exports = {
    getTimer,
    getAllTimers,
    resetTimer,
    resetAllTimers,
    addToTimer,
    modifyTimersSpecific,
    subtractFromTimer,
    startTimer,
    startAllTimers,
    stopTimer,
    stopAllTimers,
    changeTimerSpeed,
    changeAllSpeeds
}