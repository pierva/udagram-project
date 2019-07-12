import { Router, Request, Response } from 'express';
import { UserRouter } from './users/routes/user.router';
import { FilterRouter } from './filter/routes/filter.router';

const router: Router = Router();

router.use('/users', UserRouter);
router.use('/filter', FilterRouter);

router.get('/', async (req: Request, res: Response) => {
    res.send(`V0`);
});

export const IndexRouter: Router = router;
