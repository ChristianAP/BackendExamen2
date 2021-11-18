import { pool } from '../database'
const helpers = require('../libs/helpers');


export const readAllUsers = async(req, res)=>{
    try {
        const response = await pool.query('select u.idusuario, u.username, u.password, u.estado, r.idrol, r.nombre from usuarios u, roles r, usuarios_roles ur where u.idusuario = ur.idusuario and r.idrol = ur.idrol;');
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!');
    }
}

export const createUser = async(req, res)=>{
    try {
        const{ username, password, idrol} = req.body;
        const password2 = await helpers.encryptPassword(password);

        await pool.query('insert into usuarios(username, password, estado) values($1,$2,1)', [username, password2]);

        const response = await pool.query('select idusuario from usuarios where username = $1', [username]);

        const idus = response.rows[0].idusuario;
        await pool.query('insert into usuarios_roles(idusuario, idrol) values ($1, $2)', [idus, idrol]);

        return res.status(200).json(
            `Usuario ${ username } creado correctamente...!`);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!');
    }
}