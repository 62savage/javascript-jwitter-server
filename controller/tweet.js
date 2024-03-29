import * as tweetRepository from "../data/tweet.js";
import {} from "express-async-errors";

export async function getTweets(req, res) {
  const { username } = req.query;
  const data = await (username
    ? tweetRepository.getAllByUserName(username)
    : tweetRepository.getAll());
  res.status(200).json(data);
}

export async function getTweet(req, res) {
  const { id } = req.params;
  const tweet = await tweetRepository.getById(id);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
}

export async function createTweet(req, res) {
  const { text, name, username } = req.body;
  const tweet = await tweetRepository.create(text, name, username);
  res.status(201).json(tweet);
}

export async function updateTweet(req, res) {
  const { id } = req.params;
  const { text } = req.body;
  const tweet = await tweetRepository.update(id, text);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
}

export async function deleteTweet(req, res) {
  const { id } = req.params;
  await tweetRepository.remove(id);
  res.sendStatus(204);
}
