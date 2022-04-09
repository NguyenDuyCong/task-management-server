### API docs

- signup

```js
// request:
method: POST
/api/auth/signup

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
/api/auth/signin

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
/api/auth/signout
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
/api/auth
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
/api/auth/token

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
/api/email/confirm
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
/api/email/confirm/:hash
----------------------------------------
// response:
{
  success: true,
  message: "email is verified!"
}
```
