import { post } from './axios';

export interface IInquiryParams {
    name?: string;
    phone?: string;
    startDate?: string;
    endDate?: string;
}

export const inquiry = (params: IInquiryParams) => post('inquiry', params);
