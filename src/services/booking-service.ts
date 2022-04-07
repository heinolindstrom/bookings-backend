import bookingRepo from '@repos/booking-repo';
import { IBookingResult } from '@models/booking-model';

function getForUser(offset: number, email: string): Promise<IBookingResult> {
  return bookingRepo.getForUser(offset, email);
}

export default {
  getForUser,
} as const;
