export interface update {
    name: string;
    value: number;
    date: Date;
    category: string;
  }
  
export interface newValue extends update {
   userId: number;
}

export default abstract class MainModel<t> {
    abstract getAll(id: number, month: number, year: number): Promise<t[]>
    
    abstract create(revenue: newValue): Promise<t>
    
    abstract update(id: number, userId:number, revenue: update): Promise<number>
    
    abstract delete(id:number, userId:number): Promise<number>
}