import { Router } from 'express'

const router = Router();

import * as userCtr from '../controllers/user.controller'
const { checkTokenAdmin, checkTokenPost } = require('../auth/token_validation');

router.get('/',checkTokenAdmin ,userCtr.readAllUsers);
router.post('/create', userCtr.createUser);



export default router;