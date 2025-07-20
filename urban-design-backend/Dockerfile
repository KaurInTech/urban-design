FROM python:3.11-slim

# Install system dependencies
RUN apt-get update && apt-get install -y git curl build-essential

# Set workdir
WORKDIR /app

# Copy files
COPY . .

# Install dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Run the app
CMD ["python", "app.py"]
