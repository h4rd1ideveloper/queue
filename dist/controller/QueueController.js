"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueController = void 0;
const core_1 = require("@overnightjs/core");
const http_status_codes_1 = require("http-status-codes");
const MailQueue_1 = __importDefault(require("../MailQueue"));
let QueueController = class QueueController {
    get(request, res) {
        const name = request.query.name;
        const email = request.query.email;
        MailQueue_1.default.add({ email, name });
        return res.status(http_status_codes_1.StatusCodes.OK).json({ email, name });
    }
};
__decorate([
    (0, core_1.Get)()
], QueueController.prototype, "get", null);
QueueController = __decorate([
    (0, core_1.Controller)('api/queue')
], QueueController);
exports.QueueController = QueueController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUXVldWVDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyb2xsZXIvUXVldWVDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLDRDQUFrRDtBQUVsRCx5REFBOEM7QUFDOUMsNkRBQXFDO0FBR3JDLElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWU7SUFFaEIsR0FBRyxDQUFDLE9BQWdCLEVBQUUsR0FBYTtRQUN2QyxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQWMsQ0FBQztRQUMxQyxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQWUsQ0FBQTtRQUMzQyxtQkFBUyxDQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO1FBQzdCLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQywrQkFBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO0lBQzFELENBQUM7Q0FDSixDQUFBO0FBTkc7SUFEQyxJQUFBLFVBQUcsR0FBRTswQ0FNTDtBQVBRLGVBQWU7SUFEM0IsSUFBQSxpQkFBVSxFQUFDLFdBQVcsQ0FBQztHQUNYLGVBQWUsQ0FRM0I7QUFSWSwwQ0FBZSJ9