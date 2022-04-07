/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-misused-promises */
import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import bookingService from '@services/booking-service';

// Constants
const router = Router();
const { OK } = StatusCodes;

// Paths
export const p = {
  get: '/all/:offset?',
} as const;

/**
 * Get Bookings.
 */
router.get(p.get, async (req: Request, res: Response) => {
  const offset = req.params.offset ? parseInt(req.params.offset) : 0;
  const bookings = await bookingService.getAll(offset);
  return res.status(OK).json(bookings);
});

export default router;
