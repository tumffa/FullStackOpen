```mermaid
sequenceDiagram
    participant browser
    participant server
    Note right of browser: Event handler handles form submission and prevents reload
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server->>browser: 201 Created
    deactivate server
    Note right of browser: Callback function renders new note
```
