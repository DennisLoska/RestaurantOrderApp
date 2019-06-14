# RestaurantOrderApp

We based the configuration of the project on this boilerplate with a Flask backend and React frontend

- https://github.com/modle/flask-react

The Flask server runs on localhost:5000 and the Webpack development server on port 3000

## Getting started

1. Clone the repository!

then:

```
cd RestaurantOrderApp
```

2. Create a virtual environment

Python 2:

```
// install virtualenv if it is missing
pip install --user virtualenv

virtualenv flask-react
```

Python 3:

```
python -m venv flask-react
```

3. Install dependencies and set up the server

**In one tab**

- install frontend and backend dependencies and start the Flask server

on Linux and macOS:

```sh
sh setup.sh
```

on Windows:

```cmd
setup.bat
```

**In another tab**

- start frontend development server

```
cd app && npm start
```

## Virtual Environment

These steps are only relevant if you did not execute the _setup.sh_ inside a virtual environment before! If you did, you can skip this part!

### Set up the virtual environment

To work inside a virtual environment you need to create it first:

Python 2:

```
cd RestaurantOrderApp

// install virtualenv if it is missing
pip install --user virtualenv

virtualenv flask-react
```

Python 3:

```
cd RestaurantOrderApp
python -m venv flask-react
```

After this is done activate the virtual environment:

on Linux and macOS:

```sh
source flask-react/bin/activate
```

on Windows:

```cmd
flask-react/Scripts/activate.bat
```

Now you are inside the flask-react virtual environment and you can go on and install the dependencies from requirements.txt:

```
pip install -r requirements.txt
```

### Prepare the environment variables for Flask

on Linux and macOS:

```sh
cd RestaurantOrderApp
export FLASK_DEBUG=1
export FLASK_APP=server.py
```

on Windows:

```cmd
cd RestaurantOrderApp
set FLASK_DEBUG=1
set FLASK_APP=server.py
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

- start the backend server

on Linux and macOS:

```sh
cd RestaurantOrderApp/app
npm run backend:unix
```

on Windows:

```cmd
cd RestaurantOrderApp\app
npm run backend:win
```

**In another tab**

- start frontend development server

```
cd RestaurantOrderApp/app
npm start
```

Try to go to the route /test to make sure React-Router is also working!

## Deployment

```
cd RestaurantOrderApp/app
npm run build
```

## Starting deployed application

on Linux and macOS:

```sh
cd RestaurantOrderApp/app
npm run backend:unix
```

on Windows:

```cmd
cd RestaurantOrderApp/app
npm run backend:win
```

Visit http://localhost:3000 to view the deployed app!
