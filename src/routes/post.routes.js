import { Router } from 'express'

const router = Router();

import * as postCtr from '../controllers/post.controller'
const { checkTokenAdmin, checkTokenPost } = require('../auth/token_validation');

router.get('/', checkTokenPost ,postCtr.readAllPosts);

router.get('/:id', checkTokenPost ,postCtr.readAllPostsID);

router.post('/create',checkTokenPost, postCtr.createPost);

router.put('/update/:id', checkTokenPost, postCtr.updatePosts);

router.delete('/delete/:id', checkTokenPost, postCtr.deletePosts);



export default router;