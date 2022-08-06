import { Router } from "express";
import { getRanking } from "../controllers/rankingControllers.js";

const router = Router();

router.get('/', getRanking);

export default router;