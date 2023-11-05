# GeotikUI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

# Frontend

## Overview

This repository contains a low-fidelity wireframe and graphics (background and logo) that serve as the basis for creating a login/registration/password reset form component.

The component should be created using pre-built components from the Angular Material library.

## Login

The login component features the following elements:

- Input fields for email and password.
- A link to reset the password.
- A login button.

Upon receiving a successful response, the component should display the relevant information. Similarly, in the case of a 401 error, the appropriate error message should be displayed.

## Account Registration

The account registration component includes the following elements:

- An input field for email (user input validation to ensure it is a valid email address).
- A password input field (passwords must meet specific criteria: at least 1 digit, 1 lowercase letter, 1 uppercase letter, and a minimum length of 8 characters).
- A password confirmation field (passwords must match).
- A "Create Account" button.

After successfully creating an account, the user should be redirected to the login view.

## Password Reset

The password reset component features:

- An input field for email.

Upon receiving a successful response, an information message should be displayed indicating that an email message has been sent (actual email message handling is not implemented within this component).

Please use the provided wireframe and graphics to design and implement these components.

Feel free to customize and expand upon these components as needed for your project.
