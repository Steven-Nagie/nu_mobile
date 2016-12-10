SELECT total, transport, energy, water, waste, food
FROM scores
WHERE userid = $1;
