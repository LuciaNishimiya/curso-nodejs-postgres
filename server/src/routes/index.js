import { Router } from 'express';

import usersRouter from './users.js';

function routerApi(app) {
  const router = Router();
  app.use('/api/v1', router);
  router.use('/users', usersRouter);
}

export default routerApi;
