# API Endpoints

Every REST endpoint follows the same Lambda + API Gateway pattern described in `terraform/locals.tf`. The table below documents the handlers currently deployed in `lambda_functions` for the `local` environment.

| Method | Path           | Description                                                       | Lambda/Module                                                             |
| ------ | -------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `GET`  | `/example`     | Sample handler for connectivity tests.                            | `app/src/modules/example/interface/handlers/exampleHandler.ts`            |
| `GET`  | `/classes`     | Lists every character class pulled by `DrizzleClassesRepository`. | `app/src/modules/class/interface/handlers/getClassHandler.ts`             |
| `GET`  | `/races`       | Returns all races stored in the `races` table.                    | `app/src/modules/races/interface/handlers/getRacesHandler.ts`             |
| `GET`  | `/subraces`    | Fetches subraces (child races) from the `subraces` table.         | `app/src/modules/subraces/interface/handlers/getSubracesHandler.ts`       |
| `GET`  | `/subclasses`  | Retrieves subclasses and their parent classes.                    | `app/src/modules/subClass/interface/handlers/getSubclassesHandler.ts`     |
| `GET`  | `/backgrounds` | Returns each background and its associated feature.               | `app/src/modules/backgrounds/interface/handlers/getBackgroundsHandler.ts` |

## Base URL

- **Deployed AWS**: `https://{api_id}.execute-api.{region}.amazonaws.com/{stage}` (replace with the API Gateway values for your workspace).
- **LocalStack**: `http://localhost:4566/restapis/{api_id}/{stage}/_user_request_`.

Use whichever URL matches your setup and assign it to the `baseUrl` variable in Postman or your HTTP client.

## Postman Collection

A ready-to-import collection lives at `postman/dnd-core-api.postman_collection.json`. It includes all of the requests listed above and shares the `baseUrl` variable so you can point the collection at AWS or LocalStack without editing individual requests.
