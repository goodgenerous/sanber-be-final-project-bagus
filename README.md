# E-Commerce API (Final Project Sanbercode)

This Final Project E-Commerce API provides a set of endpoints to manage an e-commerce by `Bagus Dermawan Mulya`. It allows for the management of products, categories, users, and orders. This API is designed to support the creation, retrieval, updating, and deletion of resources within an e-commerce platform.

#### Deploy version with Railway App:

https://sanber-be-final-project-bagus-production.up.railway.app/

## Features

- User Management: Register new users, authenticate users, and manage user information.
- Category Management: Create, read, update, and delete product categories.
- Product Management: Create, read, update, and delete products.
- Order Management: Place orders, view order history, and update order status.
- Upload Images: Upload single and multiple images via cloudinary

## Installation

#### Prerequisites

- Node.js
- npm or yarn

#### Steps :

- Clone the repository

```bash
$ git clone https://github.com/goodgenerous/sanber-be-final-project-bagus.git
```

- Navigate to the Project Directory

```bash
$ cd sanber-be-final-project-bagus
```

- Install Dependencies

```bash
$ npm install
```

- Configure Environment Variables
  Create a `.env` file in the root directory and add the following configuration

```bash
SECRET="12345678901234567890123456789012"
DATABASE_URL= "<<fill with your mongoDB database url>>"
CLOUDINARY_API_KEY= "<<fill with your cloudinary api key>>"
CLOUDINARY_API_SECRET="<<fill with your cloudinary api secret>>"
CLOUDINARY_CLOUD_NAME="<<fill with your cloudinary cloud name>>"
EMAIL_ZOHO_MAIL="<<fill with your zoho email>>"
PASSWORD_ZOHO_MAIL="<<fill with password on your zoho email>>"
```

- Start the server

```bash
$ npm run dev
```

## API Reference

This is an API endpoints you can use for this e-commerce API

### Authentication

#### Register

```http
POST /api/auth/register
```

Please fill the req body (JSON) with this :
| Parameter | Type | Description |
| :-------- | :------- | :-------------------------------- |
| `fullName` | `string` | **Required**. Full name of user |
| `username` | `string` | **Required**. Username of user |
| `email` | `string` | **Required**. Email of user |
| `password` | `string` | **Required**. Password of user |
| `roles` | `[string]` | Roles of user (default : user) |
| `profilePicture` | `string` | **Required**. Profile Picture of user (default : default.jpg)|

#### Login

```http
POST /api/auth/login
```

Please fill the req body (JSON) with this :
| Parameter | Type | Description |
| :-------- | :------- | :-------------------------------- |
| `email` | `string` | **Required**. Email of user |
| `password` | `string` | **Required**. Password of user |

#### List User Details

```http
POST /api/auth/me
```

This endpoint requires a valid JWT token for authentication. The token should be included in the Authorization header of the request.

Headers:

`Authorization: Bearer <token>`

#### Edit User Profile

```http
POST /api/auth/profile
```

| Parameter        | Type       | Description                                                   |
| :--------------- | :--------- | :------------------------------------------------------------ |
| `fullName`       | `string`   | **Required**. Full name of user                               |
| `username`       | `string`   | **Required**. Username of user                                |
| `email`          | `string`   | **Required**. Email of user                                   |
| `password`       | `string`   | **Required**. Password of user                                |
| `roles`          | `[string]` | Roles of user (default : user)                                |
| `profilePicture` | `string`   | **Required**. Profile Picture of user (default : default.jpg) |

This endpoint requires a valid JWT token for authentication. The token should be included in the Authorization header of the request.

Headers:

`Authorization: Bearer <token>`

### Category

#### Find All Categories

```http
GET /api/categories
```

#### Find One Category with id

```http
GET /api/categories/:id
```

Please fill the param id with this :
| Parameter | Type | Description |
| :-------- | :------- | :-------------------------------- |
| `id` | `string` | **Required**. Id of the category |

#### Create Category

```http
POST /api/categories
```

Please fill the req body (JSON) with this :
| Parameter | Type | Description |
| :-------- | :------- | :-------------------------------- |
| `name` | `string` | **Required**. Name of category |

#### Update Category

```http
PUT /api/categories/:id
```

Please fill the param id with this :
| Parameter | Type | Description |
| :-------- | :------- | :-------------------------------- |
| `id` | `string` | **Required**. Id of the category |

