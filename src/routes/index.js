const express = require('express');
const router = express.Router();
const timerController = require('../controllers/timerController');
const buttonController = require('../controllers/buttonController');
const gameController = require('../controllers/gameController');
const echosImagesController = require('../controllers/echosImagesController');

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

/**
 * @swagger
 * /api/timer/changeAllSpeed:
 *   put:
 *     summary: Modifier la vitesse de tous les timers
 *     tags: [Timer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               speed:
 *                 type: number
 *                 description: Nouvelle vitesse à appliquer à tous les timers (ex -> 2 pour doubler la vitesse)
 *     responses:
 *       200:
 *         description: vitesse des timers modifiée avec succès
 *       404:
 *         description: Aucun timer trouvé
 *       500:
 *        description: Erreur serveur
 */
router.put('/timer/changeAllSpeed', timerController.changeAllSpeeds);

/**
 * @swagger
 * tags:
 *   name: Button
 *   description: Gestion des boutons
 */

/**
 * @swagger
 * /api/button:
 *   get:
 *     summary: Modifier la vitesse d'un timer
 *     tags: [Button]
 *     responses:
 *       200:
 *         description: Boutons récupérés avec succès
 *       404:
 *         description: Aucun bouton trouvé
 *       500:
 *        description: Erreur serveur
 */
router.get('/button', buttonController.getButtons);

/**
 * @swagger
 * /api/button/{id}:
 *   get:
 *     summary: Récupérer un bouton par ID
 *     tags: [Button]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du bouton
 *     responses:
 *       200:
 *         description: Bouton récupéré avec succès
 *       404:
 *         description: Bouton non trouvé
 *       500:
 *        description: Erreur serveur
 */
router.get('/button/:id', buttonController.getButton);

/**
 * @swagger
 * /api/button/press/{id}:
 *   put:
 *     summary: presser un bouton
 *     tags: [Button]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du bouton
 *     responses:
 *       200:
 *         description: Bouton pressé avec succès
 *       404:
 *         description: Bouton non trouvé
 *       500:
 *        description: Erreur serveur
 */
router.put('/button/press/:id', buttonController.pressButton);

/**
 * @swagger
 * tags:
 *   name: Game
 *   description: Gestion du jeu
 */

/**
 * @swagger
 * /api/game/pacte/start:
 *   post:
 *     summary: Démarrer le jeu Pacte
 *     tags: [Game]
 *     responses:
 *       200:
 *         description: Jeu Pacte démarré avec succès
 *       500:
 *        description: Erreur serveur
 */
router.post('/game/pacte/start', gameController.startPacte);

/**
 * @swagger
 * /api/game/pacte/stop:
 *   post:
 *     summary: Arrêter le jeu Pacte
 *     tags: [Game]
 *     responses:
 *       200:
 *         description: Jeu Pacte arrêté avec succès
 *       500:
 *        description: Erreur serveur
 */
router.post('/game/pacte/stop', gameController.stopPacte);

/**
 * @swagger
 * /api/game/echos/start:
 *   post:
 *     summary: Démarrer le jeu Echos du mur
 *     tags: [Game]
 *     responses:
 *       200:
 *         description: Jeu Echos du mur démarré avec succès
 *       500:
 *        description: Erreur serveur
 */
router.post('/game/echos/start', gameController.startEchos);

/**
 * @swagger
 * /api/game/echos/stop:
 *   post:
 *     summary: Arrêter le jeu Echos du mur
 *     tags: [Game]
 *     responses:
 *       200:
 *         description: Jeu Echos du mur arrêté avec succès
 *       500:
 *        description: Erreur serveur
 */
router.post('/game/echos/stop', gameController.stopEchos);

/**
 * @swagger
 * tags:
 *   name: Echos du Mur
 *   description: Données liées aux images des échos du mur
 */

/**
 * @swagger
 * /api/imagesEchos/color/{id}:
 *   post:
 *     summary: Récupère l'index actuel correspondant à la couleur renseignée en paramètre
 *     tags: [Echos du Mur]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Ce n'est pas l'id mais la couleur dont on veut connaître l'index
 *     responses:
 *       200:
 *         description: Index récupéré avec succès
 *       404:
 *        description: Aucune image trouvée pour la couleur spécifiée
 *       500:
 *        description: Erreur serveur
 */
router.get('/imagesEchos/color/:id', echosImagesController.getIndexByColor);

module.exports = router;