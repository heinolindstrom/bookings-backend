import { pool } from './pool';
import { IBooking } from '@models/booking-model';

const sql = `
SELECT booking.id,
       booking.created_at,
       venue.name,
       event.name,
       event.price,
       venue.country,
       array_agg(u.name) AS people
FROM   public.booking
INNER JOIN event
        ON booking.event_id = event.id
INNER JOIN venue
        ON booking.venue_id = venue.id
LEFT OUTER JOIN participant
             ON participant.event_id = booking.event_id
LEFT OUTER JOIN public.user AS u
             ON participant.user_id = u.id
WHERE  booking.id > $1
GROUP  BY booking.id,
          booking.created_at,
          venue.name,
          event.name,
          event.price,
          venue.country
LIMIT  $2`;

/**
 * Get all users.
 *
 * @returns
 */
async function getAll(offset: number): Promise<IBooking[]> {
  const db = await pool.query(sql, [offset, 10]);
  return db['rows'] as IBooking[];
}

// Export default
export default {
  getAll,
} as const;
