FROM python:3.9.12

ENV PYTHONUNBUFFERED 1

WORKDIR /app

COPY . /app/

RUN pip install -r requirements.txt

RUN chmod +x /app/manage.py

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
