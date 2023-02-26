# import flask functions
from flask import Flask, render_template, url_for
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)


#setup of our database model


#page for mcdonalds tracts information
@app.route('/')
def index():
    return render_template('index.html')


# View for map of Texas with mcdonalds locations in each Censustract
@app.route('/data')
def data():
    return render_template('base.html')

# If name is main, run flask
if __name__ == '__main__':
    app.run(debug = True)





































