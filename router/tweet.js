import express from "express";

const router = express.Router();

let tweets = [
  {
    id: "1",
    text: "집중하는 시간을 늘리자!",
    createAt: Date.now().toString(),
    name: "CookieMonster",
    username: "CM",
    url: "https://i.scdn.co/image/ab6761610000e5eba3a7cba23d68a4e73c3b8155",
  },
  {
    id: "2",
    text: "안녕",
    createAt: Date.now().toString(),
    name: "Elmo",
    username: "elmo",
    url: "https://cdn.imweb.me/thumbnail/20220117/e348ef04e2135.jpeg",
  },
];

router.get("/", (req, res, next) => {
  const { username } = req.query;
  const data = username
    ? tweets.filter((t) => t.username === username)
    : tweets;
  res.status(200).json(data);
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  // wrong - 있는지 없는지 + filter가 아니라 find
  const tweet = tweets.find((t) => t.id === id);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
});

router.post("/", (req, res, next) => {
  const { text, name, username } = req.body;
  const tweet = {
    id: Date.now().toString(),
    text,
    createAt: new Date(),
    name,
    username,
  };
  tweets = [tweet, ...tweets];
  res.status(201).json(tweet);
});

router.put("/:id", (req, res, next) => {
  const { id } = req.params;
  const { text } = req.body;
  const tweet = tweets.find((t) => t.id === id);
  if (tweet) {
    tweet.text = text;
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
});

router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  tweets = tweets.filter((t) => t.id !== id);
  res.sendStatus(204);
});

export default router;
