SELECT id, firstname, lastname, state, title, interests FROM users
WHERE email = $1 AND password = $2;
