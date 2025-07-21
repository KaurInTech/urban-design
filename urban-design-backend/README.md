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

    User->>Frontend: Click Save Project
    Frontend->>Backend: POST /api/save_project
    Backend->>SQLite: Insert (username, project_name, query, filter)
    SQLite-->>Backend: Confirm Save
    Backend-->>Frontend: Show success message

    User->>Frontend: Enter Username / Open App
    Frontend->>Backend: GET /api/load_projects?username=XYZ
    Backend->>SQLite: SELECT * FROM projects WHERE username = XYZ
    SQLite-->>Backend: Return list of saved projects
    Backend-->>Frontend: Send saved projects
    Frontend->>Frontend: Display project cards
    User->>Frontend: Click on project card
    Frontend->>Frontend: Re-apply stored filter to 3D map
