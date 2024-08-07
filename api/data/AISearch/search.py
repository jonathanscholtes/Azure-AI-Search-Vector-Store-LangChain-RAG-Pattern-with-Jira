from .init import vector_store
from model.resource import Resource
from langchain.docstore.document import Document


def results_to_model(result:Document) -> Resource:
    return Resource(resource_id = result.metadata["chunk_id"],
                        title=result.metadata["title"],
                        storage_path=result.metadata["metadata_storage_path"],
                        content=result.page_content)
                        

def requirments_similarity_search(query:str) ->tuple[list[Resource], list[Document]]:
    docs = vector_store.similarity_search(
    query=query,
    k=3,
    search_type="similarity",
    )


    return [results_to_model(document) for document in docs],docs