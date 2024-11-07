from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# User Model
class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    name = db.Column(db.String(255), nullable=False)
    admin = db.Column(db.Boolean, default=False)
    password = db.Column(db.Text, nullable=False)

# Post Model
class Post(db.Model):
    post_id = db.Column(db.Integer, primary_key=True)
    contents = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)

# Comment Model
class Comment(db.Model):
    comment_id = db.Column(db.Integer, primary_key=True)
    contents = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('post.post_id'), nullable=False)
