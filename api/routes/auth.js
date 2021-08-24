import express from "express";
import { body, query, validationResult  } from "express-validator";

import { validate } from '../middlewares/all.js'


const router = express.Router()


router.post(
    "/token", 
    [
        body("userName").not().isEmpty(),
        body("password").not().isEmpty(),  
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const userName = req.body.userName;
        const password = req.body.password;
        res.json({
            userName: userName,
            password: password,
            token: "token"
        });
    }
);

router.get(
    "/token/refresh", 
    validate([
        query("token").not().isEmpty()
    ]),
    (req, res) => {
        const oldToken = req.query.token;
        res.json({
            oldToken: oldToken,
            newToken: "token"
        }); 
    }
);

export default router
// module.exports = router;