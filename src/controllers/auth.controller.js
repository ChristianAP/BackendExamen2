import { pool } from '../database'
import jwt_decode from 'jwt-decode';
const jwt = require('jsonwebtoken');
const helpers = require('../libs/helpers'); 
const bcrypt = require('bcryptjs');
const refreshTokens = [];
const secret = "dad-secret-access-token";
const refreshTokenSecret = "dad-secret-refresh-access-token";

export const login = async (req, res)=>{
    try {
        const { username, password } = req.body;
        const response = await pool.query('select u.idusuario, u.username, u.password, u.estado, r.idrol, r.nombre from usuarios u, roles r, usuarios_roles ur where u.idusuario = ur.idusuario and r.idrol = ur.idrol and u.username = $1 and u.estado = $2;', [username, '1']); 
            if(response.rows.length != 0){      
                            const passold = response.rows[0].password;
                    if(await bcrypt.compare(password, passold)){
                            const dato_login = {
                                idusuario : response.rows[0].idusuario,                    
                                username : response.rows[0].username,
                                password : response.rows[0].password,
                                estado : response.rows[0].estado,
                                idrol : response.rows[0].idrol,
                                nombre : response.rows[0].nombre
                            }
                            const accessToken = jwt.sign({dato_login}, secret, {expiresIn:'7200s'});
                            const refreshToken = jwt.sign({dato_login}, refreshTokenSecret);
                            refreshTokens.push(refreshToken);
                            
                            
                            
                        
                            return res.status(200).json({
                                accessToken,
                                refreshToken
                               
                                    
                            });
                    }else{
                            return res.status(403).json({
                                message: 'Username o Password incorrectos...!'
                            });
                    }
            }
           
    } catch (e) {
        console.log(e);
        return res.status(500).json({message: 'Error al validar usuario...!'});
    }    
};

export const token = async (req, res)=>{
    try {
        const { token } = req.body;
        if(!token){
            return res.sendStatus(401);
        }
        if(!refreshTokens.includes(token)){
            return res.sendStatus(403);
        }
        jwt.verify(token, refreshTokenSecret, (err, user)=>{
            if(err){
                return res.sendStatus(403);
            }
        });
    } catch (e) {
        console.log(e);
        
    }
};
