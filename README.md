# RestaurantOrderApp

We based the configuration of the project on this boilerplate with a Flask backend and React frontend

- https://github.com/modle/flask-react

## Get started

**Clone the repository!**

then:

```
cd RestaurantOrderApp/
virtualenv flask-react
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

## Virtual Environment

To work inside a virtual environment you need to create it first:

```
cd ./RestaurantOrderApp
virtualenv flask-react
```

After this is done go to the bin folder and activate it:

```
cd ./RestaurantOrderApp/flask-react/bin
source activate
```

Now you are inside the flask-react vortual environment and can go on and install the dependencies from
_requirements.txt:

```
cd ./RestaurantOrderApp/flask-react/bin
source activate
```

### Prepare the environment variables for Flask:

```
cd ./RestaurantOrderApp/
export FLASK_DEBUG=1
export FLASK_APP=server.py
```

Now you can run Flask correctly in the virtual environment:

```
flask run
```
The outpout should look as follows:
  
```
 * Serving Flask app "server"
 * Forcing debug mode on
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 622-298-193
```
### Exiting the virtual environment

To exit the virtual environment just type in **deactivate** in your console from any directory.

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

The Flask server runs on localhost:5000 and the Webpack development server on port 3000
