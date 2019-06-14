import json
import pymongo
import bcrypt
from flask import Flask, request, Response, jsonify, render_template, session

client = pymongo.MongoClient(
    "mongodb://admin:CXuK1qvc7C6V8Av4XPyI@codefree-shard-00-00-2k3ax.mongodb.net:27017,codefree-shard-00-01-2k3ax.mongodb.net:27017,codefree-shard-00-02-2k3ax.mongodb.net:27017/test?ssl=true&replicaSet=codefree-shard-0&authSource=admin&retryWrites=true")
db = client["restaurant"]
customers = db.customers
orders = db.orders
items = db.items

# test connection: creates new user - works!
# customers.insert_one(
#    {'user': 'John Doe', 'email': 'jd@email.com', 'password': 'htw'})

app = Flask(__name__, static_url_path='', static_folder='./app/build',
            template_folder='./app/build')

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


@app.route('api/register', methods=['POST'])
def register():
    if request.method == 'POST':
        customers = db.customers
        existing_customer = customers.find_one(
            {'name': request.form['username']})
        if existing_customer is None:
            hashpass = bcrypt.hashpw(
                request.form['pass'].encode('utf-8'), bcrypt.gensalt())
            customers.insert(
                {'name': request.form['username'], 'email': request.form['email'], 'password': hashpass})
            session['username'] = request.form['username']
            return render_template('index.html')
        else:
            return 'That username already exists!'

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


if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=True
    )
