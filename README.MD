### API docs

#### check docs in site: https://ndc-task-management-server.herokuapp.com/api/v1/docs

- signup

```js
// request:
method: POST
/api/v1/auth/signup

{
  "username": "test",
  "email": "abc@abc.com",
  "password": "abcxyz"
}

----------------------------------------
// response:
{
  success: true,
  user: {
    username,
    email,
    isVerify,
    avatar,
    role
  },
  tokens: {
    accessToken,
    refreshToken
  }
}
```

- signin

```js
// request:
method: POST
/api/v1/auth/signin

{
  "email": "abc@abc.com",
  "password": "abcxyz"
}
----------------------------------------
// response:
{
  success: true,
  user: {
    username,
    email,
    isVerify,
    avatar,
    role
  },
  tokens: {
    accessToken,
    refreshToken
  }
}

```

- signout

```js
// request:
method: POST
/api/v1/auth/signout
Authorization: Bearer abcxyz(accessToken)
----------------------------------------
// response:
{
  success: true,
  message: "See you again!"
}
```

- base auth

```js
// request:
method: POST
/api/v1/auth
Authorization: Bearer accessToken
----------------------------------------
// response:
{
  success: true,
  user: {
    username,
    email,
    isVerify,
    avatar,
    role
  }
}
```

- refresh new token

```js
// request:
method: POST
/api/v1/auth/token

{
  "refreshToken": refreshToken
}
----------------------------------------
// response:
{
  success: true,
  tokens: {
    accessToken,
    refreshToken
  }
}
```

- request to verify email

```js
// request:
method: POST
/api/v1/email/confirm
{
  "username": "test",
  "email": "abc@abc.com"
}
----------------------------------------
// response:
{
  success: true,
  message: "please check your email!"
}
```

- verify email

```js
// request:
method: GET
/api/v1/email/confirm/:code
----------------------------------------
// response:
{
  success: true,
  message: "email is verified!"
}
```
