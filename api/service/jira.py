from data.Jira import manage as JiraManage
from model.jira import JiraIssue


def create_issue(issue:JiraIssue)->bool:
    return JiraManage.create_issue(issue)