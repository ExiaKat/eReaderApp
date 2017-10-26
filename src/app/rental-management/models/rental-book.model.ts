import { MemberInfo } from './member-info.model';

export class RentalBook {
  public _id: string;
  constructor (
    public bookName: string, 
    public quantity: number, 
    public borrowDate: Date,
    public returnDate: Date,
    public notes: string
  ){}
}