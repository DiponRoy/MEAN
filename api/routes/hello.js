import express from 'express'
import { authenticate, developer } from '../middlewares/all.js'



const router = express.Router()


router.get('/', (req, res) => {
    let message = req.query.msg;
    if(!message) {
        message = 'Hello'
    }
    res.send(message);
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id
    if(!parseInt(id,10)){
        return next();//skip this route if not a number
     }

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


/*
GET /auth
with land request to 
router.get('/:id', (req, res) => {

so done https://stackoverflow.com/a/46128849/2948523
*/
router.get('/auth', (req, res) => {
    let authorization = req.headers.authorization;
    if(!authorization) {
        authorization = null
    }
    res.json({authorization_header: authorization});
});


router.get('/user', authenticate, (req, res) => {
    res.json({user: req.user});
});

router.get('/developer', developer, (req, res) => {
    res.json({developer: req.developer});
});

// 






/*------------------------------------------------- Error --------------------------------------*/
router.get('/error', (req, res, next) => {
    throw new Error('Something bad happened');
    
    /*or use*/
    // try {
    //     throw new Error('Something bad happened');
    // } catch (error) {
    //     next(error)
    // }
});






export default router
// module.exports = router;