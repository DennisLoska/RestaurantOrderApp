@echo off
REM Prepare Flask backend
set current_directory=%cd%

REM start virtualenv
call %current_directory%\flask-react\Scripts\activate.bat

REM prepare Flask app
set FLASK_DEBUG=1
set FLASK_APP=server.py

echo Starting Flask server.
REM run Flask app
REM call flask run
call python %current_directory%\server.py
