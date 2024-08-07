import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let messages = []; // Хранилище сообщений

app.use(express.static("public"));  // Указывает, что CSS и фото находятся в папке public
app.use(bodyParser.urlencoded({ extended: true })); // Парсер

app.set("view engine", "ejs");

// Главная страница, отображающая все сообщения
app.get("/", (req, res) => {
    res.render("home", { messages: messages });
});

// Страница для создания нового сообщения
app.get("/newPost", (req, res) => {
    res.render("newPost");
});

// Обработка добавления нового сообщения
app.post("/newPost", (req, res) => {
    const newMessage = req.body.message;
    messages.push(newMessage);
    res.redirect("/");
});

// Страница для редактирования сообщения
app.get("/editPost/:index", (req, res) => {
    const messageIndex = req.params.index;
    res.render("editPost", { index: messageIndex, message: messages[messageIndex] });
});

// Обработка редактирования сообщения
app.post("/editPost/:index", (req, res) => {
    const messageIndex = req.params.index;
    messages[messageIndex] = req.body.message;
    res.redirect("/");
});

// Обработка удаления сообщения
app.post("/deletePost/:index", (req, res) => {
    const messageIndex = req.params.index;
    messages.splice(messageIndex, 1);
    res.redirect("/");
});

app.get("/aboutMe", (req, res) => {
    res.render("aboutMe");
});

app.get("/contacts", (req, res) => {
    res.render("contacts");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
