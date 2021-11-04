"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
exports.default = nodemailer_1.default.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'maia.sawayn88@ethereal.email',
        pass: 'WSJAHkvd7ajwqS7aVf'
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbWFpbGVyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNERBQW9DO0FBRXBDLGtCQUFlLG9CQUFVLENBQUMsZUFBZSxDQUFDO0lBQ3RDLElBQUksRUFBRSxxQkFBcUI7SUFDM0IsSUFBSSxFQUFFLEdBQUc7SUFDVCxJQUFJLEVBQUU7UUFDRixJQUFJLEVBQUUsOEJBQThCO1FBQ3BDLElBQUksRUFBRSxvQkFBb0I7S0FDN0I7Q0FDSixDQUFDLENBQUMifQ==