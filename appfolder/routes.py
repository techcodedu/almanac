from appfolder import app,mysql
from flask import render_template, request, jsonify
 



@app.route('/')
def index():
    # Fetch initial data to display
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM countries ORDER BY name LIMIT 10")  
    countries = cur.fetchall()
    cur.close()
    return render_template('index.html', countries=countries)

@app.route('/fetch-countries', methods=['POST'])
def fetch_countries():
    # Determine the index of the country to fetch
    data = request.json
    index = int(data['index'])

    # Fetch the single country based on the index
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM countries ORDER BY name LIMIT 1 OFFSET %s", (index,))
    country = cur.fetchone()
    cur.close()

    if country:
        country_data = {
            'id': country[0],
            'name': country[1],
            'capital_city': country[2],
            'flag_image_path': country[3]
        }
        return jsonify(country_data)
    else:
        return jsonify({'error': 'No more countries available'}), 404


@app.route('/search', methods=['GET'])
def search():
    search_term = request.args.get('term', '')  # Get the search term from query string
    cur = mysql.connection.cursor()
    like_string = f"{search_term}%"
    cur.execute("SELECT * FROM countries WHERE name LIKE %s ORDER BY name", (like_string,))
    countries = cur.fetchall()
    cur.close()

    countries_data = [
        {'id': country[0], 'name': country[1], 'capital_city': country[2], 'flag_image_path': country[3]}
        for country in countries
    ]
    return jsonify(countries_data)

