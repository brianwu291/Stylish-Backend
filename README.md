<!-- 啟動 mysql with command line -->
cd /Library/LaunchDaemons
sudo launchctl load -F com.oracle.oss.mysql.mysqld.plist

to check the running status of mysql, open system preference, click the mysql panel to check.

to change the password, do following moves:
> cd /usr/local/mysql/bin/\ (換行繼續輸入)
> ./mysql -u root -p
typing password
> ALTER USER 'root'@'localhost' IDENTIFIED BY 'new password';
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