Please fill the req body (JSON) with this to update :
| Parameter | Type | Description |
| :-------- | :------- | :-------------------------------- |
| `name` | `string` | **Required**. Update name category |

#### Delete Category

```http
DELETE /api/categories/:id
```

### Product

#### Find All Products

```http
GET /api/products
```

#### Find All Products (Pagination Query)

- Page
- Limit
- Page & Limit

```http
GET /api/products/page=
GET /api/products/limit=
GET /api/products/page=&limit=
```

#### Find One Product with id

```http
GET /api/products/:id
```

Please fill the param id with this :
| Parameter | Type | Description |
| :-------- | :------- | :-------------------------------- |
| `id` | `string` | **Required**. Id of the product |

#### Create Product

```http
POST /api/products
```

Please fill the req body (JSON) with this :
| Parameter | Type | Description |
| :-------- | :------- | :-------------------------------- |
| `name` | `string` | **Required**. Name of product |
| `description` | `string` | **Required**. Description of product |
| `images` | `[string]` | **Required**. Images of product |
| `price` | `string` | **Required**. Price of product |
| `qty` | `string` | **Required**. Quantity of product |
| `slug` | `string` | **Required**. Slug of product |
| `category` | `string` | **Required**. Id category of the product |

#### Update Product

```http
PUT /api/products/:id
```

Please fill the param id with this :
| Parameter | Type | Description |
| :-------- | :------- | :-------------------------------- |
| `id` | `string` | **Required**. Id of the product |

Please fill the req body (JSON) with this to update :
Please fill the req body (JSON) with this :
| Parameter | Type | Description |
| :-------- | :------- | :-------------------------------- |
| `name` | `string` | **Required**. Name of product |
| `description` | `string` | **Required**. Description of product |
| `images` | `[string]` | **Required**. Images of product |
| `price` | `string` | **Required**. Price of product |
| `qty` | `string` | **Required**. Quantity of product |
| `slug` | `string` | **Required**. Slug of product |
| `category` | `string` | **Required**. Id category of the product |

#### Delete Product

```http
DELETE /api/products/:id
```

### Order

This endpoint requires a valid JWT token for authentication. The token should be included in the Authorization header of the request.

Headers:

`Authorization: Bearer <token>`

#### Find All Orders

```http
GET /api/orders
```

#### Find All Orders (Pagination Query)

- Page
- Limit
- Page & Limit

```http
GET /api/orders/page=
GET /api/orders/limit=
GET /api/orders/page=&limit=
```

#### Find One Order with id

```http
GET /api/products/:id
```

Please fill the param id with this :
| Parameter | Type | Description |
| :-------- | :------- | :-------------------------------- |
| `id` | `string` | **Required**. Id of the product |

#### Create Order

```http
POST /api/products
```

Please fill the req body (JSON) with this :
| Parameter | Type | Description |
| :-------- | :------- | :-------------------------------- |
| `grandTotal` | `number` | **Required**. Grand total of orders |
| `orderItems` | `[orderItem]` | **Required**. Fill in the Order Items as in the table below |
| `createdBy` | `string` | **Required**. id of the user who added the order |
| `status` | `string` | **Required**. Status of order (enum: pending, completed, cancelled) |

Please fill the req body (JSON) inside orderItems with this :
| Parameter | Type | Description |
| :-------- | :------- | :-------------------------------- |
| `name` | `string` | **Required**. Name of the product |
| `productId` | `string` | **Required**. Id of the product |
| `price` | `number` | **Required**. Price of the product |
| `quantity` | `number` | **Required (Min:1 Max:5)**. Quantity of order |

#### Delete Order

```http
DELETE /api/products/:id
```

### Upload Image

#### Upload Single Image

Please fill the form-data with this :
| Key | Type | Value |
| :-------- | :------- | :-------------------------------- |
| `file` | `File` | **Required**. Select one images from your computer |

#### Upload Multiple Image

Please fill the form-data with this :
| Key | Type | Value |
| :-------- | :------- | :-------------------------------- |
| `file` | `File` | **Required**. Select multiple images from your computer |

## Authors

- [Bagus Dermawan Mulya](https://www.github.com/goodgenerous)

## Acknowledgements

- Express.js - Fast, unopinionated, minimalist web framework for Node.js.
- MongoDB - NoSQL database.
- jsonwebtoken - JSON Web Token implementation.

## More About Me

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://bagusdermawan.vercel.app/)

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/bagusdermawan/)
