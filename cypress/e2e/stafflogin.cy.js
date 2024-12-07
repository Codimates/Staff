/// <reference types="cypress" />

describe('SignCompo Tests', () => {
  beforeEach(() => {
    // Visit the login page
    cy.visit('http://localhost:3000/'); // Update the route to match your application's login page route
  });

  it('renders the login form correctly', () => {
    // Check if all elements are rendered
    cy.get('h2').should('contain.text', 'Welcome Back');
    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="password"]').should('exist');
    cy.contains('button', 'Login').should('exist');
    cy.contains('button', 'Register').should('exist');
    cy.contains('button', 'Forgot password?').should('exist');
  });

  it('validates email and password inputs', () => {
    // Attempt login without filling fields
    cy.contains('button', 'Login').click();
    cy.contains('Please fill in all fields').should('exist');
  });

  it('displays an error for invalid login', () => {
    // Enter invalid credentials
    cy.get('input[name="email"]').type('invalid@example.com');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.contains('button', 'Login').click();

    // Mock API response for invalid login
    cy.intercept('POST', '/user/loginstaff', {
      statusCode: 401,
      body: { error: 'Invalid credentials' },
    });

    cy.contains('Invalid credentials').should('exist');
  });

  it('logs in successfully for valid credentials', () => {
    // Enter valid credentials
    cy.get('input[name="email"]').type('admin@gmail.com');
    cy.get('input[name="password"]').type('12345');
    cy.contains('button', 'Login').click();

    // Mock API response for valid login
    cy.intercept('POST', '/user/loginstaff', {
      statusCode: 200,
      body: { role: 'admin', email: 'admin8@gmail.com' },
    });

    // Assert success message and navigation
    cy.contains('Successfully logged in!').should('exist');
    cy.url().should('eq', Cypress.config().baseUrl + '/admindash');
  });

  it('prevents login for "customer" role users', () => {
    // Enter credentials for a user with the 'customer' role
    cy.get('input[name="email"]').type('customer@example.com');
    cy.get('input[name="password"]').type('customerpassword');
    cy.contains('button', 'Login').click();

    // Mock API response for customer role
    cy.intercept('POST', '/user/loginstaff', {
      statusCode: 200,
      body: { role: 'customer', email: 'customer@example.com' },
    });

    cy.contains('Invalid user role: Customers cannot log in here.').should('exist');
  });

  it('navigates to register and forgot password pages', () => {
    // Navigate to register page
    cy.contains('button', 'Register').click();
    cy.url().should('include', '/register');

    // Navigate to forgot password page
    cy.visit('/login');
    cy.contains('button', 'Forgot password?').click();
    cy.url().should('include', '/forgot-password');
  });
});