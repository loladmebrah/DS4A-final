# Download python from DockerHub and use it
FROM python:3.10.5

# Set the current working directory
WORKDIR /code

# Copy the dependencies file to the working directory
COPY requeriments.txt .

# Install the requirements
RUN pip install -r requirements.txt

# Copy the app to the working directory
COPY src/ .

# Run the container
CMD ["python", "./process-server.py"]