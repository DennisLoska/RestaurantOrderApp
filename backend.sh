#!/bin/bash
# changed sh to bash: https://askubuntu.com/questions/504546/error-message-source-not-found-when-running-a-script
# Prepare Flask backend
current_directory=$PWD

# start virtualenv
source $current_directory/flask-react/bin/activate

# prepare Flask app
export FLASK_DEBUG=1
export FLASK_APP=server.py

echo "Starting Flask server."
# run Flask app
# flask run
python $current_directory/server.py