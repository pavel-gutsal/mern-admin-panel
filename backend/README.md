API:

http://localhost:8000/users  - POST request, request body = User object, type {userID, email, password, isAdmin} , purpose ==> get all users from database

http://localhost:8000/newUser  - POST request, request body = User object, type { name, age, email, password }, purpose ==> create new user on database

http://localhost:8000/createAdmin  - POST request, request body = User object, type { name, age, email, password }, purpose ==> create admin - only through postman

http://localhost:8000/signin  - POST request, request body = User object, type { email, password }, purpose ==> sign in to existing user

http://localhost:8000/  - DELETE request, request body = object,
type { user: { id: string;  user: User} }
purpose ==> delete user with user.id

http://localhost:8000/  - PATCH request, request body = object,
type { user: { userID: string;  user: User; update: User} }
purpose ==> find user with user.userId, and update fields from user.update.
user.user - to check if isAdmin=== true