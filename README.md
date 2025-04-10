openapi: 3.0.4
info:
  title: Swagger Petstore - OpenAPI 3.0
  description: |-
    This is a sample Pet Store Server based on the OpenAPI 3.0 specification.  You can find out more about
    Swagger at [https://swagger.io](https://swagger.io). In the third iteration of the pet store, we've switched to the design first approach!
    You can now help us improve the API whether it's by making changes to the definition itself or to the code.
    That way, with time, we can improve the API in general, and expose some of the new features in OAS3.

    Some useful links:
    - [The Pet Store repository](https://github.com/swagger-api/swagger-petstore)
    - [The source API definition for the Pet Store](https://github.com/swagger-api/swagger-petstore/blob/master/src/main/resources/openapi.yaml)
  termsOfService: https://swagger.io/terms/
  contact:
    email: apiteam@swagger.io
  license:
    name: Apache 2.0
    url: https://www.apache.org/licenses/LICENSE-2.0.html
  version: 1.0.12
externalDocs:
  description: Find out more about Swagger
  url: https://swagger.io
servers:
  - url: http://localhost:5000
tags:
  - name: users
    description: Các thông tin về user
  - name: Admin
    description: Các thông tin về Admin
  - name: Employee
    description: Các thông tin về employee
paths:
  /users/login:
    post:
      tags:
        - users
      summary: Đăng Nhập
      description: Đăng nhập vào hệ thống
      operationId: login
      requestBody:
        description: Thông tin đăng nhập
        content:
          application/json:
            schema:
              type: object
              properties:
                email:
                  type: string
                  example: ngocancd2017@gmail.com
                password:
                  type: string
                  example: ngocan
        required: true
      responses:
        "200":
          description: Đăng nhập thành công
          content:
            application/json:
              schema:
                type: object
                properties:
                  message:
                    type: string
                    example: Đăng nhập thành công
        "400":
          description: invalid input

  /users/signin:
    post:
      tags:
        - users
      summary: Đăng Ký
      description: Đăng ký vào hệ thống
      operationId: Signin
      requestBody:
        description: Thông tin đăng Ký
        content:
          application/json:
            schema:
              type: object
              properties:
                email:
                  type: string
                  example: ngocancd2017@gmail.com
                password:
                  type: string
                  example: ngocan
        required: true
      responses:
        "200":
          description: Đăng ký thành công
          content:
            application/json:
              schema:
                type: object
                properties:
                  status:
                    type: string
                    example: 200
                  message:
                    type: string
                    example: User add successfully!
        "422":
          description: Lỗi không thể đăng ký
          content:
            application/json:
              schema:
                type: object
                properties:
                  status:
                    type: string
                    example: 422
                  message:
                    type: string
                    example: can't find email or password !

  /users/info-users:
    post:
      tags:
        - users
      summary: xem thông tin người dùng
      description: xem thông tin trên hệ thống
      operationId: info-users
      requestBody:
        description: Thông tin người dùng
        content:
          application/json:
            schema:
              type: object
              properties:
                email:
                  type: string
                  example: ngocancd2017@gmail.com
        required: true
      responses:
        "200":
          description: Thông tin người dùng
          content:
            application/json:
              schema:
                type: object
                properties:
                  id:
                    type: integer
                    example: 9
                  first_name:
                    type: string
                    nullable: true
                    example: null
                  last_name:
                    type: string
                    nullable: true
                    example: null
                  address:
                    type: string
                    nullable: true
                    example: null
                  phone:
                    type: string
                    nullable: true
                    example: null
                  image:
                    type: string
                    nullable: true
                    example: null
                  customer_id:
                    type: integer
                    example: 9
                  email:
                    type: string
                    example: "ngocancd2020@gmail.com"
                  password:
                    type: string
                    example: "$2b$10$DFdNLgSy5NlFbGUXqIcnuelC7.3engPr0kfDQHCtM7MNUKSPmXUE6"

  /users/update-user:
    put:
      tags:
        - users
      summary: Thay đổi thông tin người dùng
      description: Thêm thông tin vào hệ thống
      operationId: update-user
      requestBody:
        description: Thông tin thay đổi
        content:
          application/json:
            schema:
              type: object
              properties:
                first_name:
                  type: string
                  nullable: true
                  example: nguyễn
                last_name:
                  type: string
                  nullable: true
                  example: Ngọc
                email:
                  type: string
                  example: "ngocancd2017@gmail.com"
                address:
                  type: string
                  nullable: true
                  example: Ân
                phone:
                  type: string
                  nullable: true
                  example: "0924456712"

        required: true
      responses:
        "200":
          description: Đăng nhập thành công
          content:
            application/json:
              schema:
                type: object
                properties:
                  response:
                    type: string
                    example:
                      "status": 200
                      "message": "User updated successfully!"

  /users/update-password:
    put:
      tags:
        - users
      summary: thay đổi thông tin mật khẩu
      description: thay đổi mật khẩu mới vào hệ thống
      operationId: update-password
      requestBody:
        description: Thông tin thay đổi
        content:
          application/json:
            schema:
              type: object
              properties:
                email:
                  type: string
                  example: ngocancd2017@gmail.com
                password:
                  type: string
                  example: ngocan1234
        required: true
      responses:
        "200":
          description: thay đổi password thành công
          content:
            application/json:
              schema:
                type: object
                properties:
                  response:
                    type: string
                    example:
                      status: 200,
                      message: "password updated successfully!"

  /users/add-pet:
    post:
      tags:
        - users
      summary: Đăng Ký thông tin thú cưng
      description: Đăng ký thú cưng vào hệ thống
      operationId: add-pet
      requestBody:
        description: Thông tin đăng Ký
        content:
          application/json:
            schema:
              type: object
              properties:
                name:
                  type: string
                  example: "Buddy"
                breed:
                  type: string
                  example: "Golden Retriever"
                age:
                  type: integer
                  example: 3
                customer_id:
                  type: integer
                  example: 1

        required: true
      responses:
        "200":
          description: Đăng ký thành công
          content:
            application/json:
              schema:
                type: object
                properties:
                  status:
                    type: string
                    example: 200
                  response:
                    type: string
                    example:
                      status: 200
                      message: "add pet successfully!"

  /users/register_form:
    post:
      tags:
        - users
      summary: Đăng Ký Lịch khám
      description: Đăng ký lịch khám vào hệ thống
      operationId: register_form
      requestBody:
        description: Thông tin đăng Ký
        content:
          application/json:
            schema:
              type: object
              properties:
                appointment_date:
                  type: string
                  format: date-time
                  example: "2025-04-02T10:30:00"
                customer_id:
                  type: integer
                  example: 1
                employee_id:
                  type: integer
                  example: 3
                hours:
                  type: number
                  example: 14:00

        required: true
      responses:
        "200":
          description: Đăng ký thành công
          content:
            application/json:
              schema:
                type: object
                properties:
                  response:
                    type: string
                    example:
                      message:
                        status: 200,
                        message: "email sent!"
                        visit:
                          status: 200,
                          message: "Appointment created successfully!"
        "400":
          description: "Bad Request"
          content:
            application/json:
              schema:
                type: object
                properties:
                  message:
                    type: string
                    enum:
                      - "Missing required fields!"
                      - "Date must be today or later!"
                      - "Hours is required for today's appointment!"
                      - "Hours must be greater than or equal to the current hour!"
                    example: "Missing required fields!"

  # admin

  /Admin/employee-add:
    post:
      tags:
        - Admin
      summary: Đăng ký nhân viên
      description: Đăng ký nhân viên vào hệ thống
      operationId: employee-add
      requestBody:
        description: Thông tin đăng ký
        content:
          application/json:
            schema:
              type: object
              properties:
                account_employee_id:
                  type: integer
                  example: 1009384
                password:
                  type: string
                  example: "1234"
        required: true
      responses:
        "200":
          description: Đăng nhập thành công
          content:
            application/json:
              schema:
                type: object
                properties:
                  response:
                    type: string
                    example:
                      status: 200,
                      message: "Emmployee add successfully!"

  /Admin/employee-info:
    get:
      tags:
        - Admin
      summary: láy danh sách nhân viên
      description: lấy thông tin nhân viên từ hệ thống
      operationId: employee-info
      requestBody:
        description: Thông tin nhân viên
        content:
          application/json:
            schema:
              type: object

        required: false
      responses:
        "200":
          description: lấy thông tin thành công
          content:
            application/json:
              schema:
                type: object
                properties:
                  response:
                    type: string
                    example:
                      status: 200
                      message:
                        - id: 2
                          first_name: "gia"
                          last_name: "bao"
                          email: "giabao@gmail.com"
                          address: "123 q9 hcm"
                          phone: "123456789"
                          role: "doctor"
                        - id: 3
                          first_name: "Hiếu"
                          last_name: "Nguyễn"
                          email: "hieu.nguyen@gmail.com"
                          address: "123 Bạch Đằng"
                          phone: "0901234567"
                          role: "doctor"
                        - id: 4
                          first_name: "Anh"
                          last_name: "Trần"
                          email: "anh.tran@gmail.com"
                          address: "456 Lê Văn Sỹ"
                          phone: "0912345678"
                          role: "doctor"

  /Admin/employee-remove:
    delete:
      tags:
        - Admin
      summary: xóa nhân viên
      description: xóa nhân viên khỏi hệ thống
      operationId: employee-remove
      requestBody:
        description: xóa thông tin nhân viên
        content:
          application/json:
            schema:
              type: object
              properties:
                account_employee_id:
                  type: integer
                  example: 1009384
        required: true
      responses:
        "200":
          description: Đăng nhập thành công
          content:
            application/json:
              schema:
                type: object
                properties:
                  response:
                    type: string
                    example:
                      reponse:
                        status: 200 ,
                        message: "Delete Succesful !"
        "404":
          description: không tìm thấy nhân viên
          content:
            application/json:
              schema:
                type: object
                properties:
                  response:
                    type: string
                    example:
                      status: 404
                      message: "Not Found employee!"

  /Admin/employee-update:
    put:
      tags:
        - Admin
      summary: thay đổi thông tin nhân viên
      description: thay đổi thông tin nhân viên vào hệ thống
      operationId: employee-update
      requestBody:
        description: Thông tin thay đổi
        content:
          application/json:
            schema:
              type: object
              properties:
                first_name:
                  type: string
                  example: "an"
                last_name:
                  type: string
                  example: "bao"
                email:
                  type: string
                  example: "baoan@gmail.com"
                address:
                  type: string
                  example: "123 q11 hcm"
                phone:
                  type: string
                  example: "093456789"
                role:
                  type: string
                  example: "doctor"
                account_employee_id:
                  type: integer
                  example: 1009101

        required: true
      responses:
        "200":
          description: Đăng nhập thành công
          content:
            application/json:
              schema:
                type: object
                properties:
                  response:
                    type: string
                    example:
                      message:
                        status: 200,
                        message: "employee updated successfully!"

  /Admin/add-service:
    post:
      tags:
        - Admin
      summary: Đăng ký dịch vụ
      description: Đăng ký dịch vụ vào hệ thống
      operationId: add-service
      requestBody:
        description: Thông tin đăng ký
        content:
          application/json:
            schema:
              type: object
              properties:
                name:
                  type: string
                  example: chụp x-rey
                price:
                  type: number
                  example: 300000
                description:
                  type: string
                  example: "khám phá bên trong phú cưng ."

        required: true
      responses:
        "200":
          description: Đăng nhập thành công
          content:
            application/json:
              schema:
                type: object
                properties:
                  response:
                    type: string
                    example:
                      status: 200,
                      "message": "Successful add service succesful"
  # employee

  /Admin/employee/visit_form:
    post:
      tags:
        - Employee
      summary: Đăng ký hóa đơn khám
      description: Đăng ký hóa đơn khám vào hệ thống
      operationId: visit_form
      requestBody:
        description: Thông tin đăng ký
        content:
          application/json:
            schema:
              type: object
              properties:
                date:
                  type: string
                  format: date-time
                  example: "2025-04-02T10:30:00"
                notes:
                  type: string
                  example: "Khách hàng yêu cầu chăm sóc thú cưng sau khi tiêm phòng."
                customer_id:
                  type: integer
                  example: 1
                pet_id:
                  type: integer
                  example: 3
                employee_id:
                  type: integer
                  example: 4
                services:
                  type: array
                  items:
                    type: string
                    example: "Tắm"
                  example:
                    - 2
                    - 3
                    - 5

        required: true
      responses:
        "200":
          description: Đăng ký thành công
          content:
            application/json:
              schema:
                type: object
                properties:
                  response:
                    type: string
                    example:
                      status: 200 ,
                      message: "Successful update Visit !"

  /Admin/employee/visit_form_update_status:
    post:
      tags:
        - Employee
      summary: thay đổi trạng thái hóa đơn khám
      description: thay đổi trạng thái hóa đơn khám vào hệ thống
      operationId: visit_form_update_status
      requestBody:
        description: Thông tin thay đổi
        content:
          application/json:
            schema:
              type: object
              properties:
                status:
                  type: string
                  example: "done"
                appointment_id:
                  type: integer
                  example: 20
        required: true
      responses:
        "200":
          description: Đăng ký thành công
          content:
            application/json:
              schema:
                type: object
                properties:
                  response:
                    type: string
                    example:
                      status: 200,
                      message: "Update Status Success !"
