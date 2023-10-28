// eslint-disable-next-line no-undef
test('Devo conhecer as principais assertivas do jest', () => {
  let number = null;
  expect(number).toBeNull();
  number = 10;
  expect(number).not.toBeNull();
  expect(number).toBe(10);
  expect(number).toEqual(10);
  expect(number).toBeGreaterThan(9);
  expect(number).toBeLessThan(11);
});

test('Devo saber trabalhar com objetos', () => {
  const obj = { name: 'Vitor', email: 'vitorbruno@gmail.com' };
  expect(obj).toHaveProperty('name');
  expect(obj).toHaveProperty('name', 'Vitor');
  expect(obj.name).toBe('Vitor');

  const obj2 = { name: 'Vitor', email: 'vitorbruno@gmail.com' };
  expect(obj).toEqual(obj2);
  expect(obj2).toBe(obj2);
});
