import winston from "winston";
const { combine, timestamp, prettyPrint } = winston.format;

export const logger = winston.createLogger({
  format: combine(timestamp(), prettyPrint()),
  transports: [new winston.transports.Console()],
});
