/* Este arquivo é o principal da aplicação, onde iniciamos o app,
a a conexão a DB, configuramos a porta em o app vai ouvir e chamamos as rotas
*/
import Express from 'express'; // pacote que lida com as rotas da aplicação
import mongoose from 'mongoose'; // pacote da nossa DB que é a mongoDB
import requireDir from 'require-dir'; // pacote para buscar diretamente todos os arquivos de um diretório

import rotas from './routes';
// aqui iniamos a aplicação
const app = Express();
app.use(Express.json());

/* iniciamos a conexão com a db, as configurões
servem para fixar alguns erros e warnings*/
mongoose.connect('mongodb://localhost:27017/bitnow', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

requireDir('./app/models');

//caminho principal da aplicação
app.use('/', rotas);
app.listen(3333);
