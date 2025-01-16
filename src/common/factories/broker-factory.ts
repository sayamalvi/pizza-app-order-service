import { KafkaBroker } from '../../config/kafka';
import { MessaageBroker } from '../types/broker';
import config from 'config';

let broker: MessaageBroker | null = null;

export const createMessageBroker = (): MessaageBroker => {
    // singleton
    if (!broker) {
        broker = new KafkaBroker('order-service', [config.get('kafka.broker')]);
    }

    return broker;
};
