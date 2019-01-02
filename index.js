$(document).ready(function (){
});

function displayError(error) {
  $('#errors').html("There was an error, please try again.");
}

function searchRepositories() {
  const searchTerms = document.getElementById('searchTerms').value
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function(data){
    $("#results").html(displayRepositories(data));
  }).fail(error =>
    displayError()
  )
}

function displayRepositories(repos) {
  return repos.items.map(repo => renderRepositories(repo));
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

function showCommits(el) {
  const owner = el.dataset.owner;
  const repo = el.dataset.repository;
  $.get(`https://api.github.com/repos/${owner}/${repo}/commits`, data => {
  }).fail(error => {
    displayError()
  })
}

function renderCommits(data) {
  const result = data.map(commit) => renderCommit(commit)).join('');
  return `<ul>${result}</ul>`;
}

function renderCommit(commit) {
  return
  `<li<h3>${commit.sha}</h3>
  <p>${commit.commit.author.name}</p>
  <p>${commit.commit.message}</p></li>`
}
