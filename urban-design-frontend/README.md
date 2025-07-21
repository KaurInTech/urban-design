### Frontend UML Diagram (Mermaid)

```mermaid
sequenceDiagram
    participant User
    participant UsernameInput
    participant Redux(UserSlice)
    participant ProjectDashboard
    participant ProjectList
    participant ThreeMap
    participant Redux(QuerySlice)
    participant SearchInput

    User->>UsernameInput: Enter username
    UsernameInput->>Redux(UserSlice): dispatch(setUsername)
    UsernameInput-->>ProjectDashboard: Show dashboard view

    ProjectDashboard->>ProjectList: Render with Redux(user, projects)
    ProjectDashboard->>ThreeMap: Render with Redux(query, user)

    User->>SearchInput: Enter query & press Enter
    SearchInput->>ThreeMap: onSubmit(query)

    ThreeMap->>Redux(QuerySlice): dispatch(fetchQueryFilter(query))
    Redux(QuerySlice)->>Backend: POST /api/query
    Backend-->>Redux(QuerySlice): Return { query, filter }
    Redux(QuerySlice)-->>Redux store: Update lastQuery, lastFilter

    ThreeMap->>ThreeMap: Highlight buildings based on lastFilter
    ThreeMap-->>SearchInput: Show success message

    User->>SearchInput: Click "Save Project"
    SearchInput->>ThreeMap: onSaveProject(query)
    ThreeMap->>Redux(ProjectSlice): dispatch(saveProject)
    Redux(ProjectSlice)->>Backend: POST /api/save_project
    Backend-->>Redux(ProjectSlice): Confirm save
    Redux(ProjectSlice)-->>Redux store: Add project
    ThreeMap-->>SearchInput: Show save success message

    User->>ProjectList: Click saved project card
    ProjectList->>ThreeMap: onProjectClick(project.filter)
    ThreeMap->>ThreeMap: Highlight buildings using that filter
