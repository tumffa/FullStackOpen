```mermaid
sequenceDiagram
    participant browser
    participant server
    Note right of browser: Event handler handles form submission, prevents reload and renders new note
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server->>browser: 201 Created
    deactivate server
```
