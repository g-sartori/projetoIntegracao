const mongoose = require('../setup/db');
const AWS = require('aws-sdk');
const UpdateCEPService= require('./services/UpdateCEPService');
const DeleteQueueMessageService = require('./services/DeleteQueueMessageService');

AWS.config.update({ region: 'us-east-1' });
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

const consumer = async () => {
    const params = {
    QueueUrl: process.env.QUEUEURL
    };

    sqs.receiveMessage(params, async function (err, data) {
        if (err) {
            console.log({ SQSError: { message: err.message } });
        } else if (data.Messages) {
            const cepId = data.Messages[0].Body;
            const receiptHandle = data.Messages[0].ReceiptHandle;
            const updateCEP = new UpdateCEPService();
            updateCEP.execute(cepId);
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
    console.log('DB pronto, iniciando o consumer')
    await consumer();
})
