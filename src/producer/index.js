import './setup/db'
import { server } from './setup/server'
import { CreateCEPService } from './services/CreateCEPService';
import { SendQueueMessageService } from './services/SendQueueMessageService';

server.post('/cep', async (req, res) => {
  try {
    console.log('\n \n \nEntrou no post de /cep');
    const { cep } = req.body;
    const createCEPService = new CreateCEPService();
    const newCEP = await createCEPService.execute({ req, res, cep });
    console.log('Saiu do CreateCEPService\n');
    if (newCEP.statusCode===201){
      const sendMessageService = new SendQueueMessageService();
      sendMessageService.execute(newCEP);
      console.log('Saiu do SendQueueMessageService\n');
    }
    console.log('Terminou o POST de /cep\n\n\n\n')
  } catch (error) {
    console.log('Deu erro no post de /cep\n', error);
    res.send(500, error)
  }
})


server.start(() => console.log('Started server on %s:%s', process.env.SERVER_HOST, process.env.SERVER_PORT))

