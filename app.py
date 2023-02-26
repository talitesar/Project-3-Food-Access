# import flask functions
from flask import Flask, render_template, url_for
import sqlite3


app = Flask(__name__)


#setup of our database model


#page for mcdonalds tracts information
@app.route('/')
def index():
    conn = sqlite3.connect('database/outputdata.sqlite')
    cursor = conn.cursor()

    cursor.execute('SELECT SUM(CountMcD) FROM dataframe WHERE CountMcD > 0')
    mcD_sum = cursor.fetchone()[0] or 0
    print(mcD_sum)

    conn.close()
    return render_template('index.html', mcD_sum=mcD_sum)


# View for map of Texas with mcdonalds locations in each Censustract
@app.route('/data')
def data():
    return render_template('base.html')

# If name is main, run flask
if __name__ == '__main__':
    app.run(debug = True)





































