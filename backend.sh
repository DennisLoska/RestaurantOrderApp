#!/bin/sh

# Prepare Flask backend
current_directory=$PWD

# start virtualenv
source $current_directory/flask-react/bin/activate

# prepare Flask app
export FLASK_DEBUG=1
export FLASK_APP=server.py

echo "Starting Flask server."
# run Flask app
flask run
