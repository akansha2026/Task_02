const tableBody = document.querySelector('tbody');
const searchButton = document.querySelector('.topbar button');
const searchInput = document.querySelector('.topbar input');

// State of the application
let users = [];

const getLeaderboard = async () => {
    const response = await fetch('http://localhost:8080/api/leaderboard');
    const data = await response.json();
    return data;
};

const renderLeaderboard = async (leaderboard) => {
    for(let i = 0; i < leaderboard.length; i++){
        const row = tableBody.insertRow();
        const rank = row.insertCell();
        const handle = row.insertCell();
        const rating = row.insertCell();
        const maxRating = row.insertCell();
        const contribution = row.insertCell();
        const organization = row.insertCell();
        rank.innerHTML = i + 1;
        handle.innerHTML = `<a href="https://codeforces.com/profile/${leaderboard[i].handle}">${leaderboard[i].handle}</a>`
        rating.innerHTML = leaderboard[i].rating;
        maxRating.innerHTML = leaderboard[i].maxRating;
        contribution.innerHTML = leaderboard[i].contribution;
        organization.innerHTML = leaderboard[i].organization;
    }
};

// Render leaderboard on page load
document.addEventListener('DOMContentLoaded', async () => {
    const leaderboard = await getLeaderboard();
    // Update the state
    users = leaderboard;
    renderLeaderboard(leaderboard);
});

searchButton.addEventListener('click', async () => {
    // Search all the users from the state that are similar to the input
    const filteredUsers = users.filter(user => user.handle.toLowerCase().includes(searchInput.value.toLowerCase()));
    // Clear the table body
    tableBody.innerHTML = '';
    // Render the filtered users
    renderLeaderboard(filteredUsers);
});
