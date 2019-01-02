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
  let result = data.map(commit) => renderCommit(commit)).join('');
  return `<ul>${result}</ul>`;
}
