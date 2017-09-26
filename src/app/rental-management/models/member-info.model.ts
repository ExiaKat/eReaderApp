import { Child } from './child.model';
import { EReader } from './e-reader.model';
import { RentalBook } from './rental-book.model';

export class MemberInfo {
  public _id: string;
  
  constructor(
    public memberNumber: string,
    public parentName: string,
    public mobile: string,
    public children: Array<Child>,
    public eReader: EReader,
    public deposit: number,
    public expiryDate: Date
  ){}
}