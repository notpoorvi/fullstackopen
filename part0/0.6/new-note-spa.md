```mermaid
sequenceDiagram
participant browser
participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: status code 201: created the new_note
    deactivate server
    Note right of browser: The browser updates the notes without reloading the page
```
