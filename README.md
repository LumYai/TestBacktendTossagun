  Backend Test



  
-Docker setup

docker pull mysql


docker pull phpmyadmin



1. run sql data base

   
=> docker run --name mysql-server -v //c/mysql-data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=1234 -p 3307:3306 -d mysql


2. run phpmyadmin

=> docker run --name phpmyadmin-server -d --link mysql-server:db -p 8080:80 phpmyadmin




import post
{
	"info": {
		"_postman_id": "e8550a30-55d5-473a-9f7f-0cfca0b38283",
		"name": "BackEndTestTossagun",
		"schema": "https://schema.getpostman.com/json/collection/v2.0.0/collection.json",
		"_exporter_id": "34161618"
	},
	"item": [
		{
			"name": "register",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"name\": \"DDDD\",\r\n    \"email\": \"DDDD@asdasd.com\",\r\n    \"password\": \"1234\"\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": "http://localhost:3000/api/register"
			},
			"response": []
		},
		{
			"name": "login",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"email\": \"BBBBB@asdasd.com\",\r\n    \"password\": \"1234\"\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": "http://localhost:3000/api/login"
			},
			"response": []
		},
		{
			"name": "logout",
			"request": {
				"method": "POST",
				"header": [],
				"url": "http://localhost:3000/api/logout"
			},
			"response": []
		},
		{
			"name": "allproduct",
			"request": {
				"method": "GET",
				"header": [],
				"url": "http://localhost:3000/api/allproduct"
			},
			"response": []
		},
		{
			"name": "create_product",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"productName\": \"ว้าวซ่ารองเท้า\",\r\n    \"price\": 300\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": "http://localhost:3000/api/create_product"
			},
			"response": []
		},
		{
			"name": "update_product",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"productId\": 8,\r\n    \"productName\": \"หนังสือเลว100\",\r\n    \"price\": 200\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": "http://localhost:3000/api/update_product"
			},
			"response": []
		},
		{
			"name": "delete_product",
			"request": {
				"method": "DELETE",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"productId\": 7\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": "http://localhost:3000/api/delete_product"
			},
			"response": []
		},
		{
			"name": "delete_order",
			"request": {
				"method": "DELETE",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"productId\": 6\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": "http://localhost:3000/api/delete_order"
			},
			"response": []
		},
		{
			"name": "create_order",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"productId\": 1\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": "http://localhost:3000/api/create_order"
			},
			"response": []
		},
		{
			"name": "confirm_order",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"productId\": 5\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": "http://localhost:3000/api/confirm_order"
			},
			"response": []
		},
		{
			"name": "all_order",
			"protocolProfileBehavior": {
				"disableBodyPruning": true
			},
			"request": {
				"method": "GET",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": "http://localhost:3000/api/all_order"
			},
			"response": []
		}
	]
}[BackEndTestTossagun.postman_collection.json](https://github.com/user-attachments/files/17686754/BackEndTestTossagun.postman_collection.json)
man




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





