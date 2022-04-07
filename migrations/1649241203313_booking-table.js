/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('booking', {
    id: 'id',
    created_at: { type: 'date', notNull: true },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('booking', {});
};
