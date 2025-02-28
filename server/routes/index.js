import { Router } from 'express';
var router = Router();

/* GET home page. */
router.get('/', function (req, res, next)
{
  res.send({ message:"hello"})
});

export default router;
