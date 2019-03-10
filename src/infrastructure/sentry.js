import { init, captureException } from '@sentry/node';
import config from '../config';

init(config.sentry);

export default captureException;
