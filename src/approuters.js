import { Router } from 'express';

let router = Router(); //eslint-disable-line new-cap

router.get('/', (req, res) => {
	res.render('index');
});

export default router;
