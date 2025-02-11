# Plan

My initial plan to keep me on track. I won't implement all these but will consider them.

## API

### Routes:
- make routes for `hotels`, `countries` and `cities`
- make the the partial matching on each work based on the field
- consider possibly indexing the fields
- make a route which uses all three in one

### Design:
- consider express router
- consider versioning of routes
- use same Mongo connection for all 3 which should be a flexible endpoint

### Code Maintainability
- break code down into handler functions for maintainability
- consider adding eslint and prettier

### Performance: 
- consider moving any data normalisation to middleware to save doing on the client
- consider limit on amount of documents and possibly pagination
- only return necessary data to reduce payload

### Security:
- consider the security around cors
- possibly an api header key and rate limiting

### Reliability
- Error handling and logging

### Documentation
- Document the api


## Client

### Routing and Layout:
- Add React Router for page routing
- Add layout component

### Code Maintainability:
- Modularity: Break code into components, libs, handlers
- Use the endpoint and consider error handling
- Consider adding prettier with eslint

### API and Error Handling
- All three should share the results of the endpoint, consider state management if it makes sense like redux
- consider proper error handling

### Accessibility:
- check in lighthouse 
- make elements semantic
- consider aria labels

### Performance:
- Speed: check in lighthouse
- consider caching strategy
