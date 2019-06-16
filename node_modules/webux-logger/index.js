// ███╗   ███╗██╗██████╗ ██████╗ ██╗     ███████╗██╗    ██╗ █████╗ ██████╗ ███████╗
// ████╗ ████║██║██╔══██╗██╔══██╗██║     ██╔════╝██║    ██║██╔══██╗██╔══██╗██╔════╝
// ██╔████╔██║██║██║  ██║██║  ██║██║     █████╗  ██║ █╗ ██║███████║██████╔╝█████╗
// ██║╚██╔╝██║██║██║  ██║██║  ██║██║     ██╔══╝  ██║███╗██║██╔══██║██╔══██╗██╔══╝
// ██║ ╚═╝ ██║██║██████╔╝██████╔╝███████╗███████╗╚███╔███╔╝██║  ██║██║  ██║███████╗
// ╚═╝     ╚═╝╚═╝╚═════╝ ╚═════╝ ╚══════╝╚══════╝ ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝

/**
 * File: logger.js
 * Author: Tommy Gingras
 * Date: 2018-07-05
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, json } = format;
const { LogstashTransport } = require("winston-logstash-transport");

const filterSecret = options => {
  return format((info, opts) => {
    if (options.blacklist && info.body) {
      options.blacklist.forEach(blacklist => {
        if (info.body) {
          delete info.body[blacklist];
        }
        if (info.header) {
          delete info.header[blacklist];
        }
        if (info.query) {
          delete info.query[blacklist];
        }
      });
    }
    return info;
  });
};

module.exports = options => {
  if (!options) {
    options = {};
  }

  let logger = createLogger({
    format: combine(
      label({ label: options.application_id }),
      filterSecret(options)(),
      timestamp(),
      json()
    )
  });

  if (options.filenames) {
    Object.keys(options.filenames).forEach(level => {
      logger.add(
        new transports.File({
          level: level,
          filename: options.filenames[level]
        })
      );
    });
  }

  if (options.logstash && options.logstash.host && options.logstash.port) {
    logger.add(
      new LogstashTransport({
        host: options.logstash.host,
        port: options.logstash.port
      })
    );
  }

  if (options.forceConsole === true || process.env.NODE_ENV != "production") {
    logger.add(
      new transports.Console({
        level: "silly"
      })
    );
  }

  logger.stream = {
    write: (message, encoding) => {
      logger.info(message);
    }
  };

  return logger;
};
