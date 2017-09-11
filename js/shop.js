/**
 * Created by User on 11.09.2017.
 */
const USDRUB = 65.20

const cart = [
	{
		id: 1,
		currency: 'USD',
		price: 14.0,
		count: 3
	},
	{
		id: 4,
		currency: 'USD',
		price: 2.0,
		count: 7
	},
	{
		id: 2,
		currency: 'USD',
		price: 5.0,
		count: 30
	},
	{
		id: 1,
		currency: 'USD',
		price: 14.0,
		count: 1
	},
	{
		id: 3,
		currency: 'USD',
		price: 150.0,
		count: 1
	},
	{
		id: 2,
		currency: 'USD',
		price: 5.0,
		count: 35
	},
	{
		id: 1,
		currency: 'USD',
		price: 14.0,
		count: 2
	},
]

const storage = {
	1: true,
	2: true,
	3: false,
	4: true
}

// Functions to sort array of objects by 'id' field
function sortById(objA, objB)
{
	return objA.id - objB.id;
}

// Create a copy of the cart array
var billCart = cart.slice();

// First we sort the copy of the cart by ids of added items
billCart.sort(sortById);

// Starting from the first item in the the copy of the cart
var j = 0;

// For all unique goods from the storage
for (var i = 1; i <= 4; i++)
{
	// If the store has it
	if (storage[i])
	{
		var first = j; // first item in the cart with this id
		j++;

		// We group money and count in the first item in the the copy of the cart with this id
		while ( (j < billCart.length) && (billCart[j].id == i) )
		{
			billCart[first].count += billCart[j].count;
			billCart[j].id = 0;
			j++;
		}
	}
	// If the store is out of this goods we skip them
	else
	{
		while ( (j < billCart.length) && (billCart[j].id == i) )
		{
			billCart[j].id = 0;
			j++;
		}
	}
}

var bill =
	{
		total: { currency: 'RUB', price: 0 },
		items: []
	}

// Count total sum and pin unique items to the bill
j = 0;
for (var i = 0; i < billCart.length; i++)
{
	if (billCart[i].id) {
		
		bill.items[j] = billCart[i];
		bill.items[j].price *= USDRUB * bill.items[j].count;
		bill.items[j].price = +bill.items[j].price.toFixed(2);

		bill.total.price += bill.items[j].price;
		j++;
	}
}

// Pretty print the bill
document.write('<h4>Счет:</h4>');

document.write('<table><thead><td>ID</td><td>Цена</td><td>Кол-во</td></thead><tbody>');
for (var i = 0; i < bill.items.length; i++)
{
	document.write('<tr><td>' + bill.items[i].id + '</td><td>' +
		bill.items[i].price + '</td><td>' +
		bill.items[i].count + '</td></tr>');
}
document.write('</tbody></<table>');

document.write('<p>Итого: '+ bill.total.price + ' ' + bill.total.currency +'</p>');