export class Item { 
    constructor( 
        public name: string, 
        public price: number,
        public quantity: number,
        public image?: string, 
        public desiredQuantity?: number) {} 
    }