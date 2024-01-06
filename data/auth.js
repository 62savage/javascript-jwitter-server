let users = [
  {
    id: "1",
    username: "bob",
    password: "$2b$12$NzYKFhfO1EAILrmapW/ZMuT2GEECKswk/lt29N6aNPlY08MuiUVqq",
    name: "Bob",
    email: "bob@gmail.com",
    url: "asdf",
  },
];

export async function findByUsername(username) {
  return users.find((user) => user.username === username);
}

export async function findByUserId(userId) {
  return users.find((user) => user.id === userId);
}

export async function createUser(user) {
  const created = { ...user, id: Date.now().toString() };
  users.push(created);
  return created.id;
}
