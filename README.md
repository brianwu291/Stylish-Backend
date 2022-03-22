## Prepare:


- Install: yarn, npm, npx, node.
- Running mysql server.
- create .env file for db connection. (Can reference `.envExample`).

Once set up .env, run: `yarn migrate::dev` for db migration.

After running migration, you can run `yarn start`.



## Deploy Environment:

- AWS Elastic Compute.
- AWS relation database with mysql 5.7.37.
- Reverse proxy with nginx. (`sudo service nginx start`)

## Learning Notes

<!-- 筆記 -->

<!-- 啟動 mysql with command line -->
cd /Library/LaunchDaemons
sudo launchctl load -F com.oracle.oss.mysql.mysqld.plist

to check the running status of mysql, open system preference, click the mysql panel to check.

to change the password, do following moves:

stop mysql server running.(brew services stop mysql@...)

> sudo mysqld_safe --skip-grant-tables;

(so that no need to type password)

> mysql -u root

> UPDATE mysql.user SET Password=PASSWORD('your-password') WHERE User='root';(for MySQL older than MySQL 5.7)

> USE mysql;
> UPDATE mysql.user SET authentication_string=PASSWORD("your-password") WHERE User='root'; (For MySQL 5.7+)
> FLUSH PRIVILEGES;
> \q
> (Refresh and quit)



make sure type ; on every line of command when in mysql command.

create database:
"CREATE DATABASE {databaseName} CHARACTER SET 'utf8' COLLATE 'utf8_general_ci'";
create table:
'CREATE TABLE {tableName} (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci'
edit table:
- add column -
'ALTER TABLE {tableName} ADD COLUMN {newColumnName} VARCHAR(255) or INT or some else types)'
- delete column -
'ALTER TABLE {tableName} DROP COLUMN {columnName}'
- change column name -
'ALTER TABLE {tableName} CHANGE COLUMN {oldColumnName} {newColumnName} VARCHAR(255) or INT or some else types)'

- insert values to table -
"INSERT INTO {tableName} (some key) VALUES (some value correspond to key)"
ex: "INSERT INTO customers (name, email) VALUES ('Brian Wu', 'brianwu291@gmail.com')"
- insert many value to table -
"INSERT INTO {tableName} (some key) VALUES ?"
起一個 value array, 把想要放進去的值一一放入，最後再放入 connect.query(sqlQuery, [value], doSQLThingCallback)。
ex:
const newCustomerList = []
for (let i = 0; i < 10; i += 1) {
  newCustomerList.push([`Tim-no.${i}`, `tim65${i}@gmail.com`])
}
const sqlQuery = "INSERT INTO customers (name, email) VALUES ?"
connect.query(sqlQuery, [value], doSQLThingCallback)

- select -
"SELECT * FROM {tableName}"

