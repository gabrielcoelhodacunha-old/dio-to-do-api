[Impulso]: https://impulso.work/
[Digital Innovation One]: https://www.dio.me/en
[Integrating a NodeJS Back-End with a React Front-End]: https://github.com/gccunha015/dio-impulso-javascript_evolution-modulo_6-desafio_de_projeto
[npm]: https://docs.npmjs.com/
[node]: https://nodejs.org/en/docs/
[TypeScript]: https://www.typescriptlang.org/
[TypeORM]: https://typeorm.io/
[Test Driven Development]: https://en.wikipedia.org/wiki/Test-driven_development
[Express]: https://expressjs.com/
[Jest]: https://jestjs.io/
[SQLite]: https://www.sqlite.org/index.html

# To Do API
## About
A REST API to manage To Do Tasks.

Created with [NodeJS][node], [TypeScript], [Express], [TypeORM], [SQLite] and using [Test Driven Development] with [Jest].

## Why
Part of [Integrating a NodeJS Back-End with a React Front-End] challenge required to complete **JavaScript Evolution** bootcamp,
offered by [Impulso] and [Digital Innovation One].

## Features
Managemente of tasks available at the moment:
| Feature | API endpoint | Path Params | Body | Query Params |
| :-: | :-: | :-: | :-: | :-: |
| create | `/tasks` || `{"tasks": Array[{"description": string, ("isDone": boolean)}]}` | 
| read by ids | `/tasks` ||| `ids: numbers` |
| read all | `/tasks` |
| update one | `/tasks/id` |`id: number` | `{"taskData": {("description": string), ("isDone": boolean)} }` |
| delete by ids | `/tasks` ||| `ids: numbers` |
| delete all | `/tasks` |

## How to install
### Prerequisites
- [node] (v16.15.1)
- [npm] (8.11.0)

### Installation
In your terminal, clone the repository.
```bash
git clone https://github.com/gccunha015/to_do-api
```
Enter the directory cloned.
```bash
cd to_do-api
```
Install dependencies.
```bash
npm install
```
Serve locally.
```bash
npm run dev
```

## How to use
### Usage
Use `http://localhost:5000/` as the base url to acces the endpoints.
