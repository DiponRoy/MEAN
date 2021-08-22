import express from 'express'

const router = express.Router()


router.get('/', (req, res) => {
    res.send('Hello');
});

router.get('/:id', (req, res) => {
    const id = req.params.id
    res.json({id: id});
});

router.post('/', (req, res) => {
    const body = req.body
    res.json({body: body});
});

router.put('/:id', (req, res) => {
    const id = req.params.id
    const body = req.body
    res.json({id: id, body: body});
});
 

/**
 * @swagger
 * /api/hello/{id}:
 *   delete:
 *     summary: Remove the item by id
 *     tags: [Hello]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The item id
 * 
 *     responses:
 *       200:
 *         description: The item was deleted
 *       404:
 *         description: The item was not found
 */
router.delete('/:id', (req, res) => {
    const id = req.params.id
    const item = {id: id}
    res.json(item);
});

export default router
// module.exports = router;