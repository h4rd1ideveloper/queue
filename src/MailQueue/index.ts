import Bull from "bull";
import mailer from "../mailer";
import * as Sentry from "@sentry/node";

/**FILA */
const mailQueue = new Bull<{ email: string, name: string }>('mail', {
    redis: {
            host: '127.0.0.1',
            port: 6379
        }
});

/**EVENTOS */
mailQueue.on('error', ({message, name, stack}) => {
    console.error({message, name, stack});
    Sentry.captureException(new Error(message + "name: " + name));
})

mailQueue.on('failed', ({/*queue, opts,*/ data, name, failedReason}) => {
    console.warn({/*queue, opts,*/ data, name, failedReason});
    Sentry.captureException(new Error(failedReason + "name: " + name));
})

mailQueue.on('completed', ({/*queue, opts,*/ data, name,/* failedReason,*/ id}) => {

    console.log("completed", {/*queue, opts, */data, name,/* failedReason,*/ id});
})

mailQueue.add({email:'',name:''});

/**Executor*/
export function processMailQueue() {
    try {
        mailQueue.process(async ({name: jobName, data: {email, name}}) => {
            await mailer.sendMail({
                to: email,
                from: 'Yan Policarpo Dev <yan.policarpo@beedoo.com.br>',
                subject: `Seja bem vindo(a) ${name}`,
                text: `Olá ${name}, <${email}>`,
            });
            console.log("ON PROCESS", {jobName, email})
        })
    } catch (e) {
        Sentry.captureException(e);
    }

}

export default mailQueue;