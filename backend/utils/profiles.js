import getHandles from './handles.js';
import fs from 'fs';

// URL for profile data
const URL = 'https://codeforces.com/api/user.info?handles='

const fetchProfiles = async () => {
    try{
        const handles = getHandles();
        const profiles = [];
        for(let i = 0; i < handles.length; i+=500){
            const firstIdx = i;
            const lastIdx = Math.min(i+500, handles.length);
            // console.log(`Fetching profiles ${firstIdx} to ${lastIdx}`);
            const query = handles.slice(firstIdx, lastIdx).join(';');
            const response = await fetch(`${URL}${query}`);
            const data = await response.json();
            const result = data.result;
            for(let profile of result){
                if(profile.organization === "IIT Kharagpur"){
                    profiles.push(profile);
                }
            }
        }

        // Write as JSON
        const path = './utils/profiles.json';
        fs.writeFileSync(path, JSON.stringify(profiles));
    }catch(err){
        console.log(err.message)
    }
}

const getUsers = async () => {
    const path = './utils/profiles.json';
    try{
        const data = fs.readFileSync(path);
        const users = JSON.parse(data);
        return users;
    }
    catch(err){
        console.log(err.message);
    }
}
export {fetchProfiles, getUsers}