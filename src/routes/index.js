const express = require('express');
const router = express.Router();
const timerController = require('../controllers/timerController');

/**
 * @swagger
 * tags:
 *   name: Timer
 *   description: Gestion des timers
 */

/**
 * @swagger
 * /api/timer/{id}:
 *   get:
 *     summary: Récupérer un timer par ID
 *     tags: [Timer]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du timer
 *     responses:
 *       200:
 *         description: Timer récupéré avec succès
 *       404:
 *         description: Timer non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get('/timer/:id', timerController.getTimer);

/**
 * @swagger
 * /api/timer:
 *   get:
 *     summary: Récupérer tous les timers
 *     tags: [Timer]
 *     responses:
 *       200:
 *         description: Liste de tous les timers
 *       500:
 *         description: Erreur serveur
 */
router.get('/timer', timerController.getAllTimers);

/**
 * @swagger
 * /api/timer/reset/{id}:
 *   put:
 *     summary: Réinitialiser un timer par ID
 *     tags: [Timer]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           required: true
 *           description: ID du timer à réinitialiser
 *     responses:
 *       200:
 *         description: Timer réinitialisé avec succès
 *       404:
 *         description: Timer non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.put('/timer/reset/:id', timerController.resetTimer);

/**
 * @swagger
 * /api/timer/resetAll:
 *   put:
 *     summary: Réinitialiser tous les timers
 *     tags: [Timer]
 *     responses:
 *       200:
 *         description: Tous les timers ont été réinitialisés
 *       500:
 *        description: Erreur serveur
 */
router.put('/timer/resetAll', timerController.resetAllTimers)

/**
 * @swagger
 * /api/timer/add/{id}:
 *   put:
 *     summary: Ajouter du temps à un timer
 *     tags: [Timer]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du timer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 description: Nombre de secondes à ajouter
 *     responses:
 *       200:
 *         description: Timer mis à jour avec succès
 *       404:
 *         description: Timer non trouvé
 *       500:
 *        description: Erreur serveur
 */
router.put('/timer/add/:id', timerController.addToTimer);

/**
 * @swagger
 * /api/timer/modifySpecific:
 *   put:
 *     summary: Modifier les valeurs de plusieurs timers spécifiés dans le body
 *     tags: [Timer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ids_values:
 *                 type: object
 *                 description: Map of id -> time to add (in ms)
 *                 additionalProperties:
 *                   type: integer
 *                   example: 5
 *     responses:
 *       200:
 *         description: Timer spécifiés mis à jour avec succès
 *       404:
 *         description: Timers non trouvés
 *       500:
 *        description: Erreur serveur
 */
router.put('/timer/modifySpecific', timerController.modifyTimersSpecific);

/**
 * @swagger
 * /api/timer/subtract/{id}:
 *   put:
 *     summary: Soustraire du temps à un timer
 *     tags: [Timer]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du timer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 description: Nombre de secondes à soustraire
 *     responses:
 *       200:
 *         description: Timer mis à jour avec succès
 *       404:
 *         description: Timer non trouvé
 *       500:
 *        description: Erreur serveur
 */
router.put('/timer/subtract/:id', timerController.subtractFromTimer);

/**
 * @swagger
 * /api/timer/start/{id}:
 *   put:
 *     summary: Démarrer un timer par ID
 *     tags: [Timer]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du timer
 *     responses:
 *       200:
 *         description: Timer démarré avec succès
 *       404:
 *         description: Timer non trouvé
 *       500:
 *        description: Erreur serveur
 */
router.put('/timer/start/:id', timerController.startTimer);

/**
 * @swagger
 * /api/timer/startAll:
 *   put:
 *     summary: Démarrer tous les timers
 *     tags: [Timer]
 *     responses:
 *       200:
 *         description: Tous les timers ont été démarrés
 *       500:
 *        description: Erreur serveur
 */
router.put('/timer/startAll', timerController.startAllTimers);

/**
 * @swagger
 * /api/timer/stop/{id}:
 *   put:
 *     summary: Arrêter un timer par ID
 *     tags: [Timer]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du timer
 *     responses:
 *       200:
 *         description: Timer arrêté avec succès
 *       404:
 *         description: Timer non trouvé
 *       500:
 *        description: Erreur serveur
 */
router.put('/timer/stop/:id', timerController.stopTimer);

/**
 * @swagger
 * /api/timer/stopAll:
 *   put:
 *     summary: Arrêter tous les timers
 *     tags: [Timer]
 *     responses:
 *       200:
 *         description: Tous les timers ont été arrêtés
 *       500:
 *        description: Erreur serveur
 */
router.put('/timer/stopAll', timerController.stopAllTimers);

/**
 * @swagger
 * /api/timer/changeSpeed/{id}:
 *   put:
 *     summary: Modifier la vitesse d'un timer
 *     tags: [Timer]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du timer
 *     responses:
 *       200:
 *         description: vitesse du timer modifiée avec succès
 *       404:
 *         description: Timer non trouvé
 *       500:
 *        description: Erreur serveur
 */
router.put('/timer/changeSpeed/:id', timerController.changeTimerSpeed);

router.put('/timer/changeAllSpeed', timerController.changeAllSpeeds);

module.exports = router;