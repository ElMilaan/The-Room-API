const pool = require("../models/db");
const { addTriggerOnPush, removeTriggerOnPush } = require("./button");
const { addToTimer, subtractFromTimer } = require("./timer");
const { sleep } = require("./utils");

startEchos = async () => {
    await addTriggerOnPush();
}

stopEchos = async () => {
    await removeTriggerOnPush();
}

startPacte = async () => {
    await sleep(process.env.PACTE_WAITING_TIME);
    const result = await pool.query(`
            SELECT * FROM buttons;
        `);

    const time = process.env.PACTE_TIME_LOST;

    let buttonsPressed = [];
    let buttonsNotPressed = [];

    result.rows.forEach(button => {
        if (button.pressed) {
            buttonsPressed.push(button.id);
        } else {
            buttonsNotPressed.push(button.id);
        }
    });

    timeGain = time / buttonsPressed.length;
    timeLoss = time / buttonsNotPressed.length;

    if (buttonsPressed.length === 5) {
        subtractFromTimer(0, time * 2);
        return `Tous les joueurs ont décidé de trahir, l'équipe perd ${time * 2}ms`
    }

    if (buttonsPressed.length === 0 || buttonsNotPressed.length === 0) {
        return "Tous les joueurs ont fait confiance, aucun gain ni perte"
    }

    buttonsPressed.forEach(id => {
        addToTimer(id, time / buttonsPressed.length);
    })
    buttonsNotPressed.forEach(id => {
        subtractFromTimer(id, time / buttonsNotPressed.length);
    })
    return {
        gains: { buttonsPressed, timeGain },
        pertes: { buttonsNotPressed, timeLoss }
    }
}

stopPacte = async () => {
    return await pool.query(`
            UPDATE buttons 
            SET pressed = false
            RETURNING *;
        `);
}

module.exports = {
    startEchos,
    stopEchos,
    startPacte,
    stopPacte
}