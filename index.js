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
  return `
  <li>
  <h2><a href="${result.html_url}">${result.name}</a></h2>
  <p><a href="#" data-repository="${result.name}" data-owner="${result.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
  <p>${result.description}</p></li>`;
}

function displayRepositories(repos) {
  return repos.items.map(repo => renderRepositories(repo));
}

function searchRepositories() {
  const searchTerms = document.getElementById('searchTerms').value
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, data => {
    $("#results").html(displayRepositories(data));
  }).fail(error => {
    displayError()
  })
}
