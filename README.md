# restaurantCRUD

一個使用 Node.js + Express 打造的餐廳美食網站，可依照餐廳名稱與類別進行搜尋及預覽。

[Demo Website](http://localhost:3001/)

## 專案畫面

![image](https://github.com/WeiWayne1030/restaurantList/blob/main/public/index2.png)
![image](https://github.com/WeiWayne1030/restaurantList/blob/main/public/detailPage.png)
![image](https://github.com/WeiWayne1030/restaurantList/blob/main/public/editPage.png)
![image](https://github.com/WeiWayne1030/restaurantList/blob/main/public/createPage.png)

## Features - 產品功能

1. 使用者可以自行註冊登入或藉由 Facebook 快速註冊登入
2. 使用者可以點擊任一餐廳，查看更多餐廳資訊，如地址、電話與簡介
3. 使用者可以依照中文名稱、英文名稱進行搜尋
4. 使用者可以新增一家餐廳
5. 使用者可以瀏覽一家餐廳的詳細資訊
6. 使用者可以瀏覽全部所有餐廳
7. 使用者可以修改一家餐廳的資訊
8. 使用者可以刪除一家餐廳

## Environment SetUp - 環境建置

1. [Node.js](https://nodejs.org/en/)
2. [MongoDB4.0 以上]（https://www.mongodb.com/try/download/community）

## Installing - 專案安裝流程

1. 打開你的 terminal，Clone 此專案至本機電腦

```
git clone https://github.com/WeiWayne1030/restaurantList.git
```

2. 開啟終端機(Terminal)，進入存放此專案的資料夾

```
cd restaurantList
```

3. 安裝 npm 套件

```
在 Terminal 輸入 npm install 指令
```

4.安裝 express 套件

```
在 Terminal 輸入 npm install express@4.16.4 指令
```

5. 安裝 nodemon 套件

```
在 Terminal 輸入 npm install -g nodemon
```

6. 啟動種子檔案

```
使用 npm run seed 執行
```

7. 啟動伺服器，輸入執行專案

```
使用 npm run dev 執行
```

7. 當 terminal 出現以下字樣，表示伺服器與資料庫已啟動並成功連結

```
Express is listening on http://localhost:3001
mongodb connected!
```

## Contributor - 專案開發人員

> [Wayne Sun]([https://github.com/WeiWayne1030])
