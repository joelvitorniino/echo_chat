import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post('/hello', (request: express.Request, response: express.Response) => {
    console.log(request.body);
    const bodyUser = request.body.user;

    if(bodyUser === 'Thiago') {
        response.send({ data: "Boa mano! Agora ele tira de casa" })
    } else {
        response.send({ data: "Po aí é foda!" });
    };
})

app.listen(3000, () => {
    console.log("Servidor iniciado!")
});