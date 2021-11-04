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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processMailQueue = void 0;
const bull_1 = __importDefault(require("bull"));
const mailer_1 = __importDefault(require("../mailer"));
const Sentry = __importStar(require("@sentry/node"));
/**FILA */
const mailQueue = new bull_1.default('mail', {
    redis: {
        host: '127.0.0.1',
        port: 6379
    }
});
/**EVENTOS */
mailQueue.on('error', ({ message, name, stack }) => {
    console.error({ message, name, stack });
    Sentry.captureException(new Error(message + "name: " + name));
});
mailQueue.on('failed', ({ /*queue, opts,*/ data, name, failedReason }) => {
    console.warn({ /*queue, opts,*/ data, name, failedReason });
    Sentry.captureException(new Error(failedReason + "name: " + name));
});
mailQueue.on('completed', ({ /*queue, opts,*/ data, name, /* failedReason,*/ id }) => {
    console.log("completed", { /*queue, opts, */ data, name, /* failedReason,*/ id });
});
mailQueue.add({ email: '', name: '' });
/**Executor*/
function processMailQueue() {
    try {
        mailQueue.process(({ name: jobName, data: { email, name } }) => __awaiter(this, void 0, void 0, function* () {
            yield mailer_1.default.sendMail({
                to: email,
                from: 'Yan Policarpo Dev <yan.policarpo@beedoo.com.br>',
                subject: `Seja bem vindo(a) ${name}`,
                text: `Olá ${name}, <${email}>`,
            });
            console.log("ON PROCESS", { jobName, email });
        }));
    }
    catch (e) {
        Sentry.captureException(e);
    }
}
exports.processMailQueue = processMailQueue;
exports.default = mailQueue;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvTWFpbFF1ZXVlL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnREFBd0I7QUFDeEIsdURBQStCO0FBQy9CLHFEQUF1QztBQUV2QyxVQUFVO0FBQ1YsTUFBTSxTQUFTLEdBQUcsSUFBSSxjQUFJLENBQWtDLE1BQU0sRUFBRTtJQUNoRSxLQUFLLEVBQUU7UUFDQyxJQUFJLEVBQUUsV0FBVztRQUNqQixJQUFJLEVBQUUsSUFBSTtLQUNiO0NBQ1IsQ0FBQyxDQUFDO0FBRUgsYUFBYTtBQUNiLFNBQVMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBQyxFQUFFLEVBQUU7SUFDN0MsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztJQUN0QyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxLQUFLLENBQUMsT0FBTyxHQUFHLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ2xFLENBQUMsQ0FBQyxDQUFBO0FBRUYsU0FBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFDLEVBQUUsRUFBRTtJQUNuRSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUMsQ0FBQyxDQUFDO0lBQzFELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEtBQUssQ0FBQyxZQUFZLEdBQUcsUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDdkUsQ0FBQyxDQUFDLENBQUE7QUFFRixTQUFTLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLElBQUksRUFBQyxrQkFBa0IsQ0FBQyxFQUFFLEVBQUMsRUFBRSxFQUFFO0lBRTlFLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLEVBQUMsaUJBQWlCLENBQUEsSUFBSSxFQUFFLElBQUksRUFBQyxrQkFBa0IsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDO0FBQ2xGLENBQUMsQ0FBQyxDQUFBO0FBRUYsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssRUFBQyxFQUFFLEVBQUMsSUFBSSxFQUFDLEVBQUUsRUFBQyxDQUFDLENBQUM7QUFFbEMsYUFBYTtBQUNiLFNBQWdCLGdCQUFnQjtJQUM1QixJQUFJO1FBQ0EsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFPLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFDLEVBQUMsRUFBRSxFQUFFO1lBQzdELE1BQU0sZ0JBQU0sQ0FBQyxRQUFRLENBQUM7Z0JBQ2xCLEVBQUUsRUFBRSxLQUFLO2dCQUNULElBQUksRUFBRSxpREFBaUQ7Z0JBQ3ZELE9BQU8sRUFBRSxxQkFBcUIsSUFBSSxFQUFFO2dCQUNwQyxJQUFJLEVBQUUsT0FBTyxJQUFJLE1BQU0sS0FBSyxHQUFHO2FBQ2xDLENBQUMsQ0FBQztZQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLEVBQUMsT0FBTyxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUE7UUFDL0MsQ0FBQyxDQUFBLENBQUMsQ0FBQTtLQUNMO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDUixNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDOUI7QUFFTCxDQUFDO0FBZkQsNENBZUM7QUFFRCxrQkFBZSxTQUFTLENBQUMifQ==