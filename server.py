import json
import pymongo
from bson import json_util
import bcrypt
from flask import Flask, request, Response, jsonify, render_template, session
from flask_socketio import SocketIO, emit

client = pymongo.MongoClient(
    "mongodb://admin:CXuK1qvc7C6V8Av4XPyI@codefree-shard-00-00-2k3ax.mongodb.net:27017,codefree-shard-00-01-2k3ax.mongodb.net:27017,codefree-shard-00-02-2k3ax.mongodb.net:27017/test?ssl=true&replicaSet=codefree-shard-0&authSource=admin&retryWrites=true")
db = client["restaurant"]
customers = db.customers
orders = db.orders
items = db.items

app = Flask(__name__, static_url_path='', static_folder='./app/build',
            template_folder='./app/build')
app.secret_key = 'session_secret'
socketio = SocketIO(app)

notes = {
    0: 'Frontend is using React',
    1: 'Backend is using Flask',
    2: 'Have fun!'
}

# API endpoints
@app.route('/api/v1/notes', methods=['GET', 'POST'])
def serve():
    if request.method == 'POST' and request.is_json:
        new_note = request.get_json()['note']
        new_note_id = len(notes)
        notes[new_note_id] = new_note

    return Response(
        json.dumps(notes),
        mimetype='application/json',
        headers={
            'Cache-Control': 'no-cache',
            'Access-Control-Allow-Origin': '*'
        }
    )


@app.route('/api/register', methods=['POST'])
def register():
    if request.method == 'POST':
        customers = db.customers
        existing_customer = customers.find_one(
            {'username': request.form['username']})
        if existing_customer is None:
            hashed_pw = bcrypt.hashpw(
                request.form['password'].encode('utf-8'), bcrypt.gensalt())
            customers.insert(
                {'first_name': request.form['firstname'],
                 'last_name': request.form['lastname'],
                 'username': request.form['username'],
                 'email': request.form['email'],
                 'password': hashed_pw})
            session['username'] = request.form['username']
            return Response(
                json.dumps({'logged_in': True,
                            'user': session['username']}),
                mimetype='application/json',
                headers={
                    'Cache-Control': 'no-cache',
                    'Access-Control-Allow-Origin': '*'
                })
        else:
            return Response(
                json.dumps({'logged_in': False,
                            'error': 'Same username already exists!'}),
                mimetype='application/json',
                headers={
                    'Cache-Control': 'no-cache',
                    'Access-Control-Allow-Origin': '*'
                })


@app.route('/api/login', methods=['POST'])
def login():
    users = db.customers
    login_user = users.find_one(
        {'username': request.form['username']})
    if login_user:
        hashed_pw = bcrypt.hashpw(request.form['password'].encode(
            'utf-8'), bytes(login_user['password']))
        if hashed_pw == login_user['password'].encode('utf-8'):
            session['username'] = request.form['username']
            session['logged_in'] = True
            return Response(
                json.dumps({'logged_in': True,
                            'user': session['username']}),
                mimetype='application/json',
                headers={
                    'Cache-Control': 'no-cache',
                    'Access-Control-Allow-Origin': '*'
                })
    return Response(
        json.dumps({'logged_in': False,
                    'error': 'Wrong username or password!'}),
        mimetype='application/json',
        headers={
            'Cache-Control': 'no-cache',
            'Access-Control-Allow-Origin': '*'
        })


@app.route('/api/logout')
def logout():
    # remove the username from the session
    session.pop('username', None)
    return render_template('index.html')


@app.route('/api/orders', methods=['GET'])
def getOrders():
    orders = db.orders
    user_orders = orders.find({'username': session['username']})
    if user_orders:
        return Response(
            json.dumps({'orders': user_orders}),
            mimetype='application/json',
            headers={
                'Cache-Control': 'no-cache',
                'Access-Control-Allow-Origin': '*'
            })
    else:
        return Response(
            json.dumps({'error': 'No orders found!'}),
            mimetype='application/json',
            headers={
                'Cache-Control': 'no-cache',
                'Access-Control-Allow-Origin': '*'
            })


@app.route('/api/items', methods=['GET'])
def getItems():
    items = db.items
    restaurant_items = list(items.find())
    if restaurant_items:
        return Response(
            json.dumps(restaurant_items, default=json_util.default),
            mimetype='application/json',
            headers={
                'Cache-Control': 'no-cache',
                'Access-Control-Allow-Origin': '*'
            })
    else:
        return Response(
            json.dumps({'error': 'No items found!'}),
            mimetype='application/json',
            headers={
                'Cache-Control': 'no-cache',
                'Access-Control-Allow-Origin': '*'
            })


# Routing - we do not use the Flask server for routing in our application
# We use React Router to route through the app. So when a user tries to
# access the route e.g. /test instead of routing to a specific file/template
# # on the server we just return the index.html
@app.route('/', defaults={'path': ''}, methods=['GET'])
def catch_all(path):  # index
    return render_template('index.html')

# 404 not found -> React Router
@app.errorhandler(404)
def not_found(error):
    return render_template('index.html')


@socketio.on('connect')
def test_connect():
    print('Client connected')
    emit('connected', request.sid)


@socketio.on('disconnect')
def test_disconnect():
    print('Client disconnected')


# https://stackoverflow.com/questions/53522052/flask-app-valueerror-signal-only-works-in-main-thread
if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0',
                 port=5000, debug=True)
