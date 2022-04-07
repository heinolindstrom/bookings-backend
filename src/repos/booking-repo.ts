import { pool } from './pool';
import { IBooking, IBookingResult } from '@models/booking-model';

const bookingsForUserSql = `
SELECT booking.id,
       admin.email,
       booking.created_at,
       venue.name as venue_name,
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
LEFT OUTER JOIN public.user AS admin
             ON booking.admin_id = admin.id
WHERE  admin.email = $1
       AND booking.id > $2
GROUP  BY booking.id,
          admin.email,
          booking.created_at,
          venue.name,
          event.name,
          event.price,
          venue.country
LIMIT  $3`;

const countSql = `
SELECT COUNT(*)
FROM   public.booking
LEFT OUTER JOIN public.user AS admin
             ON booking.admin_id = admin.id
WHERE admin.email = $1
GROUP BY admin_id;`;

/**
 * Get all Bookings for User.
 *
 * @returns Promise<IBookingResult>
 */
async function getForUser(
  offset: number,
  email: string,
): Promise<IBookingResult> {
  const bookings = await pool.query(bookingsForUserSql, [email, offset, 10]);
  const counts = await pool.query(countSql, [email]);
  const count = counts['rows'].map((field) => field.count as number)[0] || 0;

  return {
    bookings: bookings['rows'] as IBooking[],
    count,
  } as IBookingResult;
}

// Export default
export default {
  getForUser,
} as const;
