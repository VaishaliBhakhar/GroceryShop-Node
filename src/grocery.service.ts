import * as _ from 'lodash';

type GroceryDataType = {
    name: string,
    price: number
}

type ApplySchemeType = {
    itemsForBut1Get1HalfPrice: Array<GroceryDataType>,
    itemsWithNoScheme: Array<GroceryDataType>,
}

const groceryDataWithPrice: Array<GroceryDataType> = 
[
    {
        name: 'apple',
        price:  0.50
    },
    {
        name: 'banana',
        price:  0.40
    },
    {
        name: 'tomato',
        price:  0.30
    },
    {
        name: 'potato',
        price:  0.26
    },
];


function groceriesWithPrice(filteredArray: Array<string>): Array<GroceryDataType> {
    let groceryItemWithPrice:  Array<GroceryDataType> = [];
    filteredArray.forEach((t) => groceryDataWithPrice.filter((g) => {
        if(t === g.name){
            groceryItemWithPrice.push({name: t,price: g.price})
        }
    }));
    return groceryItemWithPrice;
}

function applyBuy1Get1HalfPrice(buy1Get1HalfPrice: GroceryDataType[]): ApplySchemeType {
    let groupedItems = _.groupBy(buy1Get1HalfPrice,'name');
    let orderedItems = _.orderBy(groupedItems, [groupedItems.length], ['desc']);

    let itemsForBut1Get1HalfPrice:  Array<GroceryDataType> = [];
    let itemsWithNoScheme:  Array<GroceryDataType> = [];

    orderedItems.forEach((item,i) => {
        if(item.length > 1) {
            if(i === 0) { 
                // to apply scheme to item having highest count
                itemsForBut1Get1HalfPrice.push(item.slice(0,2));
                itemsWithNoScheme.push(_.drop(item, 2));
            } else {
                itemsWithNoScheme.push(item);
            }
        } else {
            itemsWithNoScheme.push(item);
        }
        
    });
    itemsForBut1Get1HalfPrice = _.flattenDeep(itemsForBut1Get1HalfPrice);
    itemsWithNoScheme = _.flattenDeep(itemsWithNoScheme);
    
    return {itemsForBut1Get1HalfPrice,itemsWithNoScheme}
}

function convertToAwsAndClouds(firstScheme: GroceryDataType[], 
                               secondScheme: GroceryDataType[], 
                               noScheme: GroceryDataType[]
                            ): string {
        const firstSchemeAmount = firstScheme.length > 0 ? _.sumBy(firstScheme, 'price') : 0;
        const secondSchemeAmount = secondScheme.length > 0 ? (_.sumBy(secondScheme, 'price')-(secondScheme[0].price/2)) : 0;
        const noSchemeAmount = noScheme.length > 0 ? _.sumBy(noScheme, 'price') : 0;
    
    let totalSumOfPrice = ( firstSchemeAmount + secondSchemeAmount + noSchemeAmount );
    
    return `${parseInt(totalSumOfPrice)} aws ${parseInt(((totalSumOfPrice-parseInt(totalSumOfPrice))*100).toFixed(2))} clouds`;
}

function devideItemsToapplyScheme(basket: Array<string>) {
    let twoFor3Scheme: Array<string> = [];
    let remainingItems: Array<string> = [];
    if(basket.length >= 3) { 
        twoFor3Scheme = basket.slice(0,3);
        remainingItems = _.drop(basket, 3);
    } else {
        remainingItems = basket;
    }

    return {twoFor3Scheme,remainingItems};
} 

export function applyScheme(basket: Array<string>): string {
    let twoFor3Scheme = devideItemsToapplyScheme(basket).twoFor3Scheme;
    let remainingItems = devideItemsToapplyScheme(basket).remainingItems;
    let twoFor3SchemeWithPrice = groceriesWithPrice(twoFor3Scheme);
    const buy1Get1HalfPriceItemNames = groceriesWithPrice(remainingItems);
    const getItemWithMinPrice = _.minBy(twoFor3SchemeWithPrice, 'price');
    
    twoFor3SchemeWithPrice.splice(_.findIndex(twoFor3SchemeWithPrice,getItemWithMinPrice), 1);
    let buy1Get1HlafPriceItems = applyBuy1Get1HalfPrice(buy1Get1HalfPriceItemNames).itemsForBut1Get1HalfPrice;
    let noSchemeItems = applyBuy1Get1HalfPrice(buy1Get1HalfPriceItemNames).itemsWithNoScheme;

    let finalAmount = convertToAwsAndClouds(twoFor3SchemeWithPrice, buy1Get1HlafPriceItems, noSchemeItems);
        
    return finalAmount;
}