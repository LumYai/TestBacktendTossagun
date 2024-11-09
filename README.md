Backend Test



  
-Docker setup

docker pull mysql


docker pull phpmyadmin



1. run sql data base

   
=> docker run --name mysql-server -v //c/mysql-data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=1234 -p 3307:3306 -d mysql


2. run phpmyadmin

=> docker run --name phpmyadmin-server -d --link mysql-server:db -p 8080:80 phpmyadmin


Download postman api
[ดาวน์โหลดไฟล์ BackEndTestTossagun.postman_collection.json](https://github.com/LumYai/TestBacktendTossagun/blob/main/BackEndTestTossagun.postman_collection.json)







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

![image](https://github.com/user-attachments/assets/85ce3070-359b-4710-8402-8a0dda09808e)


![image](https://github.com/user-attachments/assets/4fe51152-7d42-4c55-bdbb-567638dafe82)


![image](https://github.com/user-attachments/assets/08b1d71f-e804-4396-858f-6d310792c2e9)


![image](https://github.com/user-attachments/assets/c47e1bc1-4d9d-40a9-9e73-8c188a134be5)





