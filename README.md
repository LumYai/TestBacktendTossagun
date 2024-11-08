  Backend Test

  
-Docker setup

docker pull mysql
docker pull phpmyadmin

1. run sql data base 
=> docker run --name mysql-server -v //c/mysql-data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=1234 -p 3307:3306 -d mysql
2. run phpmyadmin
=> docker run --name phpmyadmin-server -d --link mysql-server:db -p 8080:80 phpmyadmin

nodejs
1. สร้าง node_modules ที่จำเป็นต้องใช้งาน
=> npm i
2. run server
=> node index.js

PHPMYADMIN
=> http://localhost:8080/
=> username: root
=> password: 1234

Docker Hub
https://hub.docker.com/r/nattaponnoiwanna/mysql-server-backend
https://hub.docker.com/r/nattaponnoiwanna/phpmyadmin-server-backend
