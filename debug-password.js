import bcrypt from 'bcryptjs';

async function testPassword() {
  const password = 'admin123';

  // Hash like in seed
  const hash1 = await bcrypt.hash(password, 10);
  console.log('Hash with 10 rounds:', hash1);

  // Test comparison
  const isValid1 = await bcrypt.compare(password, hash1);
  console.log('Comparison result:', isValid1);

  // Hash like in seed again to see if it's consistent
  const hash2 = await bcrypt.hash(password, 10);
  console.log('Second hash:', hash2);

  const isValid2 = await bcrypt.compare(password, hash2);
  console.log('Second comparison:', isValid2);
}

testPassword().catch(console.error);
