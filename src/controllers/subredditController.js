import {
  fetchAllSubreddits,
  createNewSubreddit,
  fetchSubredditWithThreads,
} from "../services/subredditService.js";

export const getAllSubreddits = async (req, res) => {
  // YOUR CODE HERE
  try {

  // to fetch all subreddits from the database
  const subreddits = await fetchAllSubreddits();
  if (!subreddits.length == 0) {
    // to check if there are no subreddits found and send a response indicating that
    const output = { success: false, message: "No subreddits found" };
    res.status(404).json(output);
  }
  // to send the fetched subreddits as a JSON response
  const output = { success: true, data: subreddits , message: "Subreddit found"};
  res.json(output)
  } catch (error) {
    // to handle any errors that occur during the process and send an error response
    const output = { success: false, message: "Error finding subreddits" };
    res.status(500).json(output);
  }

};

export const createSubreddit = async (req, res) => {
  // YOUR CODE HERE
  try {
    if (!req.body.name) {

      return res.status(400).json({ success: false, message: "Name is required" });
    }
    if (!req.body.author) {
      return res.status(400).json({ success: false, message: "Author is required" });
    }
    const subreddit = await createNewSubreddit(
      req.body.name, 
      req.body.description, 
      req.body.author)
      if (!subreddit) {
        return res.status(409).json({ 
          success: false, 
          message: "Subreddit already exists" 
        })
  }
  res. status(201).json({ 
    success: true, 
    data: subreddit, message: "Subreddit created successfully"
   })
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: "Error creating subreddit" 
    });
  }


  // to extract the name, description, and author from the request bod
};

export const getSubredditWithThreads = async (req, res) => {
  // YOUR CODE HERE
  try {
    const subreddit = await fetchSubredditWithThreads(req.params.id);
    if (!subreddit) {
      return res.status(404).json({ 
        success: false, 
        message: "Subreddit not found"
       });
    }
    res.json({ 
      success: true, 
      data: subreddit, 
      message: "Subreddit with threads found" })
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Error finding subreddit with threads" 
    });
  }
};
