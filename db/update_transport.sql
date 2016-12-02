UPDATE scores
SET total = $1, transport = $2
WHERE userid = $3
RETURNING *;
