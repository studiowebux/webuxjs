# webuxjs v1.1.1

This is the framework for Studio Webux Projects

- [Category](#category)
	- [Create a category](#create-a-category)
	- [Delete a category](#delete-a-category)
	- [Get all categories](#get-all-categories)
	- [Get one category](#get-one-category)
	- [Update a category](#update-a-category)
	
- [Part](#part)
	- [Create a part](#create-a-part)
	- [Delete a part](#delete-a-part)
	- [For a specific Part get its picture](#for-a-specific-part-get-its-picture)
	- [Get all parts](#get-all-parts)
	- [Get one part](#get-one-part)
	- [Update a part](#update-a-part)
	- [Upload a picture for a specific part](#upload-a-picture-for-a-specific-part)
	
- [Profile](#profile)
	- [Create a profile](#create-a-profile)
	- [Delete a profile](#delete-a-profile)
	- [Get all profiles](#get-all-profiles)
	- [Get one profile](#get-one-profile)
	- [Update a profile](#update-a-profile)
	
- [Status](#status)
	- [Create a status](#create-a-status)
	- [Delete a status](#delete-a-status)
	- [Get all status](#get-all-status)
	- [Get one status](#get-one-status)
	- [Update a status](#update-a-status)
	
- [User](#user)
	- [Create a user](#create-a-user)
	- [Delete a user](#delete-a-user)
	- [Get all users](#get-all-users)
	- [Get one user](#get-one-user)
	- [Update a user](#update-a-user)
	


# Category

## Create a category

<p>Create a category</p>

	POST /api/v1/category


### Success Response

Success-Response:

```
HTTP/1.1 201 CREATED
{
      "message": "",
      "devMessage": "",
      "success": true,
      "code": 201,
      "body": {
          "_id": "5d2fafa9f52ba67d93c3b741",
          "name": "Category 1",
          "description": "Description for category 1",
          "color": "ffffff",
          "created_at": "2019-07-17T23:30:49.819Z",
          "updated_at": "2019-07-17T23:30:49.819Z",
          "__v": 0
      }
  }
```
## Delete a category

<p>Delete a category</p>

	DELETE /api/v1/category/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| string			|  							|

### Success Response

Success-Response:

```
HTTP/1.1 204 NO CONTENT
```
## Get all categories

<p>Get all categories</p>

	GET /api/v1/category


### Success Response

Success-Response:

```
HTTP/1.1 200 OK
 {
      "message": "",
      "devMessage": "",
      "success": true,
      "code": 200,
      "body": {
          "5d2fb51ec1a7dd82a532dbc9": {
              "_id": "5d2fb51ec1a7dd82a532dbc9",
              "name": "CPU",
              "description": "Central Processing Unit",
              "color": "161FC4"
          },
          "5d2fb51ec1a7dd82a532dbca": {
              "_id": "5d2fb51ec1a7dd82a532dbca",
              "name": "GPU",
              "description": "Graphics Processing Unit",
              "color": "5b62d5"
          }
      }
  }
```
## Get one category

<p>Get one category</p>

	GET /api/v1/category/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| string			|  							|

### Success Response

Success-Response:

```
HTTP/1.1 200 OK
  {
      "message": "",
      "devMessage": "",
      "success": true,
      "code": 200,
      "body": {
          "_id": "5d2fb7606df7688537f20b6b",
          "name": "CPU",
          "description": "Central Processing Unit",
          "color": "161FC4"
      }
  }
```
## Update a category

<p>Update a category</p>

	PUT /api/v1/category/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| string			|  							|

### Success Response

Success-Response:

```
HTTP/1.1 200 OK
{
      "message": "",
      "devMessage": "",
      "success": true,
      "code": 200,
      "body": {
          "_id": "5d2fafa9f52ba67d93c3b741",
          "name": "Category 1",
          "description": "Description for category 1",
          "color": "ffffff",
          "created_at": "2019-07-17T23:30:49.819Z",
          "updated_at": "2019-07-17T23:30:49.819Z",
          "__v": 0
      }
  }
```
# Part

## Create a part

<p>Create a part</p>

	POST /api/v1/part


### Success Response

Success-Response:

```
HTTP/1.1 201 CREATED
{
    "message": "",
    "devMessage": "",
    "success": true,
    "code": 201,
    "body": {
        "_id": "5d2fb10d59f0587ef1dd06ef",
        "name": "Part 1",
        "description": "Description for part 1",
        "userID": "5d2faf0cf52ba67d93c3a543",
        "statusID": "5d2faf0cf52ba67d93c3b766",
        "created_at": "2019-07-17T23:36:45.467Z",
        "updated_at": "2019-07-17T23:36:45.467Z",
        "__v": 0
    }
}
```
## Delete a part

<p>Delete a part</p>

	DELETE /api/v1/part/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| string			|  							|

### Success Response

Success-Response:

```
HTTP/1.1 204 NO CONTENT
```
## For a specific Part get its picture

<p>For a specific Part get its picture</p>

	GET /api/v1/part/:id/picture


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| string			|  							|

### Success Response

Success-Response:

```
HTTP/1.1 200 OK
 -- A picture --
```
## Get all parts

<p>Get all parts</p>

	GET /api/v1/part


### Success Response

Success-Response:

```
HTTP/1.1 200 OK
  {
      "message": "",
      "devMessage": "",
      "success": true,
      "code": 200,
      "body": {
          "5d2fb51ec1a7dd82a532dbcb": {
              "_id": "5d2fb51ec1a7dd82a532dbcb",
              "name": "Part without categories",
              "description": "Something",
              "userID": "5d2fb51ec1a7dd82a532dbc5",
              "statusID": "5d2fb51ec1a7dd82a532dbc8"
          },
          "5d2fb51ec1a7dd82a532dbcc": {
              "_id": "5d2fb51ec1a7dd82a532dbcc",
              "name": "Part With Categories",
              "description": "Something else",
              "userID": "5d2fb51ec1a7dd82a532dbc6",
              "statusID": "5d2fb51ec1a7dd82a532dbc8"
          }
      }
  }
```
## Get one part

<p>Get one part</p>

	GET /api/v1/part/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| string			|  							|

### Success Response

Success-Response:

```
HTTP/1.1 200 OK
  {
      "message": "",
      "devMessage": "",
      "success": true,
      "code": 200,
      "body": {
          "_id": "5d2fb7606df7688537f20b6e",
          "name": "Part With Categories",
          "description": "Something else",
          "userID": {
              "_id": "5d2fb7606df7688537f20b68",
              "email": "user@webuxlab.com",
              "created_at": "2019-07-18T00:03:44.507Z",
              "updated_at": "2019-07-18T00:03:44.507Z",
              "__v": 0
          },
          "statusID": {
              "_id": "5d2fb7606df7688537f20b6a",
              "name": "New",
              "description": "New product",
              "color": "00ff11",
              "created_at": "2019-07-18T00:03:44.607Z",
              "updated_at": "2019-07-18T00:03:44.607Z",
              "__v": 0
          },
          "categories": {
              "5d2fb7606df7688537f20b6b": {
                  "_id": "5d2fb7606df7688537f20b6b",
                  "name": "CPU",
                  "description": "Central Processing Unit",
                  "color": "161FC4",
                  "created_at": "2019-07-18T00:03:44.628Z",
                  "updated_at": "2019-07-18T00:03:44.628Z",
                  "__v": 0
              },
              "5d2fb7606df7688537f20b6c": {
                  "_id": "5d2fb7606df7688537f20b6c",
                  "name": "GPU",
                  "description": "Graphics Processing Unit",
                  "color": "5b62d5",
                  "created_at": "2019-07-18T00:03:44.628Z",
                  "updated_at": "2019-07-18T00:03:44.628Z",
                  "__v": 0
              }
          }
      }
  }
```
## Update a part

<p>Update a part</p>

	PUT /api/v1/part/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| string			|  							|

### Success Response

Success-Response:

```
HTTP/1.1 200 OK
{
    "message": "",
    "devMessage": "",
    "success": true,
    "code": 200,
    "body": {
        "_id": "5d2fb10d59f0587ef1dd06ef",
        "name": "Part 1",
        "description": "Description for part 1",
        "userID": "5d2faf0cf52ba67d93c3a543",
        "statusID": "5d2faf0cf52ba67d93c3b766",
        "created_at": "2019-07-17T23:36:45.467Z",
        "updated_at": "2019-07-17T23:36:45.467Z",
        "__v": 0
    }
}
```
## Upload a picture for a specific part

<p>Upload a picture for a specific part</p>

	POST /api/v1/part/:id

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Content-Type			| string			|  <p>multipart/form-data</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| string			|  							|

### Success Response

Success-Response:

```
HTTP/1.1 200 OK
  {
      "message": "",
      "devMessage": "",
      "success": true,
      "code": 200,
      "body": {
          "_id": "5d2fb7606df7688537f20b6d",
          "name": "Part without categories",
          "description": "Something",
          "userID": "5d2fb7606df7688537f20b67",
          "statusID": "5d2fb7606df7688537f20b6a",
          "created_at": "2019-07-18T00:03:44.705Z",
          "updated_at": "2019-07-18T00:13:27.964Z",
          "__v": 0,
          "pictureURL": "/Documents/Studiowebux/framework/webuxjs/uploads/5d2fb7606df7688537f20b6d.png"
      }
  }
```
# Profile

## Create a profile

<p>Create a profile</p>

	POST /api/v1/profile


### Success Response

Success-Response:

```
HTTP/1.1 201 CREATED
  {
      "message": "",
      "devMessage": "",
      "success": true,
      "code": 201,
      "body": {
          "_id": "5d2fb10059f0587ef1dd06e7",
          "email": "user@webuxlab.com",
          "created_at": "2019-07-17T23:36:32.271Z",
          "updated_at": "2019-07-17T23:39:50.573Z",
          "__v": 0,
          "profileID": "5d2fb1c659f0587ef1dd06f2"
      }
  }
```
## Delete a profile

<p>Delete a profile</p>

	DELETE /api/v1/profile/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| string			|  							|

### Success Response

Success-Response:

```
HTTP/1.1 204 NO CONTENT
```
## Get all profiles

<p>Get all profiles</p>

	GET /api/v1/profile


### Success Response

Success-Response:

```
HTTP/1.1 200 OK
  {
      "message": "",
      "devMessage": "",
      "success": true,
      "code": 200,
      "body": {
          "5d2fb51ec1a7dd82a532dbc7": {
              "_id": "5d2fb51ec1a7dd82a532dbc7",
              "fullname": "Administrator"
          }
      }
  }
```
## Get one profile

<p>Get one profile</p>

	GET /api/v1/profile/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| string			|  							|

### Success Response

Success-Response:

```
HTTP/1.1 200 OK
  {
      "message": "",
      "devMessage": "",
      "success": true,
      "code": 200,
      "body": {
          "_id": "5d2fb7606df7688537f20b69",
          "fullname": "Administrator"
      }
  }
```
## Update a profile

<p>Update a profile</p>

	PUT /api/v1/profile/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| string			|  							|

### Success Response

Success-Response:

```
HTTP/1.1 200 OK
  {
      "message": "",
      "devMessage": "",
      "success": true,
      "code": 200,
      "body": {
          "_id": "5d2fb10059f0587ef1dd06e7",
          "email": "user@webuxlab.com",
          "created_at": "2019-07-17T23:36:32.271Z",
          "updated_at": "2019-07-17T23:39:50.573Z",
          "__v": 0,
          "profileID": "5d2fb1c659f0587ef1dd06f2"
      }
  }
```
# Status

## Create a status

<p>Create a status</p>

	POST /api/v1/status


### Success Response

Success-Response:

```
HTTP/1.1 201 CREATED
{
      "message": "",
      "devMessage": "",
      "success": true,
      "code": 201,
      "body": {
          "_id": "5d2fafa9f52ba67d93c3b741",
          "name": "Status 1",
          "description": "Description for status 1",
          "color": "ffffff",
          "created_at": "2019-07-17T23:30:49.819Z",
          "updated_at": "2019-07-17T23:30:49.819Z",
          "__v": 0
      }
  }
```
## Delete a status

<p>Delete a status</p>

	DELETE /api/v1/status/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| string			|  							|

### Success Response

Success-Response:

```
HTTP/1.1 204 NO CONTENT
```
## Get all status

<p>Get all status</p>

	GET /api/v1/status


### Success Response

Success-Response:

```
HTTP/1.1 200 OK
  {
      "message": "",
      "devMessage": "",
      "success": true,
      "code": 200,
      "body": {
          "5d2fb51ec1a7dd82a532dbc8": {
              "_id": "5d2fb51ec1a7dd82a532dbc8",
              "name": "New",
              "description": "New product",
              "color": "00ff11"
          }
      }
  }
```
## Get one status

<p>Get one status</p>

	GET /api/v1/status/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| string			|  							|

### Success Response

Success-Response:

```
HTTP/1.1 200 OK
  {
      "message": "",
      "devMessage": "",
      "success": true,
      "code": 200,
      "body": {
          "_id": "5d2fb7606df7688537f20b6a",
          "name": "New",
          "description": "New product",
          "color": "00ff11"
      }
  }
```
## Update a status

<p>Update a status</p>

	PUT /api/v1/status/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| string			|  							|

### Success Response

Success-Response:

```
HTTP/1.1 200 OK
{
      "message": "",
      "devMessage": "",
      "success": true,
      "code": 200,
      "body": {
          "_id": "5d2fafa9f52ba67d93c3b741",
          "name": "Status 1",
          "description": "Description for status 1",
          "color": "ffffff",
          "created_at": "2019-07-17T23:30:49.819Z",
          "updated_at": "2019-07-17T23:30:49.819Z",
          "__v": 0
      }
  }
```
# User

## Create a user

<p>Create a user</p>

	POST /api/v1/user


### Success Response

Success-Response:

```
HTTP/1.1 201 CREATED
  {
      "message": "",
      "devMessage": "",
      "success": true,
      "code": 201,
      "body": {
          "_id": "5d2fb25559f0587ef1dd06f4",
          "email": "user01@webuxlab.com",
          "created_at": "2019-07-17T23:42:13.898Z",
          "updated_at": "2019-07-17T23:42:13.898Z",
          "__v": 0
      }
  }
```
## Delete a user

<p>Delete a user</p>

	DELETE /api/v1/user/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| string			|  							|

### Success Response

Success-Response:

```
HTTP/1.1 204 NO CONTENT
```
## Get all users

<p>Get all users</p>

	GET /api/v1/user


### Success Response

Success-Response:

```
HTTP/1.1 200 OK
  {
      "message": "",
      "devMessage": "",
      "success": true,
      "code": 200,
      "body": {
          "5d2fb51ec1a7dd82a532dbc6": {
              "_id": "5d2fb51ec1a7dd82a532dbc6",
              "email": "user@webuxlab.com"
          },
          "5d2fb51ec1a7dd82a532dbc5": {
              "_id": "5d2fb51ec1a7dd82a532dbc5",
              "email": "admin@webuxlab.com",
              "profileID": "5d2fb51ec1a7dd82a532dbc7"
          }
      }
  }
```
## Get one user

<p>Get one user</p>

	GET /api/v1/user/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| string			|  							|

### Success Response

Success-Response:

```
HTTP/1.1 200 OK
  {
    "message": "",
    "devMessage": "",
    "success": true,
    "code": 200,
    "body": {
        "_id": "5d2fb51ec1a7dd82a532dbc5",
        "email": "admin@webuxlab.com",
        "profileID": {
            "_id": "5d2fb51ec1a7dd82a532dbc7",
            "fullname": "Administrator",
            "created_at": "2019-07-17T23:54:06.684Z",
            "updated_at": "2019-07-17T23:54:06.684Z",
            "__v": 0
        }
    }
  }
```
## Update a user

<p>Update a user</p>

	PUT /api/v1/user/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| string			|  							|

### Success Response

Success-Response:

```
HTTP/1.1 200 OK
  {
      "message": "",
      "devMessage": "",
      "success": true,
      "code": 200,
      "body": {
          "_id": "5d2fb25559f0587ef1dd06f4",
          "email": "user01@webuxlab.com",
          "created_at": "2019-07-17T23:42:13.898Z",
          "updated_at": "2019-07-17T23:42:13.898Z",
          "__v": 0
      }
  }
```

