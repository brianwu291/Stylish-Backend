## what is database?
  <p>A collection of data</p>

## database management system
  <p> An interface that allow user to interface with data</p> 
  <p>contain method for accessing and manipulating that data</p>
  <p>why? because database is a gigantic collection of data, but it does not give us method to manipulate data.<p>

  ##### Note: when we talk about SQLite, mySQL, PostgreSQL, Oracle Database, these are database management system, not "database" itself.
  <br>

  ## The Definition Of Database
  ##### A structured set of computerized data with an accessible interface.

  ## MySQL vs SQL

  1. SQL: Structure Query Language. To talk to database.
  <br>
    example: find all users who's age are bigger than 18.
    <br>
    `SELECT * FROM Users WHERE Age >= 18`
  2. MySQL: an relation database management system.
  <br>
    writing SQL to manipulate database
  
## Shell ? Bash ? Zsh ?

<img src="https://mdimg.wxwenku.com/getimg/ccdf080c7af7e8a10e9b88444af983939b0e00c16979d692372a960432b8a8857ebb99c5a0b3904e6198518b68778b2e.jpg" alt="電腦內層" />

一一介紹。

- Shell 是是作業系統的介面(interface)，用來讓使用者透過文字、指令操作系統，也開出一些空間給使用者建立自己習慣的指令碼。
- Bash、Zsh 都是 Shell 的一種，都是屬於 Unix Shell 的一種。
- Bash 算是最常見的 Linux Shell，Mac 預設的就是它了
- Zsh 與 Bash 類似，是另一個很棒的unix shell，執行跟開始比 Bash 更快，更可自定義。


## Start Using MySQL

> mysql -u root -p
<!-- type password -->

> mysql: