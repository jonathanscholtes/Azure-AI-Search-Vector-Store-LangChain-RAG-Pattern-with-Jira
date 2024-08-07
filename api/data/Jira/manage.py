from  .init import jira
from model.jira import  JiraIssue


def project_name_lookup( issue:JiraIssue)->JiraIssue:
    jra = jira.project(issue['project']['key'])
    issue['project']['name'] = jra.name
    return issue   


def create_issue(issue:JiraIssue):
    
    try:
        new_issue = jira.create_issue(project=issue.project.key, summary=issue.summary,
                                description=issue.description, issuetype={'name': issue.issuetype})
        print(new_issue)
        return {'success':True}
    except Exception as e:
        print(e)
        # LOG EXCEPTION
        return {'success':False}