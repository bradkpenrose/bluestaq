
# BLUESTAQ

## design choices

    - for the service layer used a repository pattern, so that the data source could be changed without effecting the service or route layers.
    
    - for the data layer i used an anemic domain model, so that all the busness logic is kept in the service layer. 

## changes

    - impliment an router(express) wrapper that is passed to the service layer, so that the router could be change without effecting the service or data layers

    - finish setting up docker compose to run the bluestaq container in dev

    - add all crud route tests

    - add user db table, data, service and routes

    - add note deletedAt for soft deletes

    - add note group db table, data, service and routes

    - add authentication and roles for posting and reading notes by user