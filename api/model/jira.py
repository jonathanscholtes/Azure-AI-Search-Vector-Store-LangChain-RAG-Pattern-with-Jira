from pydantic import BaseModel, Field
from typing import List, Optional, Union
from model.resource import Resource 
from dotenv import load_dotenv
from os import environ


load_dotenv(override=False)

class project(BaseModel):
    key: str = Field(default=environ.get("JIRA_PROJECT_KEY"))
    name:str = Field(default="None")

class JiraIssue(BaseModel):
    project: project
    summary: str
    description:str = Field(description="A Long and detailed description for Jira Issue")
    issuetype:str = Field(default="Task")

class JiraResults(BaseModel):
    JiraIssue: JiraIssue
    ResourceCollection: list[Resource]


