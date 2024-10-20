# db.py
import os
from pymongo import MongoClient
from dotenv import load_dotenv
from pathlib import Path

# Load .env file
dotenv_path = Path(__file__).resolve().parent / '.env'
load_dotenv(dotenv_path=dotenv_path)

class MongoDB:
    def __init__(self):
        connection_string = os.getenv('MONGODB_URI')
        self.client = MongoClient(connection_string)
        self.databases = self.client.list_database_names()

    def get_database(self, db_name):
        if db_name in self.databases:
            return self.client[db_name]

    def list_databases(self):
        return self.databases
    
mongo_db = MongoDB()