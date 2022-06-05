import {createLogger, format, transports} from 'winston';


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


export const logger = createLogger({
    format: format.combine(format.simple()),
    
    transports: [       
        new transports.Console({
            level: 'debug'
        }),
        new transports.File({
           filename:"logs/info.log",
           level:"info"
        }),
  
        new transports.File({
        filename:"logs/error.log",
         level:"error",
               })
    ]

})
