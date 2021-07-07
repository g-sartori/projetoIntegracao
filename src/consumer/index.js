import { mongoose } from '../setup/db'
import AWS from 'aws-sdk';
import {UpdateCEPService} from './services/UpdateCEPService'
import { DeleteQueueMessageService } from './services/DeleteQueueMessageService';

AWS.config.update({ region: 'us-east-1' });
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

const consumer = async () => {
    console.log('\nEntrou no consumer');
    const params = {
    QueueUrl: process.env.QUEUEURL
    };

    sqs.receiveMessage(params, async function (err, data) {
        if (err) {
            console.log({ error: { message: err.message } });
        } else if (data.Messages) {
            const cepId = data.Messages[0].Body;
            const receiptHandle = data.Messages[0].ReceiptHandle;
            
            console.log(cepId);
            const updateCEP = new UpdateCEPService();
            const newCEP = await updateCEP.execute(cepId);
            console.log('Voltou do update CEP \n');

            const updateQueue = new DeleteQueueMessageService();
            updateQueue.execute(receiptHandle)
            return consumer();
        } else {
            console.log('Fila Vazia');
            return consumer();
        }
    })
}

mongoose.connection.once('open', async () => {
    console.log('DB pronto, iniciar o consumer')
    await consumer();
})