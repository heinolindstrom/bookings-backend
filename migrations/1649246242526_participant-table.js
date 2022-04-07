/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('participant', {
    id: 'id',
    created_at: { type: 'date', notNull: true },
  });

  pgm.addColumns('participant', {
    event_id: { type: 'int', references: 'event' },
  });
  pgm.addColumns('participant', {
    user_id: { type: 'int', references: 'user', cascade: true },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('participant', { cascade: true });
};
