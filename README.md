## About

This project was created as part of the code assessment from Enter.de.
It was initialized with [express-generator-typescript](https://github.com/seanpmaxwell/express-generator-typescript) and re-organized to adhere to SOLID best practices using the hexagonal architecture design

## API definition

- `GET /api/forms`: return all the registered forms and its structure.
  - Response: 
    - code: 200
    - body: `{forms: FormResponse[]}` (without the `userAnswers` property)
- `GET /api/forms/:ïd`: return the form `:id` with the structure and all the users submitted answers
  - Response: 
    - code: 200 | 404
    - body: `{form: FormResponse}` (includes the `userAnswers` property)
- `POST /api/forms`: create a new form
  - Response
    - code: 201
    - body: `{form: FormResponse}` (without the `userAnswers` property)
- `POST /api/forms/:id/answer`: Submit the answers for a form. When submitting an answer, the answers fields must exist in the `form`. Also, it is worth to mention the submitted answer is assigned to a randomly created user_id (UUID) on request. This needs to be changed once we have the authorized user data.
  - Response
    - code: 201 | 400

### Response types

```ts
enum FormFieldType {
  TEXT = 'text',
  NUMBER = 'number',
  PASSWORD = 'password',
  EMAIL = 'email',
  DATE = 'date'
}

interface FormField {
  name: string,
  type: FormFieldType,
}

interface Answer {
  fieldName: string,
  value: string
}

interface UserAnswer {
  userId: string;
  answers: Answer[] | null;
}

interface FormResponse {
  id: number;
  formName: string;
  fields?: FormField[] | null;
  userAnswers?: UserAnswer[] | null;
}
```

## Code Architecture

The code is organized based on the [Hexagonal architecture](https://en.wikipedia.org/wiki/Hexagonal_architecture_(software)):

- `adapters` are the implementation for the external dependencies of the application (i.e.  REST API, Database)
- `domain` contains the models and business logic for the application. The communication with external dependencies are done through the defined `ports` (interfaces).

## Diagram

![form hexagonal design.jpg](docs%2Fform%20hexagonal%20design.jpg)

## Testing

Due to lack of time, currently there are no tests in this project. To go into production, we must add `unit tests` and `integration tests`.

## Available Scripts

### `npm run dev`

Run the server in development mode.

### `npm run lint`

Check for linting errors.

### `npm run build`

Build the project for production.

### `npm start`

Run the production build (Must be built first).


## Additional Notes

- If `npm run dev` gives you issues with bcrypt on MacOS you may need to run: `npm rebuild bcrypt --build-from-source`. 
