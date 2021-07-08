const AWSMock = require('aws-sdk-mock');
const AWS = require('aws-sdk');

describe('SendQueueMessageService: Enviar mensagens para a fila', () => {
  it('Enviar uma mensagem', async () => {
    AWSMock.setSDKInstance(AWS);
    const messageAttributes = {
      'Id': {
        DataType: 'String',
        StringValue: 'valueId123'
      }
    };
    const sendParams = {
      MessageAttributes: messageAttributes,
      MessageBody: 'valueId123',
      MessageGroupId: '1'
    };
    const result = AWSMock.mock('SQS', 'sendMessage', (params, callback) => {
      params(sendParams),
        callback(null, 'success');
    });
    AWSMock.restore('SQS', 'sendMessage');
    expect(result).toBeTruthy();
  });
});