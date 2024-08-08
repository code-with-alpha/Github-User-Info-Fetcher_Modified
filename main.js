let githubUsername = 'code-with-alpha';

/* 
Github Usernames For Testing
1. code-with-alpha
2. SHaiderM16
3. C41f0N
4. abdullahazharkhan
5. raahimirfan100
*/

const main = async (githubUsername) => {
    try {
        const response = await fetch(`https://api.github.com/users/${githubUsername}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let githubData = await response.json();

        document.getElementById('user').textContent = githubData.name;

        showImage(githubData);
        showName(githubData);
        showUsername(githubData);
        showFollowers(githubData);
        showFollowing(githubData);
        showRepositories(githubData);

        if (githubData.bio) {
            let div = document.createElement('div');
            div.innerHTML = `<span>Bio:</span>
                        <span class="bio" ></span>`;
            document.querySelector('.right-box').appendChild(div);

            const bio = document.querySelector('.bio');
            bio.textContent = githubData.bio;
        }

        if (githubData.location) {
            let div = document.createElement('div');
            div.innerHTML = `<span>Location:</span>
                        <span class="location" ></span>`;
            document.querySelector('.right-box').appendChild(div);

            const location = document.querySelector('.location');
            location.textContent = githubData.location;
        }

        if (githubData.blog) {
            let div = document.createElement('div');
            div.innerHTML = `<span>Personal Website:</span>
                        <span class="blog" ></span>`;
            document.querySelector('.right-box').appendChild(div);

            const blog = document.querySelector('.blog');
            blog.textContent = githubData.blog;
        }

        await gitData(githubUsername);
    } catch (error) {
        console.error(error);
    }
}

const showImage = (githubData) => {
    const image = document.querySelector('.profile');
    image.src = githubData.avatar_url;
}

const showName = (githubData) => {
    const name = document.querySelector('.name');
    name.textContent = githubData.name;
}

const showUsername = (githubData) => {
    const userName = document.querySelector('.username');
    userName.textContent = githubData.login;
}

const showFollowers = (githubData) => {
    const followers = document.querySelector('.followers');
    followers.textContent = githubData.followers;
}

const showFollowing = (githubData) => {
    const following = document.querySelector('.following');
    following.textContent = githubData.following;
}

const showRepositories = (githubData) => {
    const repos = document.querySelector('.repos');
    repos.textContent = githubData.public_repos;
}

const getGithubData = async (githubUsername) => {
    try {
        const response = await fetch(`https://api.github.com/users/${githubUsername}/repos`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

const gitData = async (githubUsername) => {
    try {
        const reposData = await getGithubData(githubUsername);
        const allGitRepos = document.querySelector('.all-repos');
        reposData.forEach((repo) => {
            let div = document.createElement('div');
            let repoName = document.createElement('div');
            let repoDescription = document.createElement('p');

            repoName.textContent = repo.name;
            repoDescription.textContent = repo.description;
            div.appendChild(repoName);
            div.appendChild(repoDescription);

            allGitRepos.appendChild(div);
        });
    } catch (error) {
        console.error(error);
    }
}

main(githubUsername);