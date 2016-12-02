INSERT INTO users (firstname, lastname, state, email, password)
VALUES ($1, $2, $3, $4, $5)
RETURNING id, firstname, lastname, state, email;
