from dotenv import load_dotenv
from os import environ

from jira import JIRA

load_dotenv(override=False)

jira : JIRA | None=None

def jira_init():
    global jira
    
    jira = JIRA(environ.get("JIRA_URL"),basic_auth=(environ.get("JIRA_EMAIL"), environ.get("JIRA_API_TOKEN")))


jira_init()