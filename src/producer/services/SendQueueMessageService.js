import AWS from 'aws-sdk';

AWS.config.update({ region: 'us-east-1' });
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

class SendQueueMessageService {
  execute(cep) {
    console.log('\nEntrou no send message');
    const {_body:{id}} = cep;
    const messageAttributes = {
      'Id': {
        DataType: 'String',
        StringValue: id
      }
    };
    const sendParams = {
      MessageAttributes: messageAttributes,
      MessageBody: id,
      QueueUrl: process.env.QUEUEURL
    };
    sqs.sendMessage(sendParams, function (err, data) {
      if (err) {
        console.log({ messageNotSent: { errorMessage: err.message } });
    } else {
        console.log({ messageSent: data  });
      }
    });
    console.log('Mensagem eviada');
  }
}

export { SendQueueMessageService };