import {Controller, Get} from '@overnightjs/core';
import {Request, Response} from 'express';
import {StatusCodes} from "http-status-codes";
import mailQueue from "../MailQueue";

@Controller('api/queue')
export class QueueController {
    @Get()
    private get(request: Request, res: Response) {
        const name = request.query.name as string;
        const email = request.query.email as string
        mailQueue.add({email, name});
        return res.status(StatusCodes.OK).json({email, name});
    }
}