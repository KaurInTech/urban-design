### Backend UML Diagram (Mermaid)

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant HuggingFace
    participant SQLite

    User->>Frontend: Enter Query
    Frontend->>Backend: POST /api/query
    Backend->>HuggingFace: Send prompt to LLM
    HuggingFace-->>Backend: Return filter JSON
    Backend->>Frontend: Return filter
    Frontend->>Frontend: Highlight buildings

    User->>Frontend: Click Save
    Frontend->>Backend: POST /api/save_project
    Backend->>SQLite: Insert user & filter
    SQLite-->>Backend: Success
    Backend-->>Frontend: Confirm saved
