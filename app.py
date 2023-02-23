# import flask functions
from flask import Flask, render_template, url_for
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///output-data.sqlite3'
db = SQLAlchemy(app)

db.Model.metadata.reflect(db.engine)


#setup of our database model

class mcdonalds():
    __tablename__ = 'tracts'
    __table_args__ = { 'extend_existing': True }
    LOC_CODE = db.Column(db.Text, primary_key=True) 




#page for mcdonalds tracts information
@app.route('/')
def index():


# View for map of Texas with mcdonalds locations in each Censustract
@app.route('/data')
def map():
    

# If name is main, run flask
if __name__ == '__name__':
    app.run(debug = True)





































