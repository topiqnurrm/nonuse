from flask import Flask, render_template, request, redirect, url_for, flash, session
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # For flash messages

# Function to create connection to MySQL database
def create_connection():
    try:
        connection = mysql.connector.connect(
            host='localhost',
            user='root',  # Ganti jika user MySQL Anda berbeda
            password='',  # Ganti jika Anda memiliki password
            database='script11'  # Pastikan nama database benar
        )
        return connection
    except Error as e:
        print(f"Error: {e}")
        return None

# Route for login page
@app.route('/')
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        conn = create_connection()
        if conn:
            cursor = conn.cursor()
            query = "SELECT * FROM logreg WHERE username = %s AND password = %s"
            cursor.execute(query, (username, password))
            user = cursor.fetchone()
            cursor.close()  # Close cursor after use
            conn.close()  # Close connection after use
            
            if user:
                session['logged_in'] = True
                session['username'] = username
                flash(f"Welcome {username}!", 'success')
                return redirect(url_for('home'))
            else:
                flash('Invalid username or password!', 'danger')
        else:
            flash('Database connection failed!', 'danger')
    
    return render_template('login.html')

# Route for register page
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        conn = create_connection()
        if conn:
            cursor = conn.cursor()
            query = "INSERT INTO logreg (username, password) VALUES (%s, %s)"
            cursor.execute(query, (username, password))
            conn.commit()
            cursor.close()  # Close cursor after use
            conn.close()  # Close connection after use
            
            flash('Registration successful! You can now log in.', 'success')
            return redirect(url_for('login'))
        else:
            flash('Database connection failed!', 'danger')
    
    return render_template('register.html')

# Route for the home page after login, now displaying a list of users
@app.route('/home')
def home():
    if 'logged_in' in session:
        conn = create_connection()
        if conn is not None:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM users")
            users = cursor.fetchall()  # Fetch all rows from the "users" table
            cursor.close()
            conn.close()
            return render_template('home.html', username=session['username'], users=users)
        else:
            flash('Database connection failed.', 'danger')
            return redirect(url_for('login'))
    else:
        flash('Please log in first.', 'danger')
        return redirect(url_for('login'))

# Route for input data
@app.route('/input', methods=['POST'])
def input_data():
    if 'logged_in' in session:
        name = request.form['name']
        email = request.form['email']
        
        conn = create_connection()
        if conn:
            cursor = conn.cursor()
            query = "INSERT INTO users (name, email) VALUES (%s, %s)"
            cursor.execute(query, (name, email))
            conn.commit()
            cursor.close()
            conn.close()

            # Flash message for successful insertion
            flash('User has been added successfully.', 'success')
            
            # Redirect to home page after adding data
            return redirect(url_for('home'))
        else:
            flash('Database connection failed!', 'danger')
            return redirect(url_for('home'))
    else:
        flash('Please log in first.', 'danger')
        return redirect(url_for('login'))

# Route for updating user
@app.route('/update/<int:user_id>', methods=['GET'])
def update_user(user_id):
    if 'logged_in' in session:
        conn = create_connection()
        if conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM users WHERE id=%s", (user_id,))
            user = cursor.fetchone()
            cursor.close()
            conn.close()
            if user:
                return render_template('update.html', user=user)
            else:
                flash('User not found!', 'danger')
                return redirect(url_for('home'))
        else:
            flash('Database connection failed!', 'danger')
            return redirect(url_for('home'))
    else:
        flash('Please log in first.', 'danger')
        return redirect(url_for('login'))

# Route for processing the update data
@app.route('/update', methods=['POST'])
def update_data():
    if 'logged_in' in session:
        user_id = request.form['id']
        name = request.form['name']
        email = request.form['email']

        conn = create_connection()
        if conn:
            cursor = conn.cursor()
            query = "UPDATE users SET name=%s, email=%s WHERE id=%s"
            cursor.execute(query, (name, email, user_id))
            conn.commit()
            cursor.close()
            conn.close()

            flash('User has been updated successfully.', 'success')
            return redirect(url_for('home'))
        else:
            flash('Database connection failed!', 'danger')
            return redirect(url_for('home'))
    else:
        flash('Please log in first.', 'danger')
        return redirect(url_for('login'))

# Route for delete data
@app.route('/delete', methods=['POST'])
def delete_data():
    if 'logged_in' in session:
        user_id = request.form['id']
        
        conn = create_connection()
        if conn:
            cursor = conn.cursor()
            query = "DELETE FROM users WHERE id=%s"
            cursor.execute(query, (user_id,))
            conn.commit()
            cursor.close()
            conn.close()

            # Flash message for successful deletion
            flash('User has been deleted successfully.', 'success')
            
            # Redirect to home page after deleting data
            return redirect(url_for('home'))
        else:
            flash('Database connection failed!', 'danger')
            return redirect(url_for('home'))
    else:
        flash('Please log in first.', 'danger')
        return redirect(url_for('login'))

# Route for logout
@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    session.pop('username', None)
    flash('You have been logged out.', 'success')
    return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(debug=True)
