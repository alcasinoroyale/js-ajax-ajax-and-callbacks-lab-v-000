$(document).ready(function (){
});

function displayError(error) {
  $('#errors').html("There was an error, please try again.");
}

function renderRepositories(repo) {
  return `
  <li>
    Name: ${repo.name}<br>
    Description: ${repo.description}<br>
    URL: <a href="${repo.html_url}">${repo.html_url}</a><br>
    <a href="#" data-repository="${repo.name}" data-owner="${repo.owner.login}"
    onclick="showCommits(this)">Show Commits</a><br></br>`;
}

function showCommits(el) {
  const owner = el.dataset.owner;
  const repo  = el.dataset.repository;
  $.get(`https://api.github.com/repos/${owner}/${repo}/commits`).done(function(data) {
     $('#details').html(getCommits(data));
   }).fail(function(error) {
     displayError(error);
  });
}

function getCommit(commit) {
  return `<li><h3>Sha: ${commit.sha}</h3>
         <img src="${commit.author.avatar_url}" alt="avatar" height="42"><br>
         <strong>Name: </strong>${commit.commit.author.name}<br>
         <strong>Login: </strong>${commit.author.login}<br>
         <p><strong>Message: </strong>${commit.commit.message}</p></li>`;
}

function getCommits(data) {
  const repo = data.map( commit => getCommit(commit)).join('');
  return `<ul>${repo}</ul>`;
}

function getRepositories(data) {
   return data.items.map( repo => renderRepositories(repo));
}

function searchRepositories() {
  const searchTerms = document.getElementById('searchTerms').value
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function(data){
    $("#results").html(displayRepositories(data));
  }).fail(error =>
    displayError()
  )
}
