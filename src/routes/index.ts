import { Router } from "express";
import MemeRoute from "./meme.route";
import CommentRoute from "./comment.route";
import LikeRoute from "./like.route";
import AuthRoute from "./auth.route";

const router = Router();

router.use('/memes', MemeRoute);
router.use('/comments', CommentRoute);
router.use('/likes', LikeRoute);
router.use('/auth', AuthRoute);

export default router;