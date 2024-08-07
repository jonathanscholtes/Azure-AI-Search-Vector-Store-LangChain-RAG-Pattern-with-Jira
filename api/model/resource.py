from pydantic import BaseModel
from typing import List, Optional, Union

class Resource(BaseModel):
    resource_id: Union[str, None]
    storage_path:str
    title:str
    content:str