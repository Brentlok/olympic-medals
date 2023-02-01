# Olympic Medals
## Recruitment task

``npm run dev`` or [Demo](olympic.hbieszczad.pl)

Repo created using ``npm create vite@latest`` the only additional package is tailwindcss

***Note** - close to everything is exported and then imported from ~/\**

### Quick project overview

- ~/bits - really small components that usually don't have their own state, they provide some functionality or view (Table/Input/etc.).
- ~/data - list of all countries from [flagcdn.com](https://flagcdn.com/en/codes.json) and some additional types for better typesafety.
- ~/partials - more complex components, they have they're own state and usually they are using some bits to build UI
- ~/utils - collection of some useful and repeatable functions

### You can 
- select country from given list, and then assign to it how much gold/silver/bronze medals they've won
- sort by team name, number of gold/silver/bronze/total medals - ascending or descending by toggle
- edit existing country or remove it
