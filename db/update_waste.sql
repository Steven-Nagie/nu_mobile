UPDATE scores
SET total = $1, waste = $2
WHERE userid = $3;
