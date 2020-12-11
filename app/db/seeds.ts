import db from './index';
import { hashPassword } from 'app/auth/auth-utils';

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * or https://github.com/Marak/Faker.js to easily generate
 * realistic data.
 */
const seed = async () => {
  const hashedPassword = await hashPassword('password');
  await db.user.create({
    data: {
      email: 'admin@example.com',
      hashedPassword,
      role: 'admin',
    },
  });
};

export default seed;
