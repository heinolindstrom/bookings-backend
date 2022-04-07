/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('event', {
    id: 'id',
    created_at: { type: 'date', notNull: true },
    name: { type: 'varchar(512)', notNull: true },
    date: { type: 'date', notNull: true },
    duration: { type: 'int' },
    price: { type: 'int' },
  });

  pgm.addColumns('booking', { event_id: { type: 'int', references: 'event' } });
};

exports.down = (pgm) => {
  pgm.dropTable('event', { cascade: true });
  pgm.dropColumns('booking', ['event_id'], { cascade: true });
};
