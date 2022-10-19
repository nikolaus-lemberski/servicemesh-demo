FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt main.py /app/
RUN python3 -m pip install --no-cache-dir --upgrade -r requirements.txt

EXPOSE 8080

CMD ["python3", "main.py"]