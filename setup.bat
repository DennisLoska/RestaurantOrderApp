@echo off
REM Setup and install dependencies for frontend and backend on Windows

set current_directory=%cd%

REM Prepare React app
cd %current_directory%\app\

REM install frontend dependencies
call npm install

@echo Frontend dependencies installed.

REM Prepare Flask backend
cd %current_directory%

REM start virtualenv
call %current_directory%\flask-react\Scripts\activate.bat

REM install backend dependencies
call pip install -r requirements.txt

echo Backend dependencies installed.

REM prepare Flask app
set FLASK_DEBUG=1
set FLASK_APP=server.py

echo Starting Flask server.
REM run Flask app
call flask run
