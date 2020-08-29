# Clickup - Brewery Explorer
## Take Home Project - Eian Carter

###Deployed Link:
(https://clickup-eian.netlify.app/)


## Installation

Use the package manager [npm](https://www.npmjs.com/) to install Brewery Explorer.

```bash
npm install
```

## Usage

```Angular
ng serve
```
Open in localhost:4200

## Features
* API Open Brewery (https://www.openbrewerydb.org/documentation/01-listbreweries)
  * Retrieves list of breweries in US
* Search
  * Pipe accepts input string and filters list of breweries by name, brewery_type, website_url, city and state
* Sort
  * cdkDragDrop (https://material.angular.io/cdk/drag-drop/overview) is used to manually sort brewery items 
  * SortService allows columns to communicate with each other and when a column is **clicked**, the other subscribers (colums) hide their
  sort icons and no longer sort. A Directive was created to listen to the sort events and a simple sort handler in the brewerycard component
  handles the sort by column.
* Resize Columns
  * A span was created in each header column with a mousedown event listener and custom function using JQuery to dynamically resize the width of
  columns and their respective child rows.
* Persisting sort
  * localStorage is used to store the brewery card state, which is then parsed, changed and re-saved whenever a sort event occurs. This allows
  a user to maintain their sort settings as long as localStorage is not cleared.
  
## Future Iterations
* Pagination
  * If I were to implement pagination, I would create a container with it's own state, action, reducer and service to be reused elsewhere in 
  the application where I use pagination.

## Contributions
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
