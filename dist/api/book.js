"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = exports.getBookData = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config");
class ApiError extends Error {
    status;
    constructor(message, status) {
        super(message);
        this.status = status;
        this.name = "ApiError";
    }
}
exports.ApiError = ApiError;
async function getBookData() {
    try {
        const resp = await axios_1.default.get(`${config_1.apiUrl}/book`);
        if (resp.status === 200) {
            return resp.data;
        }
        else {
            throw new ApiError(`Unexpected status code: ${resp.status}`, resp.status);
        }
    }
    catch (err) {
        if (typeof err === "object" && err !== null && "response" in err) {
            const axiosError = err;
            if (axiosError.response) {
                throw new ApiError(`Unexpected status code: ${axiosError.response.status}`, axiosError.response.status);
            }
        }
        else {
            const castedError = err;
            console.log("Axios Error Status:", castedError); // Log for debugging
            throw new ApiError(`Failed to retrieve book data: ${castedError.message}`, 500);
        }
    }
    throw new Error("An unexpected error occurred");
}
exports.getBookData = getBookData;
