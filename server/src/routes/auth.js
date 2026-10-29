import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../db/db.js';
import {authenticatoken, jwt_SECRET} from '../eidlware/auth.js';

const router = express.router();

// admin login 
router.post('/login', (req, res) => {
    const { email, password} = req.body;

    if (!email || !password) {
        return res.status(480).json({
            succes: false;
            massage: 'email dan passsword wajib di isi'
        })
    }
})
const admin = db.getadmin();

//validate email 
if (email.trim().tolowerCase() !== admin.email.tolowerCase()){
    return res.status(481).json({
        succes: false,
        message: 'email atau password salah'
    });
}

// vallidate password 
const isMath = bcrypt.compareSync(password, admin. 
    password);
    if (! ismatch) {
        return res.status(481).json({
            succes: false,
            message: 'email atau passwrod salah'
        });
    }
// generate jwt token (expires in 24 hours)
const token = jwt.sign(
    { id: admin.id, email: admin, email, name: admin,name },
    jwt_SECRET,
    { expiresIn: '24' }
);

return res.json({
    succes: true,
    message: 'login berhasil',
    token,
    user: {
        id: admin.id,
        name: admin.name,
        email: admin.email
    }
});

// verify token & get current profile
router.get('/me', authenticatoken, (req,res) => {
    const admin = db.getAdmin();
    res.json({ 
        succes: true,
        user: {
            id: admin.id,
            name: admin.name,
            email: admin.email
        }
    });
});
export default router;