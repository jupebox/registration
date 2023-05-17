# Assignment: Building a User Registration Form

Your task is to create a user registration form using HTML, CSS3, Node.js, and ES6. The form should include the following fields:

1. Name (text input)
2. Email (email input)
3. Password (password input)
4. Confirm Password (password input)
5. Submit Button

You should perform the following tasks:

1. **HTML**: Edit the HTML file named `index.html` and fix the user registration form structure. Make sure to include necessary HTML tags and attributes to completely view and submit the form.
2. **CSS3**: Edit the CSS file named `styles.css` and apply the necessary styles to make the form visually appealing. Use CSS3 features to enhance the form's appearance and layout.
   - For Mobile view, place the field labels _above_ the input fields. For tablet and above, the labels should be to the left of the inputs, and the inputs should be all visually lined up.
3. **Node.js**: Start a Node.js server from file named `server.js`. Run a basic HTTP server with the command `npm run develop` that serves the `index.html` file and the associated CSS file.
4. **ES6**: In the `script.js` file, write JavaScript code using ES6 syntax to perform the following validations before submitting the form:
    - Ensure that the name field is not empty and contains only letters.
    - Validate the email field to ensure it is a valid email address.
    - Ensure that the password field is at least 8 characters long and contains at least one uppercase letter, one lowercase letter, and one digit.
    - Check if the confirmation password field matches the password field.
    - Display appropriate error messages if any of the above validations fail.

5. **Fix the Bugs**: Unfortunately, the initial implementation of the code has some bugs. You need to identify and fix the issues to make the registration form work correctly.

## Submission Guidelines:

1. Clone or Fork this repository to your own GitHub account.
2. Complete the assignment by fixing the code and ensuring that the registration form works as expected.
3. Wrap the form into a page template and style it with your own CSS. You have your own freedom of design here.
4. The form should submit successfully, disappear and then a 'Thank You' message should be displayed without a page refresh.
5. Commit and push all the required files to your forked repository.
6. Share the link to your forked repository with us by responding to the email address of your Absorb recruiter.

**Note:** You may use any additional libraries or frameworks if necessary.

## Evaluation Criteria:

- Correctness: The form should validate user input accurately and prevent submission if any errors occur.
- Code Quality: The code should be well-structured, maintainable, and follow best practices for HTML, CSS3, Node.js, and ES6.
- Style: It doesn't have to follow any strict design, other than what's mentioned in item 2a above, but at least make it look good on all screen sizes. If need be, make layout adjustments for different screen sizes.
- Bug Fixes: All the initial bugs should be identified and fixed.
- Functional: All objectives should be completed for submitting the form, showing the 'Thank You message', passing all tests and linting with `npm run lint`
- UI/UX: The form should be visually appealing and have a user-friendly design.

Good luck, and we look forward to reviewing your submission!
