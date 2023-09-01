const searchButton = document.querySelector('.topbar button');
const searchInput = document.querySelector('.topbar input');

const getProfile = async (handle) => {
    const response = await fetch(`http://localhost:8080/api/${handle}/profile`);
    const data = await response.json();
    return data[0]
};

const renderProfile = (profile) => {
    const profileContainer = document.querySelector('.profile');

    /*
    avatar
: 
"https://userpic.codeforces.org/635161/avatar/fce2ab40129393ae.jpg"
contribution
: 
0
country
: 
"India"
email
: 
"bhutadachaitanya@gmail.com"
firstName
: 
"Chaitanya"
friendOfCount
: 
186
handle
: 
"chaitanya"
lastName
: 
"Bhutada"
lastOnlineTimeSeconds
: 
1693420718
maxRank
: 
"master"
maxRating
: 
2175
organization
: 
"IIT Kharagpur"
rank
: 
"master"
rating
: 
2175
registrationTimeSeconds
: 
1508004966
titlePhoto
: 
"https://userpic.codeforces.org/635161/title/33d829b0e8b0c8a0.jpg"
    */

    const profileHTML = `
        <div class="profile-avatar">
            <img src="${profile.avatar}" alt="avatar">
        </div>
        <div class="profile-info">
            <div class="profile-info-item">
                <span class="profile-info-item-title">Handle</span>
                <span class="profile-info-item-value">${profile.handle}</span>
            </div>
            <div class="profile-info-item">
                <span class="profile-info-item-title">Name</span>
                <span class="profile-info-item-value">${profile.firstName} ${profile.lastName}</span>
            </div>
            <div class="profile-info-item">
                <span class="profile-info-item-title">Country</span>
                <span class="profile-info-item-value">${profile.country}</span>
            </div>
            <div class="profile-info-item">
                <span class="profile-info-item-title">Organization</span>
                <span class="profile-info-item-value">${profile.organization}</span>
            </div>
            <div class="profile-info-item">
                <span class="profile-info-item-title">Rank</span>
                <span class="profile-info-item-value">${profile.rank}</span>
            </div>
            <div class="profile-info-item">
                <span class="profile-info-item-title">Rating</span>
                <span class="profile-info-item-value">${profile.rating}</span>
            </div>
            <div class="profile-info-item">
                <span class="profile-info-item-title">Max Rank</span>
                <span class="profile-info-item-value">${profile.maxRank}</span>
            </div>
            <div class="profile-info-item">
                <span class="profile-info-item-title">Max Rating</span>
                <span class="profile-info-item-value">${profile.maxRating}</span>
            </div>
            
        </div>
    `;
    profileContainer.innerHTML = profileHTML;


}
searchButton.addEventListener('click', async () => {
    // Fetch profile data
    const profile = await getProfile(searchInput.value);
    // Render profile data
    renderProfile(profile);

});