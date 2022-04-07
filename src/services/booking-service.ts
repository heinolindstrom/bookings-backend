import bookingRepo from '@repos/booking-repo';
import { IBooking } from '@models/booking-model';

/**
 * Get all users.
 *
 * @returns
 */
function getAll(offset: number): Promise<IBooking[]> {
  return bookingRepo.getAll(offset);
}

// Export default
export default {
  getAll,
} as const;
