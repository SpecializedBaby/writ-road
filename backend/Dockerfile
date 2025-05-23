FROM python:3.11

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

COPY . /app
RUN pip install --upgrade pip
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

# Create media folder
RUN mkdir -p /app/media

COPY wait_for_db.sh /wait_for_db.sh
ENTRYPOINT ["/wait_for_db.sh"]
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]