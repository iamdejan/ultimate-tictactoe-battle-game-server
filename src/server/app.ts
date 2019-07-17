import bodyParser, { urlencoded } from "body-parser";
import express from "express";
import { registerRoute } from "../package/routes/list";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

registerRoute(app);

app.listen(port, (error) => {
    if (error) {
        return console.error(error);
    }

    return console.log("Server is listening at port ", 3000);
});
