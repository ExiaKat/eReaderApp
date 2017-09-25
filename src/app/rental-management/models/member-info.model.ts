import { Child } from './child.model';
import { EReader } from './e-reader.model';

export class MemberInfo {
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