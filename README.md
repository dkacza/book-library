# Book Library

Live demo:
https://book-library-mern-app.netlify.app/
Login in with `example@test.com` and `pass1234` to check it out!

### General description
This is a fullstack web application built on top of a REST API I have written before.
It's a website dedicated for a fictional library.
It can be used for browsing data about books, borrowing them to the users and many other activities, which are mentioned in the repository for the server-side:
https://github.com/dkacza/library-api

### Technical details
The application uses React.js on the client-side and Express.js with MongoDB on the server-side. It was designed and prototyped with Figma.
Throughout the development I have used many 3rd party npm packages for better development experience. like styled components, react router or react use form.
I have equipped this application with a complex validation and error handling mechanisms in order to prevent unauthorized access or corruption of data.

### Screenshots
![login screenshot](./screenshots/login-screenshot.png "login")
![book screenshot](./screenshots/book-screenshot.png "books")
![borrowing screenshot](./screenshots/borrowings-screenshot.png "borrowings")

### How to run it?
I encourage you to try my app through a live demo, but you can also set it up locally on your machine.
1. Clone the repository and run `npm install` inside the folder.
2. Update the API preset. (optional)
    If you want the application to send request to localhost instead of externally deployed backend, then you have to update `API_URL` variable inside the `src/api/axios.js`.
    Update it according to your needs.
3. Run `npm run start` and you're good to go!