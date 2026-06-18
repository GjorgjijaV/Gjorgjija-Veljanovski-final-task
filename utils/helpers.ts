export function generateUser() {
  const id = `${Date.now()}${Math.random().toString(8)}`

  return {
    name: `GjorgjijaTest-${id}`,
    email: `Gjorgjija-test-${id}@mail.com`,
  };
}