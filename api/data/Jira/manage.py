from  .init import jira
from model.jira import  JiraIssue


def project_name_lookup( issue:JiraIssue)->JiraIssue:
    jra = jira.project(issue['project']['key'])
    issue['project']['name'] = jra.name
    return issue   