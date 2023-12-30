let tweets = [
  {
    id: "1",
    text: "COOOOOOKI...E",
    createAt: Date.now().toString(),
    name: "CookieMonster",
    username: "CM",
    url: "https://i.scdn.co/image/ab6761610000e5eba3a7cba23d68a4e73c3b8155",
  },
  {
    id: "2",
    text: "fking awesome",
    createAt: Date.now().toString(),
    name: "Elmo",
    username: "elmo",
    url: "https://cdn.imweb.me/thumbnail/20220117/e348ef04e2135.jpeg",
  },
];

export async function getAll() {
  return tweets;
}

export async function getAllByUserName(username) {
  return tweets.filter((t) => t.username === username);
}

export async function getById(id) {
  return tweets.find((t) => t.id === id);
}

export async function create(text, name, username) {
  const tweet = {
    id: Date.now().toString(),
    text,
    createAt: new Date(),
    name,
    username,
  };
  tweets = [tweet, ...tweets];
  return tweet;
}

export async function update(id, text) {
  const tweet = tweets.find((t) => t.id === id);
  if (tweet) {
    tweet.text = text;
  }
  return tweet;
}

export async function remove(id) {
  tweets = tweets.filter((t) => t.id !== id);
}
export default tweets;
