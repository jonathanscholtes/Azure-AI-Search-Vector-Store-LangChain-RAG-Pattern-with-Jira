from fastapi import APIRouter
from model.jira import JiraIssue
from service import jira

router = APIRouter(prefix = "/jira")

@router.post("/issue")
def create_issue(issue:JiraIssue):
    return jira.create_issue(issue)