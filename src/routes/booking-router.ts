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
  getForUser: '/:email/:offset?',
} as const;

/**
 * Get Bookings.
 */
router.get(p.getForUser, async (req: Request, res: Response) => {
  const offset = req.params.offset ? parseInt(req.params.offset) : 0;
  const email = req.params.email ? req.params.email : undefined;
  if (!email) {
    throw 'Email missing';
  }

  const bookings = await bookingService.getForUser(offset, email);
  return res.status(OK).json(bookings);
});

export default router;
