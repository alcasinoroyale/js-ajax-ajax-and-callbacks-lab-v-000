$(document).ready(function (){
});

function displayError() {
  $('#errors').html("There was an error, please try again.");
}

function renderCommit(commit) {
  return
  `<li<h3>${commit.sha}</h3>
  <p>${commit.commit.author.name}</p>
  <p>${commit.commit.message}</p></li>`
}

function renderCommits(data) {
  let result = data.map((commit) => renderCommit(commit)).join('');
  return `<ul>${result}</ul>`;
}

function showCommits(el){
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, data => {
    $('#details').html(renderCommits(data))
  }).fail(error => {
    displayError()
  })
}

function renderRepositories(repo) {
  return
  `<li>
  Name: ${repo.name}
  Description: ${repo.description}
  URL: <a href= "${repo.html_url}">${repo.html_url}</a>
  <a href="#" data-repository="${repo.name}" data-owner="${repo.owner.login}"
  onclick="showCommits(this)">Show Commits</a></li>`;
}
