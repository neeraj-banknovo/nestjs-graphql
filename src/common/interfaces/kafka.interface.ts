/*
    List all your kafka message payload types here
*/
export type KafkaMessageMeta = {
  key: string;
  partition: number;
  timestamp: string;
  messageId: string;
};
