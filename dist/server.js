"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const core_1 = require("@overnightjs/core");
const QueueController_1 = require("./controller/QueueController");
const body_parser_1 = __importDefault(require("body-parser"));
const MailQueue_1 = __importStar(require("./MailQueue"));
const bull_board_1 = require("bull-board");
const bullAdapter_1 = require("bull-board/bullAdapter");
const Sentry = __importStar(require("@sentry/node"));
const Tracing = __importStar(require("@sentry/tracing"));
class Server extends core_1.Server {
    constructor() {
        super(process.env.NODE_ENV === 'development'); // setting showLogs to true
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.setupControllers();
        this.setupSentry();
        this.setupQueues();
    }
    setupSentry() {
        Sentry.init({
            dsn: "https://5ffda74880f34d1cbe2b4ffda93d9190@o1001802.ingest.sentry.io/6049871",
            integrations: [
                // enable HTTP calls tracing
                new Sentry.Integrations.Http({ tracing: true }),
                // enable Express.js middleware tracing
                new Tracing.Integrations.Express({ app: this.app }),
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
        this.app.use('/board', (0, bull_board_1.createBullBoard)([new bullAdapter_1.BullAdapter(MailQueue_1.default)]).router);
        (0, MailQueue_1.processMailQueue)();
    }
    start(port) {
        this.app.listen(port, () => {
            console.log(`Server listening on port: ${port}`);
        });
    }
    setupControllers() {
        const userController = new QueueController_1.QueueController();
        super.addControllers([userController]);
    }
}
exports.Server = Server;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3NlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNENBQTREO0FBQzVELGtFQUE2RDtBQUM3RCw4REFBcUM7QUFDckMseURBQXdEO0FBQ3hELDJDQUEyQztBQUMzQyx3REFBbUQ7QUFDbkQscURBQXVDO0FBQ3ZDLHlEQUEyQztBQUUzQyxNQUFhLE1BQU8sU0FBUSxhQUFlO0lBRXZDO1FBQ0ksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLGFBQWEsQ0FBQyxDQUFDLENBQUMsMkJBQTJCO1FBQzFFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLHFCQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxxQkFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQsV0FBVztRQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDUixHQUFHLEVBQUUsNEVBQTRFO1lBQ2pGLFlBQVksRUFBRTtnQkFDViw0QkFBNEI7Z0JBQzVCLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFDLENBQUM7Z0JBQzdDLHVDQUF1QztnQkFDdkMsSUFBSSxPQUFPLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxFQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFDLENBQUM7YUFDcEQ7WUFDRCw4Q0FBOEM7WUFDOUMsOENBQThDO1lBQzlDLGtEQUFrRDtZQUNsRCxnQkFBZ0IsRUFBRSxHQUFHO1NBQ3hCLENBQUMsQ0FBQztRQUNILG1GQUFtRjtRQUNuRixrRUFBa0U7UUFDbEUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO1FBQy9DLDREQUE0RDtRQUM1RCxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7UUFDL0Msd0ZBQXdGO1FBQ3hGLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxJQUFBLDRCQUFlLEVBQUMsQ0FBQyxJQUFJLHlCQUFXLENBQUMsbUJBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3RSxJQUFBLDRCQUFnQixHQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVNLEtBQUssQ0FBQyxJQUFZO1FBRXJCLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7WUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNyRCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFTyxnQkFBZ0I7UUFDcEIsTUFBTSxjQUFjLEdBQUcsSUFBSSxpQ0FBZSxFQUFFLENBQUM7UUFDN0MsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7SUFDM0MsQ0FBQztDQUNKO0FBbERELHdCQWtEQyJ9