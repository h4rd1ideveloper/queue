import {Server as OverNightServer} from "@overnightjs/core";
import {QueueController} from "./controller/QueueController";
import bodyParser from "body-parser";
import mailQueue, {processMailQueue} from "./MailQueue";
import {createBullBoard} from "bull-board";
import {BullAdapter} from "bull-board/bullAdapter";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";

export class Server extends OverNightServer {

    constructor() {
        super(process.env.NODE_ENV === 'development'); // setting showLogs to true
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.setupControllers();
        this.setupSentry();
        this.setupQueues();
    }

    setupSentry() {
        Sentry.init({
            dsn: "https://5ffda74880f34d1cbe2b4ffda93d9190@o1001802.ingest.sentry.io/6049871",
            integrations: [
                // enable HTTP calls tracing
                new Sentry.Integrations.Http({tracing: true}),
                // enable Express.js middleware tracing
                new Tracing.Integrations.Express({app: this.app}),
            ],
            // Set tracesSampleRate to 1.0 to capture 100%
            // of transactions for performance monitoring.
            // We recommend adjusting this value in production
            tracesSampleRate: 1.0,
        });
        // RequestHandler creates a separate execution context using domains, so that every
        // transaction/span/breadcrumb is attached to its own Hub instance
        this.app.use(Sentry.Handlers.requestHandler());
        // TracingHandler creates a trace for every incoming request
        this.app.use(Sentry.Handlers.tracingHandler());
        // The error handler must be before any other error middleware and after all controllers
        this.app.use(Sentry.Handlers.errorHandler());
    }

    setupQueues() {
        this.app.use('/board', createBullBoard([new BullAdapter(mailQueue)]).router);
        processMailQueue();
    }

    public start(port: number): void {

        this.app.listen(port, () => {
            console.log(`Server listening on port: ${port}`);
        })
    }

    private setupControllers(): void {
        const userController = new QueueController();
        super.addControllers([userController]);
    }
}