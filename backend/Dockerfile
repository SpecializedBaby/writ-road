FROM python:3.11-alpine3.21
LABEL maintainer="specialized8393@gmail.com"

WORKDIR /app

ENV PYTHONUNBUFFERED 1

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .
RUN mkdir -p /files/media

RUN adduser \
    --disabled-password \
    --no-create-home \
    my_user

RUN chown -R my_user /files/media
RUN chmod -R 755 /files/media

USER my_user
