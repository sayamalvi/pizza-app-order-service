import { Consumer, EachMessagePayload, Kafka } from 'kafkajs';
import { MessaageBroker } from '../common/types/broker';
import { handleProductUpdate } from '../modules/product-cache/product-update-handler';

export class KafkaBroker implements MessaageBroker {
    private consumer: Consumer;
    constructor(clientId: string, brokers: string[]) {
        const kafka = new Kafka({ clientId, brokers });
        this.consumer = kafka.consumer({ groupId: clientId });
    }
    /**
     * connect the consumer
     */
    async connnectConsumer() {
        await this.consumer.connect();
    }
    /**
     * disconnect consumer
     */
    async disconnectConsumer() {
        await this.consumer.disconnect();
    }
    async consumeMessage(topics: string[], fromBeginning: boolean = false) {
        await this.consumer.subscribe({ topics, fromBeginning });
        await this.consumer.run({
            eachMessage: async ({
                topic,
                partition,
                message,
            }: EachMessagePayload) => {
                switch(topic){
                    case "product":
                        await handleProductUpdate(message.value!.toString())
                        return;
                    default:
                        return;
                }
            },
        });
    }
}
