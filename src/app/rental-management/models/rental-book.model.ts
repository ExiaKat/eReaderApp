export class RentalBook {
  constructor (
    public bookName: string, 
    public quantity: number, 
    public borrowDate: Date,
    public returnDate: Date) {}
}