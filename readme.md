Back end for Atomic

Use .env.local, copied from .env with your own parameters

By Fabien ARTHUR



Routes : 
All routes need service tokens : header [x-service-token]={{put the service token here}}
Private route needs a Bearer token, given by login or register

/api/secure/login : login un utilisateur
POST
```
{
    "User_Email":"fabien.test@email.com",
    "User_Password":"azerty"
}
```

/api/secure/register : register un nouvel utilisateur
POST
```
{
    "User_Username":"Fabien",
    "User_Role": "user",
    "User_Email":"fabien.test@email.com",
    "User_Password":"azerty"
}
```

/api/secure/verify : verify le token d'un utilisateur
GET


/api/users : créer un utilisateur ou getAll utilisateurs
GET
POST
```
{
    "User_Username":"Fabien",
    "User_Role": "user",
    "User_Email":"fabien.test@email.com",
    "User_Password":"azerty"
}
```

/api/users/:id : get, update (put) ou delete (delete) un utilisateur
GET
PUT 
```
{
    "User_Username":"Fabien",
    "User_Role": "user",
    "User_Email":"fabien.test@email.com",
    "User_Password":"azerty"
}
```
DELETE