from flask import Flask, render_template, jsonify, request
import csv

app = Flask(__name__)

CSV_FILE = 'raffle.csv'

def read_csv():
    raffle_data = []
    try:
        with open(CSV_FILE, mode='r', newline='') as file:
            reader = csv.reader(file)
            raffle_data = list(reader)
    except FileNotFoundError:
        raffle_data = [[str(i), 'Libre', ''] for i in range(1, 101)]
    return raffle_data

def write_csv(data):
    with open(CSV_FILE, mode='w', newline='') as file:
        writer = csv.writer(file)
        writer.writerows(data)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_raffle_data', methods=['GET'])
def get_raffle_data():
    data = read_csv()
    return jsonify(data)

@app.route('/save_raffle_data', methods=['POST'])
def save_raffle_data():
    data = request.json
    write_csv(data)
    return jsonify({'status': 'success'})

if __name__ == '__main__':
    app.run(debug=True)

