import * as GroceryService from './grocery.service';

export const getGroceries = async(req:any, res:any) => {
    let mySchemePrice = GroceryService.applyScheme(req.body.basket);
    res.send(mySchemePrice);
}