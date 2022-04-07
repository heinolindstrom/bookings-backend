export interface IParticipant {
  name: string;
  email: string;
}

export interface IBooking {
  id: number;
  created_at: Date;
  admin_email: string;
  venue_name: string;
  people: IParticipant[];
}
