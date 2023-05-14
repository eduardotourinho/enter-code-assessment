## About

This project was created as part of the code assessment from Enter.de.
It was initialized with [express-generator-typescript](https://github.com/seanpmaxwell/express-generator-typescript) and re-organized to adhere to SOLID conventions

## Code Architecture

The code is organized based on the [Hexagonal architecture](https://en.wikipedia.org/wiki/Hexagonal_architecture_(software)):

- `adapters` are the implementation for the external dependencies of the application (i.e.  REST API, Database)
- `domain` contains the models and business logic for the application. The communication with external dependencies are done through the defined `ports` (interfaces).

## Diagram

![form hexagonal design.jpg](docs%2Fform%20hexagonal%20design.jpg)

## Available Scripts

### `npm run dev`

Run the server in development mode.

### `npm run lint`

Check for linting errors.

### `npm run build`

Build the project for production.

### `npm start`

Run the production build (Must be built first).

### `npm start -- --env="name of env file" (default is production).`

Run production build with a different env file.


## Additional Notes

- If `npm run dev` gives you issues with bcrypt on MacOS you may need to run: `npm rebuild bcrypt --build-from-source`. 
