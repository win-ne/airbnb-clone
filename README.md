# Airbnb clone built with Next.js, Strapi, and v0
1. Requirements:
- Node.js
- Yarn
- Turborepo
2. Add front-end environment variables
- To run this project you need to add these environment variables to **apps/front-end/.env**:
```
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```
3. Install dependencies:
```sh
yarn install
```
4. Run the project:
```sh
turbo dev
```
5. Add host and listing content.
6. Enable create, find, and findOne actions for all content and media types on Strapi admin panel.
7. Check out the clone at http://localhost:3000/.