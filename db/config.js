const {
  DB_DIALECT,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
} = process.env;

module.exports = {
  dialect: DB_DIALECT,
  host: DB_HOST,
  port: DB_PORT || '',
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME || '',
  logging: false,
  define: {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
};
