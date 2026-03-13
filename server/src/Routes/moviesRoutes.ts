import express, { Router } from "express";
import {
  getAllMovies,
  getRandomMovie,
  addFavoriteMovie,
  removeFavoriteMovie,
  getFavMovieByUser,
  getMovieByIdFunc,
} from "../Controller/movieController";
import authenticateUser from "../middleware/authMiddleware";

const router: Router = express.Router();

router.get("/getRandomMovie", authenticateUser, getRandomMovie);
router.get("/getAllMovies", authenticateUser, getAllMovies);
router.get("/getFavMovieByUser", authenticateUser, getFavMovieByUser);
router.post("/addFavoriteMovie", authenticateUser, addFavoriteMovie);
router.post("/removeFavoriteMovie", authenticateUser, removeFavoriteMovie);
router.get("/getMovieById/:movieId", getMovieByIdFunc);

export default router;
