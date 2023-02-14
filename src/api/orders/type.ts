export type GetChefOrdersRequest= {
    restaurantId: number,
    status: string,
};

export interface OrderType{
    user: string,
    date: string,
    order:string,
    price: string,
    id: number,
}

export type GetChefOrdersResponse= OrderType[]

export type EditChefOrderResponse=void;

export interface EditChefOrderRequest{
    restaurantId: number,
    orderId: number,
    body: 'idle' | 'canceled' | 'pending' | 'processing' | 'ready' | 'on_delivery' | 'completed'
}
