import eventlet
import json
import bcrypt
import pymongo
from bson import json_util
from flask_socketio import SocketIO, emit, join_room, leave_room
from flask import Flask, request, Response, jsonify, render_template, session

client = pymongo.MongoClient(
    "mongodb://admin:CXuK1qvc7C6V8Av4XPyI@codefree-shard-00-00-2k3ax.mongodb.net:27017,codefree-shard-00-01-2k3ax.mongodb.net:27017,codefree-shard-00-02-2k3ax.mongodb.net:27017/test?ssl=true&replicaSet=codefree-shard-0&authSource=admin&retryWrites=true")
db = client["restaurant"]

eventlet.monkey_patch()

app = Flask(__name__, static_url_path='', static_folder='./app/build',
            template_folder='./app/build')
app.secret_key = 'session_secret'
socketio = SocketIO(app)
table_order = dict()


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
            )
        else:
            return Response(
                json.dumps({'logged_in': False,
                            'error': 'Same username already exists!'}),
                mimetype='application/json',
            )


@app.route('/api/login', methods=['POST'])
def login():
    users = db.customers
    login_user = users.find_one(
        {'username': request.form['username']})
    if login_user:
        hashed_pw = bcrypt.hashpw(request.form['password'].encode(
            'utf-8'), bytes(login_user['password']))
        if hashed_pw == login_user['password']:
            session['username'] = request.form['username']
            session['logged_in'] = True
            return Response(
                json.dumps({'logged_in': True,
                            'user': session['username']}),
                mimetype='application/json',
            )
    return Response(
        json.dumps({'logged_in': False,
                    'error': 'Wrong username or password!'}),
        mimetype='application/json',
    )


@app.route('/api/authStatus', methods=['GET'])
def getStatus():
    users = db.customers
    username = session.get('username')
    if username:
        existing_user = users.find_one(
            {'username': username})
        if existing_user:
            return Response(
                json.dumps({'logged_in': True,
                            'user': username}),
                mimetype='application/json',
            )
        else:
            return Response(
                json.dumps(
                    {'logged_in': False, 'error': 'Session exists, but user does not exist anymore.'}),
                mimetype='application/json',
            )
    else:
        return Response(
            json.dumps({'logged_in': False,
                        'error': 'Wrong username or password!'}),
            mimetype='application/json',
        )


@app.route('/api/logout')
def logout():
    # remove the username from the session
    session.clear()
    return render_template('index.html')


@app.route('/api/orders', methods=['GET'])
def getOrders():
    orders = db.orders
    user_orders = orders.find({'username': session['username']})
    if user_orders:
        return Response(
            json.dumps({'orders': user_orders}),
            mimetype='application/json',
        )
    else:
        return Response(
            json.dumps({'error': 'No orders found!'}),
            mimetype='application/json',
        )


@app.route('/api/items', methods=['GET'])
def getItems():
    items = db.items
    restaurant_items = list(items.find())
    if restaurant_items:
        return Response(
            json.dumps(restaurant_items, default=json_util.default),
            mimetype='application/json',
        )
    else:
        return Response(
            json.dumps({'error': 'No items found!'}),
            mimetype='application/json',
        )


@app.route('/api/categories', methods=['GET'])
def getCategories():
    categories = db.categories
    all_categories = list(categories.find())
    if all_categories:
        return Response(
            json.dumps(all_categories, default=json_util.default),
            mimetype='application/json',
        )
    else:
        return Response(
            json.dumps({'error': 'No categories found!'}),
            mimetype='application/json',
        )


@app.route('/api/tables', methods=['GET'])
def getTables():
    tables = db.tables
    all_tables = list(tables.find())
    if all_tables:
        return Response(
            json.dumps(all_tables, default=json_util.default),
            mimetype='application/json',
        )
    else:
        return Response(
            json.dumps({'error': 'No tables found!'}),
            mimetype='application/json',
        )


@app.route('/api/tableorder', methods=['GET', 'POST'])
def getTableOrder():
    data = json.loads(request.data)
    room = data['room']
    if table_order:
        if room in table_order:
            return Response(
                json.dumps(table_order[room], default=json_util.default),
                mimetype='application/json',
            )
        else:
            table_order[room] = list()
            return Response(
                json.dumps({'error': 'No items selected!'}),
                mimetype='application/json',
            )
    else:
        return Response(
            json.dumps({'error': 'No items selected!'}),
            mimetype='application/json',
        )


@app.route('/api/order', methods=['GET', 'POST'])
def sendOrder():
    data = json.loads(request.data)
    room = data['room']
    orders = db.orders
    if table_order:
        if room in table_order:
            for order in table_order[room]:
                orders.insert_one(
                    {"username": order['user'], "items": order['items'], "table": room})

        return Response(
            json.dumps({"msg": 'Bestellung erfolgreich aufgegeben!'}),
            mimetype='application/json',
        )
    return Response(
        json.dumps({'error': 'Keine Bestellung gefunden!'}),
        mimetype='application/json',
    )


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


@socketio.on('join')
def on_join(data):
    info = json.loads(data)
    username = info['username']
    room = info['room']
    join_room(room, request.sid, '/')
    message = {"msg": username + ' has entered the room ' + room,
               "room": room}
    emit('in-room', json.dumps(message), room=room)


@socketio.on('leave')
def on_leave(data):
    info = json.loads(data)
    username = info['username']
    room = info['room']
    if(room == ''):
        room = request.sid
    message = {"msg": username + ' has left the room ' + room,
               "room": room}
    emit('out-room', json.dumps(message), room=room)
    leave_room(room, request.sid, '/')


@socketio.on('get-tableorder')
def getLiveTableOrder(data, methods=['GET', 'POST']):
    data = json.loads(data)
    room = data['room']
    if table_order:
        if room in table_order:
            emit('get-tableorder',
                 json.dumps({"order": table_order[room], "ready": data['ready']}), room=room)
    else:
        message = {"msg": 'No items selected!'}
        emit('get-tableorder', json.dumps(message), room=room)


@socketio.on('item-selected')
def broadcastSelection(data, methods=['GET', 'POST']):
    if data is not None:
        info = json.loads(data)
        selection = info['order']
        print(info['room'])
        room = info['room']
        if room not in table_order:
            print('created new room ' + room)
            table_order[room] = list()
        else:
            for order in table_order[room]:
                if order['user'] == selection['user']:
                    table_order[room].remove(order)
                    break
        table_order[room].append(selection)
        response = json.dumps(table_order[room], default=json_util.default)
        emit('order-broadcast', response, room=room)


if __name__ == '__main__':
    socketio.run(app, host='127.0.0.1',
                 port=5000, debug=True)
