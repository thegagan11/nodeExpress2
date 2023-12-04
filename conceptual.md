### Conceptual Exercise

Answer the following questions below:

- What is a JWT?
JWT(JSON Web token) between two places online in a safe and compact way. It's used for logging into websites, it's secured with digital signature.
- What is the signature portion of the JWT?  What does it do?
  JWT has three parts, and the signature portion of it makes sure that JWT hasn't been changed by anyone after it was made. It uses a secret Code to secure the token.
- If a JWT is intercepted, can the attacker see what's inside the payload?
  Yes, they can see what's inside. But, they can't change it without secret key used to creat3e the signature. So, the information is safe from tampering.
- How can you implement authentication with a JWT?  Describe how it works at a high level.
  User logs in with username, ,and password, if correct, the server makes a JWT that has user details, the server gives the jwt back to the server every time they want to access something, the server checks the JWT each time to make sure it's okay.
- Compare and contrast unit, integration and end-to-end tests.
  UNIT TESTS: Checks small parts of a program, like a single function. 
  Integration Tests: checks how different parts of a program work together.
  End-to-End Tests: Checks the whole program from start to finish, like how a user would use it.
- What is a mock? What are some things you would mock?
  Mock is a fake version of a part of your program used in testing, It pretends to be something like a database or a service, so you can test other parts of your program without needing the real thing.
- What is continuous integration?
Continuous integraiton is when all the programmers working on a project regularly merge their chagnes into the main project. There's a system that checks these changes automatically to make sure they don't break anything.
- What is an environment variable and what are they used for?
An environment variable is like a setting on a computer that programs can use. they are used to store important or changing information like passwords, so you don't have to put them directly in you code.
- What is TDD? What are some benefits and drawbacks?
TDD(Test-Driven-Development) is when you write tests for your code before writing the code itsel. This helps make sure your code works right and is easy to change later. It can be bit slow to start with and hard to learn, but it makes better code in the end.
- What is the value of using JSONSchema for validation?
JSON Schema is a way to check that the data in JSON format (a common data format used in web applications) is correct. It makes sure that the data has the right structure and content, which helps prevent errors and makes it clear what kind of data should be sent or received.
- What are some ways to decide which code to test?

- What does `RETURNING` do in SQL? When would you use it?
 It's used to immediately get data back from rows that you've just added, updated, or deleted. It's like doing an 'INSERT', 'UPDATE', or 'DELETE' and a 'SELECT' in one step. For example, when you add a new row to a table, 'RETURNING' can give you the new row's ID right away. It's useful because it saves you from having to do another query to get this information.
- What are some differences between Web Sockets and HTTP?
 WebSockets an dHTTP are both protocols for web communication but differe mainly in how they connect. WebSockets create a persistent, two-way connection, allowing for continuous, real-time data exchange between a client and server, this is great for applicaitons like live chats or gaming. On the other hand, HTTP works on a requect-response model, where the client sends a request, the server responds, and then the connection closes. HTTP is commonly used for web page loading and typical web requests. WebSockets are more efficient for requent data exchanges, while HTTP is simpler for standard, one-time data reterievals.
