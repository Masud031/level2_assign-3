# Project Overview – Level 2 Assignment 3
In this project, I have built a simple Book Library Management System using TypeScript, Express.js, and MongoDB. The structure is well-organized with proper separation of concerns:

# Modular Folder Structure:
The project is neatly organized into separate folders for models, controllers, and routes.

# Book Feature:
CRUD operations are implemented for managing books. The logic is divided into:

book.model.ts

book.controller.ts

book.rout.ts

# Borrow Feature:
Users can borrow and return books. This feature also follows the same three-part structure:

borrow.model.ts

borrow.controller.ts

borrow.rout.ts

* MongoDB Connection is securely handled via environment variables.

* Tested via Postman and also works correctly in the browser.

* Clean and scalable setup with potential for extension like user auth, pagination, etc.

This structure promotes readability, maintainability, and good development practices.
