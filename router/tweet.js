import express from "express";

const router = express.Router();

let tweets = [
  {
    id: "1",
    text: "집중하는 시간을 늘리자!",
    createAt: Date.now().toString(),
    name: "Bob",
    username: "bob",
    url: "https://t1.daumcdn.net/cfile/tistory/18777A4A4EC0CFE941",
  },
  {
    id: "2",
    text: "안녕",
    createAt: Date.now().toString(),
    name: "Elmo",
    username: "elmo",
    url: "https://t1.daumcdn.net/cfile/tistory/18777A4A4EC0CFE941",
  },
];

router.get("/", (req, res, next) => {
  const { username } = req.query;
  const data = username
    ? tweets.filter((t) => t.username === username)
    : tweets;
  //vs res.status(200).json(tweets);
  res.status(200).send(data);
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  // wrong - 있는지 없는지 + filter가 아니라 find
  const tweet = tweets.find((t) => t.id === id);
  if (tweet) {
    res.status(200).send(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
});

router.post("/", (req, res, next) => {
  const { text, name, username } = req.body;
  const tweet = {
    id: Date.now().toString(),
    text,
    createAt: Date.now().toString(),
    name,
    username,
  };
  tweets = [tweet, ...tweets];
  res.status(201).send(tweet);
});

router.put("/:id", (req, res, next) => {
  const { id } = req.params;
  const { text } = req.body;
  const tweet = tweets.find((t) => t.id === id);
  if (tweet) {
    tweet.text = text;
    res.status(200).send(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
});

router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  tweets = tweets.filter((t) => t.id !== id);
  res.status(204);
});

export default router;
