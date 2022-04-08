## Prepare:


- Install: yarn, npm, npx, node.
- Running mysql server.
- create .env file for db connection. (Can reference `.envExample`).

Once set up .env, run:
- `yarn migrate::dev` for db migration.

After running migration, you can run `yarn start`.



## Deploy Environment:

- AWS Elastic Compute.
- AWS relation database with mysql.
- Reverse proxy with nginx. (`sudo service nginx start`)
