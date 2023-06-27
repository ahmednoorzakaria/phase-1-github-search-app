document .addEventListener('DOMContentLoaded',fetchNames)

function fetchNames() {
    let form = document.querySelector('form');
    let content = document.querySelector('#search');
    form.addEventListener('submit', function(event) {
      event.preventDefault(); 
      fetch(`https://api.github.com/search/users?q=${content.value}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.github.v3+json'
        }
      })
        .then(response => response.json())
        .then(data => Datainputs(data))
        .catch(error => {
          // Handle any errors
          console.error(error);
        });
      

           
     });
}

function Datainputs(data) {
    data.items.forEach((data) => {
      let userList = document.querySelector('#user-list');
      let listItem = document.createElement('li');
      listItem.classList.add('user-item');
  
      listItem.innerHTML = `
        <img src="${data.avatar_url}" alt="${data.login}" class="user-avatar">
        <div class="user-details">
          <span id='username' class="user-login">${data.login}</span>
          <span class="user-url">${data.html_url}</span>      
        </div>
      `;
  
      userList.appendChild(listItem);
    });
  
    let profiles = document.getElementsByClassName('user-url');
    let name = document.getElementById('username').textContent;
    for (let i = 0; i < profiles.length; i++) {
      profiles[i].addEventListener('click', function(event) {
        event.preventDefault();
        fetch(`https://api.github.com/users/${name}/repos`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.v3+json',
            'X-GitHub-Api-Version': '2022-11-28'
          }
        })
          .then(response => response.json())
          .then(data => ReposInputs(data))
          .catch(error => {
            // Handle any errors
            console.error(error);
          });
      });
    }
  }
  
  function ReposInputs(data) {
    let repoList = document.querySelector('#repos-list');
    repoList.innerHTML = '';
  
    data.forEach(repo => {
      let listItem = document.createElement('li');
      listItem.textContent = repo.name;
      repoList.appendChild(listItem);
    });
  }
  