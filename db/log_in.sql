SELECT id, firstname, lastname, state, title, interests, photo FROM users
WHERE email = $1 AND password = $2;
