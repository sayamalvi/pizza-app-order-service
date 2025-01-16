export interface MessaageBroker {
    connnectConsumer: () => Promise<void>;
    disconnectConsumer: () => Promise<void>;
    consumeMessage: (topics: string[], fromBeginning: boolean) => Promise<void>;
    
}
