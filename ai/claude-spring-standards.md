## general entity and dto definitions
- make use of project lombock for getters and setters
- use the @ToString annotation

## Services
- define under the service directory as interfaces
- implementations should be under the service/impl directory
- lombock annotations should be used for logging references, with extensive logging whenever possible
- when appropriate, create subdirectories to group related service interface and implementations for organizational purposes

## autowiring
- preference is to use autowired vs preferred vs constructor ingestion 

## dtos


## exception handler
- mvc exceptions should be handled via a global exception handler and @controllerAdvice

## logging
- extensive logging should always be used.

## class declarations
- all files should have a comments header with the name of the file, and a description of it's purpose when appropriate

## controllers
- should default to REST style interfaces

 