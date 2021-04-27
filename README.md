
<h1 align="center">
  Docs: Compass
</h1>

# About the project:

API developed for a backend challenge

### Postman Collection

Import the `Teste - Compasso.postman_collection.json` on Postman App.

# Requirements:

- Docker
- Docker compose


# How to start:

**Warning**: The application will start on port **8000** and the mongo on port **27017**, check if these ports are available


#### To start the project (Enter the project folder)


Start the docker-compose first time:

    $ docker-compose up -d --build

Start docker-compose at another time:

    $ docker-compose up -d

To run the tests:

    $ docker exec -it compass-api npm run test

# Routes:

`URL:` http://localhost:3000/
Returns a JSON in this format, containing the server status.

    {
		"Author": "Augusto Vinicius",
		"Github": "https://github.com/adoidadox2",
		"Project": "compass'",
		"Version": "1.0.0",
		"Status": "Online"
	}

# City Routes

## Store -`POST`-

### `/cities`
Register new cities


	  {
		"name":"Recife",
		"state":"Pernambuco"
	  }
if everything goes well, response will be:

	 {
		"message": "City created successfully",
		"data": {
			"_id": "6087adf67096bd003a9a33d0",
			"name": "Recife",
			"email": "Pernambuco"
		}
	 }

## Index -`GET`-

### `/cities`
Returns registered cities, having the possibility to use query params like: 
"?state=Pernambuco" or "?city=Caruaru"

if everything goes well, response will be:


	  {
		"message": "Cities listed successfully",
		"data": [
			{
				"_id": "6087adf67096bd003a9a33d0",
				"name": "Recife",
				"state": "Pernambuco",
				"createdAt": "2021-04-12T00:21:45.371Z"
			},
			{
				"_id": "60751f73bb361b0140d2ef31",
				"name": "João Pessoa",
				"state": "Paraíba",
				"createdAt": "2021-04-13T04:34:59.097Z"
			}
		]
	}

# Customer Routes

## Store -`POST`-

### `/customers`
Register new customers


	  {
		"full_name":"Augusto",
		"birth_date": "2000-09-28",
		"gender":"male",
		"city_id":"608509772f3f8a2a5c9d9f96"
	  }
if everything goes well, response will be:

	{
		"message": "Customer created successfully",
		"data": {
			"user": {
				"_id": "60739299591f682a685fb9b1",
				"full_name": "Augusto",
				"gender": "male",
				"birth_date": "2000-09-28T00:00:00.000Z"
			}
	}

## Index -`GET`-

### `/customers`
Returns registered customers, having the possibility to use query params like: 
"?name=Augusto"

if everything goes well, response will be:


	  {
		"message": "Customers listed successfully",
		"data": [
			{
				"_id": "6087adf67096bd003a9a33d0",
				"full_name": "Augusto",
				"gender": "male",
				"birth_date": "2000-09-28T00:00:00.000Z",
				"city": {
					"_id": "6087adf67096bd003a9a33d0",
					"name": "Recife",
					"state": "Pernambuco"
				},
				"created_at": "2000-09-28T00:00:00.000Z",
				"age": 29
			},
			{
				"_id": "6087adf67096bd003a9a33d0",
				"full_name": "Carlos",
				"gender": "male",
				"birth_date": "2000-09-28T00:00:00.000Z",
				"city": {
					"_id": "6087b2d37096bd003a9a33d1",
					"name": "São Paulo",
					"state": "São Paulo"
				},
				"created_at": "2000-09-28T00:00:00.000Z",
				"age": 21
			},
		]
	}

## Show-`GET`-

### `/customers/:customerId`
Returns information for a specific customer

if everything goes well, response will be:



	  {
	    "message": "Customer listed successfully",
	    "data": {
	        "age": 20,
	        "_id": "6087adf67096bd003a9a33d0",
	        "full_name": "Augusto",
	        "gender": "male",
	        "birth_date": "2000-09-28T00:00:00.000Z",
	        "city": {
	            "_id": "6087adf67096bd003a9a33d0",
	            "name": "Recife",
	            "state": "Pernambuco",
	            "created_at": "2021-04-27T06:23:50.930Z",
	            "updated_at": "2021-04-27T06:23:50.930Z",
	            "__v": 0
	        },
	        "created_at": "2021-04-27T06:48:01.874Z",
	        "updated_at": "2021-04-27T06:48:01.874Z"
	    }
	   }
	  
## Destroy -`DELETE`-

### `/customers/:customerId`
Delete a specific customer

if everything goes well, response will be:

	  {
	    "message": "Customer removed successfully"
	  }

## Update -`Patch`-

### `/customers/:customerId`
Register new customers


	  {
		"full_name":"Cesar"
	  }
if everything goes well, response will be:

	{
	    "message": "Customer updated successfully",
	    "data": {
	        "_id": "6087b6bf74a93b0034477a27",
	        "full_name": "Cesar",
	        "created_at": "2021-04-27T07:01:19.780Z",
	        "updated_at": "2021-04-27T07:02:13.040Z"
	    }
	}
