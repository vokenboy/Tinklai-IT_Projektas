FROM mysql:5.7
ENV MYSQL_DATABASE=database
ENV MYSQL_ROOT_PASSWORD=superstud
ENV MYSQL_USER=stud
ENV MYSQL_PASSWORD=stud
COPY mysql-init/ /docker-entrypoint-initdb.d/
