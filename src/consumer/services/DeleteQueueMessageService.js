const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' });
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

class DeleteQueueMessageService {
  execute(receiptHandle) {
    const deleteParams = {
      QueueUrl: process.env.QUEUEURL,
      ReceiptHandle: receiptHandle
    };

    sqs.deleteMessage(deleteParams, function (err) {
      if (err) {
        console.log({ messageNotDeleted: { errorMessage: err.message } });
      } else {
        console.log('Mensagem Deletada da fila:%s', process.env.QUEUEURL);
      }
    })
  }
}

module.exports = DeleteQueueMessageService;