import {ITip} from './tip';

export interface ITrip {
    id: number;
    name: string;
    userId: string;
    city: string;
    coutry: string;
    time: string;
    tips: ITip[];
    lastUpdated: string;
    isDeleted: boolean;
}
