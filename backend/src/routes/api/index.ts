import express from 'express';
import exerciseTypesRoutes from './exercise-types-routes';
import workoutsRoutes from './workouts-routes';
import userRoutes from './user-routes';

const router = express.Router();

router.use('/exercise-types', exerciseTypesRoutes);
router.use('/workouts',workoutsRoutes);
router.use('/users',userRoutes);

export = router;
