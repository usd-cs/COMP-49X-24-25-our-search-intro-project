from flask import Flask
from config import Config
from models import db, User, Post, Comment

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)

if __name__ == "__main__":
    with app.app_context():
        db.create_all()  # Create tables if they don't exist
        print("Database tables created successfully!")
    app.run(debug=True)
