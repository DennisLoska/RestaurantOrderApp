# RestaurantOrderApp

We based the configuration of the project on this boilerplate with a Flask backend and React frontend

- https://github.com/modle/flask-react

## Get started

**Clone the repository!**

then:

```
cd RestaurantOrderApp/
```

**In one tab**

```
sh setup.sh
```

-> install frontend and backend dependencies and start the Flask server

**In another tab**

```
cd app && npm start
```

-> start frontend development server

## Development

**In one tab**

```
cd ./RestaurantOrderApp && python server.py
```

-> start the backend server

**In another tab**

```
cd app && npm start
```

-> start frontend development server

Try to go to the route /test to make sure React-Router is also working!

## Deployment

```
cd app/
npm run build
```

## Starting deployed application

```
cd RestaurantOrderApp/
python server.py
```

The Flask server runs on localhost:4000 and the Webpack development server on port 3000
