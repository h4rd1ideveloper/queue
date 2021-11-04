import {Server} from "./server";
import * as Sentry from "@sentry/node";

try {
    (async () => (new Server()).start(3000))()
} catch (e) {
    Sentry.captureException(e);
}
/**
 * /etc/init.d/redis-server stop
 * /etc/init.d/redis-server start
 * */