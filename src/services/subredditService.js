import Subreddit from "../models/Subreddit.js";
import Thread from "../models/Thread.js";

export const fetchAllSubreddits = async () => {
  // YOUR CODE HERE
  const subreddits = await Subreddit.find();
  return subreddits;
};

export const createNewSubreddit = async (name, description, author) => {
  // YOUR CODE HERE
  // to check exisitng subreedits with same name
  const existingSubreddit = await Subreddit.findOne({ name });
  if (existingSubreddit) {
    //throw new Error("Subreddit with the same name already exists");
    return
  }
  // without subreedits with same name create new subreddit
  const data = {name, description, author};
  //v1 
 // const subreddit = await Subreddit.create(data); // create new subreddit with the provided data
 //v2
   const subreddit = new Subreddit(data);
    await subreddit.save(); // save the new subreddit to the database  
 return subreddit;
  //const subreddit = await Subreddit.create({ 
  //  name, 
   // description,
    // author
     //});
};

export const fetchSubredditWithThreads = async (id) => {
  // YOUR CODE HERE
  // to find the subreddit by id
  const subreddit = await Subreddit.findById(id);
  if (!subreddit) {
    return
    //throw new Error("Subreddit not found");
  }
  // to find all threads associated with the subreddit and populate the author field
  const threads = await Thread.find({subreddit: id}).populate("author");
  return { subreddit, threads };
};
