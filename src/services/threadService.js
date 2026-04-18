import Thread from "../models/Thread.js";

export const fetchAllThreads = async () => {
  const threads = await Thread.find().populate("author").populate("subreddit");
  return threads;
};

export const fetchThreadById = async (id) => {
  const thread = await Thread.findById(id).populate("author").populate("subreddit");
  return thread;
};

export const createNewThread = async (title, content, author, subreddit) => {
  const thread = new Thread({ title, content, author, subreddit });
  await thread.save();
  return thread;
};

export const updateThreadById = async (id, updates) => {
  const thread = await Thread.findByIdAndUpdate(id, updates, { new: true }).populate("author").populate("subreddit");
  return thread;
};

export const deleteThreadById = async (id) => {
  const result = await Thread.findByIdAndDelete(id);
  return result;
};
