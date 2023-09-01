import { Router } from "express";
import { getUsers} from '../utils/profiles.js';

// Set up the express app
const router = Router();

// URL for profile data
const URL = 'https://codeforces.com/api/user.info?handles='

// Get user profile data
router.get('/:handle/profile', async (req, res) => {
    const {handle} = req.params;
    try{
        const response = await fetch(`${URL}${handle}`);
        const data = await response.json();
        res.status(200).json(data.result);
    }catch(err){
        console.log(err.message)
        res.status(500).json({message: err.message});
    }
});

// Get user ratings data
router.get('/:handle/ratings', async (req, res) => {
    const {handle} = req.params;
    try{
        // Get realtime rating data
        const response = await fetch(`https://codeforces.com/api/user.rating?handle=${handle}`);
        const data = await response.json();
        const ratings = data.result;
        res.status(200).json(ratings);
    }catch(err){
        console.log(err.message)
        res.status(500).json({message: err.message});
    }
});

// Leaderboard
router.get('/leaderboard', async (req, res) => {
    try{
        // Get all the users from the JSON file
        const users = await getUsers();
        // sort all the users on decreasing order of rating
        users.sort((a, b) => b.rating - a.rating);
        res.status(200).json(users);
    }catch(err){
        console.log(err.message)
        res.status(500).json({message: err.message});
    }
});


export default router