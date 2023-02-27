import winston from "winston";

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: "DD/MM/YYY HH:mm:ss" }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
      filename: "logs/app.log",
      level: "info",
    }),
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),
  ],
});

export { logger };
