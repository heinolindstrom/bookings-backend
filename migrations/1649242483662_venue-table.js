/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('venue', {
    id: 'id',
    created_at: { type: 'date', notNull: true },
    name: { type: 'varchar(512)', notNull: true },
    country: { type: 'varchar(3)', notNull: true },
  });

  pgm.addColumns('booking', { venue_id: { type: 'int', references: 'venue' } });
};

exports.down = (pgm) => {
  pgm.dropTable('venue', { cascade: true });
  pgm.dropColumns('booking', ['venue_id'], { cascade: true });
};
