# Guideline

This project is using `create-react-app --template typescript` as a base.

It is not fully complete, still has something to improve. I will try to finish it in my spare time.

## Let it work

### add .env file

This app needs `.env`, I will send it in my email.

### run it

```
npm start
```

## Tools

-   build - create-react-app
-   view - React (Hooks)
-   flow - Redux, Redux-Observable, RxJS
-   style - styled-components
-   proxy - http-proxy-middleware
-   api - Github REST API

## Features

### OAuth Login

-   login status
-   greetings

### UserList

-   total users count
-   max 100 users
-   change to page view, will fetch max users at once

### UserDetail

-   click user item will show user detail
-   simple cache, if you fetch this user before, you won't fetch again.

## API interface

http://json2ts.com/ converting json to typescript interface.
