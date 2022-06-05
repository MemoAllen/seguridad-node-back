"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = require("winston");
// export const logger = createLogger({
//     format: format.combine(
//         format.timestamp(),
//         format.colorize(),
//         format.printf(info=>`${info.timestamp} [${info.level}]: ${info.level}`)
// //     ),
//     transports:[
//         new transports.Console(),
//             new transports.File({
//                 filename:"logs/error.log",
//                 level:"error",
//             }),
//             new transports.File({
//                 filename:"logs/combined.log",
//                 level:"info",
//             })
//     ]
// })
exports.logger = (0, winston_1.createLogger)({
    format: winston_1.format.combine(winston_1.format.simple()),
    transports: [
        new winston_1.transports.Console({
            level: 'debug'
        }),
        new winston_1.transports.File({
            filename: "logs/info.log",
            level: "info"
        }),
        new winston_1.transports.File({
            filename: "logs/error.log",
            level: "error",
        })
    ]
});
