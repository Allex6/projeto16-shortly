import { Router } from "express";
import { deleteUrl, getById, openUrl, shorten } from "../controllers/urlsControllers.js";
import validateAuthentication from "./middlewares/validateAuthentication.js";
import validateUrlData from "./middlewares/validateUrlData.js";

const router = Router();

router.post('/shorten', validateAuthentication, validateUrlData, shorten);
router.get('/:id', getById);
router.get('/open/:shortUrl', openUrl);
router.delete('/:id', validateAuthentication, deleteUrl);

export default router;