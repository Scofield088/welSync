import mysql.connector

def create_connection():
    try:
        conn = mysql.connector.connect(
            host="wellsync-mini-project-103850.k.aivencloud.com",
            port=13292,
            user="avnadmin",
            password="AVNS_ITMVp6Gm2dthkRGhjH5", 
            database="wellsync",
        )
        print("✅ Connected to database!")
        return conn
    except mysql.connector.Error as err:
        print(f"❌ Error: {err}")
        return None

def create_table(cursor):
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS conversations (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_input TEXT NOT NULL,
            bot_response TEXT NOT NULL,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    print("✅ Table created or already exists.")

def insert_sample_data(cursor):
    query = "INSERT INTO conversations (user_input, bot_response) VALUES (%s, %s)"
    values = ("How are you?", "I'm doing great, thank you!")
    cursor.execute(query, values)
    print("✅ Sample data inserted.")

def fetch_data(cursor):
    cursor.execute("SELECT * FROM conversations")
    for row in cursor.fetchall():
        print(row)

conn = create_connection()
if conn:
    cursor = conn.cursor()
    create_table(cursor)
    insert_sample_data(cursor)
    conn.commit()
    fetch_data(cursor)
    cursor.close()
    conn.close()
    print("✅ Connection closed.")