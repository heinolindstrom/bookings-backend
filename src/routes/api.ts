import { Router } from 'express';
import bookingRouter from './booking-router';

// Export the base-router
const baseRouter = Router();

// Setup routers
baseRouter.use('/bookings', bookingRouter);

// Export default.
export default baseRouter;
