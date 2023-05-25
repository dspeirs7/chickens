# Chickens

A little app to help manage our chickens using dotnet angular and docker with a mongodb!

## Instructions

You will need two .env files, one .dotnet.env and one .mongo.env. They should look like this:

.dotnet.env

```
ASPNETCORE_ENVIRONMENT=Development
ChickensDatabase__ConnectionString=mongodb://username:password@chicken-db:27017
```

.mongo.env

```
MONGO_INITDB_ROOT_USERNAME=username
MONGO_INITDB_ROOT_PASSWORD=password
MONGO_INITDB_DATABASE=chickens
```

## Screenshots

![HomePage](/assets/main_screen.png)
![ChickenPage](/assets/chicken_screen.png)
