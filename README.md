# Star Wars App

This is a web application that utilizes [SWAPI](https://swapi.dev/) to show information about people in the Star Wars universe.

It uses the Angular Material library for UI components and NgRx for state management.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installing](#installing)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Built With](#built-with)
- [Authors](#authors)
- [Running unit tests](#running-unit-tests)
- [Running component tests](#running-component-tests)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js and npm installed on your local development machine.
- Install Angular CLI globally on your machine.

### Installing

1. Clone the repository:

```bash
git clone https://github.com/mzeitz1902/star-wars.git
```

2. Navigate into the cloned repository:

```bash
cd your-project-name
```

3. Install the dependencies:

```bash
npm install
```

It might be necessary to use ``npm i --legacy-peer-deps`` because of version discrepancies with the NgRx packages.

4. Start the development server:

```bash
ng serve
```

Now, the application should be running at `http://localhost:4200/`.

## Features

- View a paginated list of people from the Star Wars universe
- Search for a person by name
- View detailed information about a person
- Add a new person to the list (only locally)
- Delete a person from the list (only locally)

## Folder Structure

```
├── src
│   ├── app
│   │   ├── pages
│   │   │   ├── people
│   │   │   │   ├── store
│   │   │   │   ├── components
│   │   │   │   │   ├── add-person-dialog
│   │   │   │   │   ├── people
│   │   │   │   │   │  ├── components
│   │   │   │   │   │  │     ├── add-person-dialog
│   │   │   │   │   │  │     ├── people
│   │   │   │   │   │  │     │     ├── header
│   │   │   │   │   │  │     │     ├── content
│   │   │   │   │   │  │     │          ├── people-list
│   │   │   │   │   ├── person-details
│   │   ├── shared
│   │   │   ├── components
└── ...
```

## Built With

- [SWAPI](https://swapi.dev/) - Star Wars API
- [Angular 18](https://angular.io/) - The web framework used
- [NgRx](https://ngrx.io/) - State Management
- [Angular Material](https://material.angular.io/) - Material Design components for Angular
- [Tailwind](https://tailwindcss.com/) - CSS framework for styling (Flexbox etc.)
- [Jest](https://jestjs.io/) - Testing framework
- [Cypress](https://www.cypress.io/) - Component test framework

## Authors

- **Manuel Zeitz** - [mzeitz1902](https://github.com/mzeitz1902)

## Running unit tests

Run `ng test` to execute the unit tests via Jest.

## Running component tests

Run `ng cypress:open:component` to run component tests via Cypress.
