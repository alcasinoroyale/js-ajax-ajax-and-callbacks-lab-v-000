$(document).ready(function (){
});

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
  onclick="showCommits(this)">Show Commits</a>`;
}
