import RabbitmqServer from '@src/util/RabbitmqServer';

export default class PublishMessage {
  static async execute(queue: string, message) {
    const server = new RabbitmqServer(process.env.RABBITMQ_URL);
    await server.start();
    await server.publishInQueue(queue, JSON.stringify(message));
  }
}
