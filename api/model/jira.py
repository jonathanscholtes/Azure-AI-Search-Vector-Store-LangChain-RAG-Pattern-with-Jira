from pydantic import BaseModel, Field
from typing import List, Optional, Union
from model.resource import Resource 


class project(BaseModel):
    key: str = Field(default="TL")
    name:str = Field(default="None")

class JiraIssue(BaseModel):
    project: project
    summary: str
    description:str = Field(description="A Long and detailed description for Jira Issue")
    issuetype:str = Field(default="Task")

class JiraResults(BaseModel):
    JiraIssue: JiraIssue
    ResourceCollection: list[Resource]


