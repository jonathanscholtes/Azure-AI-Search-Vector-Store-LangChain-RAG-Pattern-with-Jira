from fastapi import APIRouter
from service import search as search

from model.airesults import AIResults
from model.jira import JiraResults

router = APIRouter(prefix = "/search")


@router.get("/requirments/{prompt}")
def requirments_from_query(prompt:str) -> JiraResults:
    return search.support_issue_from_query(prompt)