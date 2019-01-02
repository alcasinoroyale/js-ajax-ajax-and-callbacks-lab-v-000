$(document).ready(function (){
});

function displayError(error) {
  $('#errors').html("There was an error, please try again.");
}

function renderRepositories(repo) {
  return `
  <li>
    Name: ${result.name}<br>
    Description: ${result.description}<br>
    URL: <a href="${result.html_url}">${result.html_url}</a><br>
    <a href="#" data-repository="${result.name}" data-owner="${result.owner.login}"
    onclick="showCommits(this)">Show Commits</a><br></br>`;
}

function showCommits(ele) {
  const repo  = ele.dataset.repository;
  const owner = ele.dataset.owner;

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
  const result = data.map( commit => getCommit(commit)).join('');
  return `<ul>${result}</ul>`;
}

function getRepositories(data) {
   return data.items.map( result => renderRepositories(result));
}

function searchRepositories() {
  const searchTerms = $('#searchTerms')[0].value;

  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`).done(function(data) {
     $('#results').html(getRepositories(data));
   }).fail(function(error) {
     displayError(error);
  });
}
