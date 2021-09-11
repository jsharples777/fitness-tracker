import express from 'express';
import exerciseTypesRoutes from './exercise-types-routes';
import workoutsRoutes from './workouts-routes';

const router = express.Router();

router.use('/exercise-types', exerciseTypesRoutes);
router.use('/workouts',workoutsRoutes);

export = router;
