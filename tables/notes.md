## Tables

#### Definition:

a collection of releated data held in a structured format within a database.

#### Columns
The headers of a table. The name data's name.

#### Rows
The actual data

## Databases are made up of lots of tables.

#### Data Types

In reality, there are a lot of different MySQL data types.

- Numeric Types
  - INT
    - a whole number
    - is decimal
    - with max value
    - can be negative or zero
    - INT SIGNED: max value is 2147483647
    - INT UNSIGNED: 0 to 4294967295
    - You have to explicitly modify INT to get a different range.(signed ot unsigned)
  - SMALLINT
  - TINYINT
  - MEDIUMINT
  - BIGINT
  - DECIMAL
  - NUMERIC
  - FLOAT
  - DOUBLE
  - BIT
- String Types
  - CHAR
  - VARCHAR
    - a variable-length string
    - length between 1 to 255
    - must choose maximum length, like varchar(100)
  - BINARY
  - VARBINARY
  - BLOB
  - TINYBLOB
  - MEDIUMBLOB
  - LONGBLOB
  - TEXT
  - TINYTEXT
  - MEDIUMTEXT
  - LONGTEXT
  - ENUM
- Date Types
  - DATE
  - DATETIME
  - TIMESTAMP
  - TIME
  - YEAR

#### Figure out what this type to use and what I need to. And choose one.

### Create Tables
> mysql: CREATE TABLE {table_name}
(
  column_name data_type,
  column_name data_type,
)

after created table, type:

> mysql: SHOW TABLES;

will get something like:
> +-------------------+
> <br>
> | Tables_in_test_db |
> <br>
> +-------------------+
> <br>
> | cats              |
> <br>
> +-------------------+
> <br>
> 1 row in set (0.00 sec)

or type:

> mysql: SHOW COLUMNS FROM {table_name};

will get something like:
> +-------+--------------+------+-----+---------+-------+
> <br>
> | Field | Type         | Null | Key | Default | Extra |
> <br>
> +-------+--------------+------+-----+---------+-------+
> <br>
> | name  | varchar(100) | YES  |     | NULL    |       |
> <br>
> | age   | int(11)      | YES  |     | NULL    |       |
> <br>
> +-------+--------------+------+-----+---------+-------+
> <br>
> 1 row in set (0.00 sec)

or type following will get same result: (they are not the same, but will get same result in most cases.)

> mysql: DESC {table_name}

### Delete Tables

#### Be careful with this command!

> mysql: DROP TABLES {table_name}
> <br>
> Query OK, 0 rows affected (0.03 sec)
> <br>
> SHOW TABLES;
> <br>
> Empty set (0.00 sec)

> SHOW COLUMNS FROM cats;
> <br>
> Table '{db_name}.{table_name}' doesn't exist

### Insert Tables

* adding data to tables

> mysql: INSERT INTO {table_name}
> <br>
> ({column_name} (with some options), {column_name} (with some options), ...)
> <br>
> VALUES ({value1}, {value2}, ...)

* To check data after added:
> mysql: SELECT * FROM {table_name};

* Adding multiple values:
> mysql> INSERT INTO {table_name} ({column_name}, {column_name})
> <br>
>   -> VALUES ('onion bread', 23),
> <br>
>   -> ('chocolate cake', 45),
> <br>
>   -> ('original cake', 35);
