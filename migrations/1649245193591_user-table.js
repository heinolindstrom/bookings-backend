/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('user', {
    id: 'id',
    created_at: { type: 'date', notNull: true },
    name: { type: 'varchar(512)', notNull: true },
    email: { type: 'varchar(320)', notNull: true },
  });

  pgm.addColumns('booking', { admin_id: { type: 'int', references: 'user' } });
};

exports.down = (pgm) => {
  pgm.dropTable('user', { cascade: true });
  pgm.dropColumns('booking', ['admin_id'], { cascade: true });
};
