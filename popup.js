
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('searchText').addEventListener('click', searchText);
    document.getElementById('myOpenIssues').addEventListener('click', myOpenIssues);
    document.getElementById('toVerify').addEventListener('click', toVerify);
    document.getElementById('searchIssue').addEventListener('click', searchIssue);
    document.getElementById('searchLCSBug').addEventListener('click', searchLCSBug);
    document.getElementById('searchLCSTask').addEventListener('click', searchLCSTask);
    loadUserInfo();
}
);

function getUserId()
{
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://jira/rest/api/2/myself", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var response = JSON.parse(xhttp.responseText);
    return response.name;
}

function loadUserInfo()
{
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://jira/rest/api/2/myself", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var response = JSON.parse(xhttp.responseText);
    document.getElementById("username").innerHTML = response.displayName;
    document.getElementById("userImage").src = response.avatarUrls["48x48"];
}

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

function searchText()
{
  var text = document.getElementById('stext').value;
  var project = document.getElementById('sProject').value;
  if(text!="" && project!="")
    chrome.tabs.create({ url: "http://jira/issues/?jql=project= "+project+" and summary ~ \""+text+"\""});
  else
    alert("Enter text to Search");
}

function myOpenIssues()
{
  chrome.tabs.create({ url: "http://jira/issues/?jql= assignee = currentUser() AND resolution = Unresolved order by updated DESC "});
}

function toVerify()
{
  chrome.tabs.create({ url: "http://jira/issues/?jql= tester = currentUser() AND status != closed order by updated DESC "});
}

function searchIssue()
{
  var issueid = document.getElementById("sIssue").value;
  if(issueid!="")
    chrome.tabs.create({ url: "http://jira/browse/"+issueid});
  else
    alert("Enter Issue ID to Search");
}

function RestCall()
{
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://jira/rest/auth/1/session", false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
  var response = JSON.parse(xhttp.responseText);
  document.getElementById("username").innerHTML = response.name;
}

function searchLCSBug()
{
  var bugid = document.getElementById("bugid").value;
  if(bugid!="")
    chrome.tabs.create({ url: "http://lcs.corpnet.ifsworld.com/login/secured/buglnw/BlBug.page?BUG_ID="+bugid});
  else
    alert("Enter Bug ID to Search");
}

function searchLCSTask()
{
  var caseid = document.getElementById("caseid").value;
  var taskid = document.getElementById("taskid").value;
  var lcsurl = "http://lcs.corpnet.ifsworld.com/login/secured/castrw/TaskDetail.page?";
  if ( caseid != "" && taskid!="")
  {
    lcsurl = lcsurl + "CASE_ID="+caseid + "&TASK_ID="+taskid;
    chrome.tabs.create({ url: lcsurl});
  }
  else
  {
    alert("Enter Case Id and Task Id to Search");
  }  
}

