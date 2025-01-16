import app from './app';
import logger from './config/logger';
import config from 'config';
import { initDB } from './config/db';
import { MessaageBroker } from './common/types/broker';
import { createMessageBroker } from './common/factories/broker-factory';

const startServer = async () => {
    const PORT: number = config.get('server.port') ?? 5503;
    let broker: MessaageBroker | null = null;
    try {
        await initDB();

        broker = createMessageBroker();
        await broker.connnectConsumer();
        await broker.consumeMessage(['product'], false);

        logger.info('Database connected');
        app.listen(PORT, () => logger.info(`Listening on port ${PORT}`));
    } catch (err: unknown) {
        if (err instanceof Error) {
            logger.error(err.message);
            if (broker) {
                await broker.disconnectConsumer();
            }
            logger.on('finish', () => {
                process.exit(1);
            });
        }
    }
};

void startServer();
