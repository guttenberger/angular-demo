# Angular Demo and Reference App
This demo was created by me as a reference for future projects.

This demo application is a **Recruiter Management Tool** designed to streamline the process of managing software engineer leads. The app helps recruiters organize, track, and manage candidates through various stages of the recruitment process. It provides an easy-to-use interface with different views for each lead status and allows recruiters to create, edit, and manage software engineering leads efficiently.

## Table of Contents

- [Features](#features)
- [File Structure](#file-structure)
- [Lead Statuses](#lead-statuses)
- [Routes Overview](#routes-overview)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Features

- **Smart Services and Dumb Components**: The app leverages a clear separation between smart services (handling business logic) and dumb components (focused on presentation), resulting in highly reusable components.

- **High Modularity and Lazy Loading**: The application is highly modular, using standalone components and feature modules to keep the codebase organized, maintainable and lazy loadable.

- **NgRx for State Management**: The application integrates NgRx for state management, including NgRx Data to handle the data flow efficiently across the app.

- **RxJS for Asynchronous Events and Signals for Synchronous Events**: RxJS is used for managing asynchronous operations, while Angular signals handle synchronous data flows, for more granular change detections.

- **Angular Material**: A modern UI is provided using Angular Material components, ensuring a clean, responsive, and accessible design.

- **ESLint, Prettier, and Husky**: Code quality and formatting are enforced using ESLint and Prettier, while Husky ensures consistent linting and formatting before committing code.

## File Structure

The app follows a modular structure for scalability and maintainability. Below is an overview of the main directories and files:

```plaintext
ng-lead/src/
.
├── app
│   ├── app.component.ts                # Root component
│   ├── app.routes.ts                   # Application routes
│   ├── core                            # Core services like loading, responsive, etc.
│   ├── features                        # Leads feature module with components and services
│   │   └── leads                       # Lead management module
│   │       ├── components              # Components for lead form, detail, and list
│   │       └── services                # Lead-related services
│   │       └── models                  # Lead Models
│   │       └── store                   # Lead Related NgRx Data classes
│   ├── layout                          # Layout components (header, sidebar)
│   ├── material                        # Custom material styles
│   ├── pages                           # Pages like dashboard, 404
│   ├── shared                          # Shared components, pipes, and utilities
│   └── store                           # NgRx Data classes for managing state
├── environments                        # Environment configurations
├── main.ts                             # Application entry point
├── styles.scss                         # Global styles
```


### Key Folders

#### Core Folder
The `core` folder contains centralized, one-time services and logic that are used throughout the entire application. Unlike the `shared` folder, the `core` folder is imported only once, typically in the root module (`AppModule`). Services here are often singleton services, such as authentication, global error handling, and responsive design utilities.

#### Feature Folder
`features` modules represent specific functional areas or business domains within the application. Each feature module, such as the leads module, contains its own components, services, models, routing, and state management, providing encapsulated functionality. This structure allows for easy scaling as the application grows.

#### Store Folder: NgRx Data (State Management)
The `store` folder handles the state management of the application using NgRx Data. It contains shared store related classes used in the feature stores.

#### Shared Folder
The `shared` folder is where reusable components, directives, and pipes reside. This folder is used to collect all the generic, reusable pieces of the application that can be shared across multiple modules. For example, components like buttons, card layouts, or custom pipes like date formatting would be placed here.

#### Pages Folder
The `pages` folder typically contains general pages that are not tied to a specific business function. For example, a dashboard that summarizes data or a 404 error page would reside here. These pages provide a high-level user experience and often link to specific feature modules.

#### Layout Folder
The `layout` folder holds components that structure the overall layout of the application, such as the header, sidebar, and footer. These components are often used across multiple pages and provide consistent navigation and layout structure.

## Lead Statuses

Leads are categorized based on their progress in the recruitment process. The available statuses are:

- **New**: Recently added leads that have not been contacted yet.
- **Contacted (Interviewed)**: Leads who have been interviewed but are awaiting further action.
- **Qualified**: Leads who have passed the initial stages and are being considered for a position.
- **Placed**: Leads who have been successfully hired or placed in a job.
- **Rejected**: Leads who are no longer being considered for a role.

These statuses can be viewed and managed via the app's four main routes.

## Routes Overview

- `/leads/new`: Displays a table of leads that are categorized as "New".
- `/leads/qualified`: Combines both "Interviewed" and "Qualified" leads in a single view.
- `/leads/placed`: Shows leads that have been successfully placed in a position.
- `/leads/rejected`: Displays leads who have been rejected.
- `/leads/create`: A form to create a new lead.
- `/leads/edit/:id`: A form to edit the details of an existing lead.
- `/leads/detail/:id`: A detailed view of a specific lead's information.

## Installation

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 22 or higher)
- [Angular CLI](https://angular.dev/tools/cli#cli-command-language-syntax)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/guttenberger/angular-demo
   cd angular-demo/ng-lead
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   ng serve
   ```

4. Navigate to `http://localhost:4200/` in your browser to access the application.

## Usage

### Managing Leads

- Navigate to the various lead tables (`/leads/new`, `/leads/qualified`, `/leads/placed`, `/leads/rejected`) to view and manage leads in different statuses.
- Use the **Create Lead** button to add a new lead via the `/leads/create` route.
- Click on a lead in any table to view detailed information or edit the lead’s details.

## License

This project is licensed under the MIT License
