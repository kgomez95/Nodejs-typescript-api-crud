SELECT lgn.*
FROM LOGINS lgn
WHERE lgn.username = ?
    AND lgn.enabled = 1