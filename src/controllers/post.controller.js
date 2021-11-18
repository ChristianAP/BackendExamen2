import { pool } from '../database'


// LISTAR POSTS
export const readAllPosts = async(req, res) => {
    try {
        const response = await pool.query('select * from posts');
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error...!');
    }
}

// LISTAR POSTS ID
export const readAllPostsID = async(req, res) => {
    const id = parseInt(req.params.id);
    try {
        const response = await pool.query('select * from posts where idposts = $1', [id]);
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error...!');
    }
}

// CREAR POSTS
export const createPost = async(req, res) => {
    try {
        const { titulo, descripcion } = req.body;
        await pool.query('insert into posts(titulo, descripcion) values ($1, $2)', 
                        [ titulo, descripcion ]);
        return res.status(200).json(
            `Título ${ titulo } creado correctamente...!` );
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error...!');
    }
}

//ELIMINAR POSTS
export const deletePosts = async(req, res) => {
    try {
        const id = parseInt(req.params.id);
        const response = await pool.query('delete from posts where idposts=$1', [id]);

        return res.status(200).json(
            `Título ${ id } eliminado correctamente...!`);
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error...!');
    }
}

//MODIFICAR POSTS
export const updatePosts = async(req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { titulo, descripcion } = req.body;
        await pool.query('update posts set titulo=$1, descripcion=$2 where idposts=$3', 
        [ titulo, descripcion, id]);

        return res.status(200).json(
            `Título  ${ titulo } se ha actualizado correctamente...!`);
    } catch (e) {
        console.log(e)
        return res.status(500).json('Internal Server error...!');
    }
}