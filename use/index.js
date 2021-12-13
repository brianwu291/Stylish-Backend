/**
 * use db
 * > mysql -u root -p
 * <!-- type password -->
 * > mysql; CREATE DATABASE test_db
 * > mysql: USE test_db;
 * Database changed
 * > mysql: SELECT database();
 * +------------+
 * | database() |
 * +------------+
 * | test_db    |
 * +------------+
 * 1 row in set (0.00 sec)
 * 
 * can through this to know what database we current use.
 * 
 * if you delete it, then run SELECT database();
 * i will show null.
*/