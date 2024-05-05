/* eslint-disable no-param-reassign */
import Pino from 'pino';
import rTracer from 'cls-rtracer';

const logger = Pino({
  mixin() {
    return { requestId: rTracer.id() };
  },
});

export default logger;
