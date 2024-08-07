from .init import llm
from data.AISearch import search as AISearch
from data.Jira import manage as JiraManage
from dotenv import load_dotenv
from model.airesults import AIResults
from model.jira import JiraResults, JiraIssue
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain.prompts import PromptTemplate
from langchain_core.output_parsers import JsonOutputParser

load_dotenv(override=False)


template:str = """Create a detailed Jira issue for {query} using the provided requirements and return the results in JSON format.
                {format_instructions}
                Use the provided requirements: 
                {context}

                    """

def support_issue_from_query(query:str) -> JiraResults:
    resources, docs = AISearch.requirments_similarity_search(query)

    if len(resources) ==0 :return JiraResults(JiraIssue=None,ResourceCollection=resources)

   
    def format_docs(docs):
        return "\n\n".join(doc.page_content for doc in docs)

    content = format_docs(docs)

    parser = JsonOutputParser(pydantic_object=JiraIssue)
    #custom_rag_prompt = PromptTemplate.from_template(template)

    custom_rag_prompt = PromptTemplate(
    template=template,
    input_variables=["query","context"],
    partial_variables={"format_instructions": parser.get_format_instructions()},)

    rag_chain = custom_rag_prompt | llm | parser

    #print(custom_rag_prompt)

    #rag_chain = (
    #{"context": lambda x: content }
    #| custom_rag_prompt
    #| llm
    #| StrOutputParser()
    #)
    issue: JiraIssue =rag_chain.invoke({"query":query, "context":content})

    if issue != None:
        JiraManage.project_name_lookup(issue)
    print(issue)
    return JiraResults(JiraIssue=issue,ResourceCollection=resources)