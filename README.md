
Code to find total users and total unique users who viewed a product on daily/weekly/monthly/Custom date from the following collection.

String : UserId;
Date : ViewDate;
String : ProductId;
# Run command
In the project directory, you can run:
    ``node server.js``
Open`` http://localhost:3000/viewDetail`` to view it in the postman.
# Postman body 
__For Weekly user and weekly unique user__ 
``Input``
```
{
    "viewType": "week",
    "ProductId": "p-2",
}
```
``Output``
```
[
	{
		_id: 6,
		count: 2,
		uniqueUsers: ['u-3', 'u-1'],
		UserId: 'u-3',
		users: ['u-3', 'u-1'],
		WeekValue: 6,
		uniqueUserCount: 2,
		totalUser: 2,
	},
	{
		_id: 1,
		count: 4,
		uniqueUsers: ['u-3', 'u-2', 'u-1'],
		UserId: 'u-3',
		users: ['u-3', 'u-2', 'u-1', 'u-1'],
		WeekValue: 1,
		uniqueUserCount: 3,
		totalUser: 4,
	},
];
```
Similarly we can get output for monthly, daily, custom and total with below input
__Body for monthly deails__
```
{
     "viewType": "month",
    "ProductId": "p-2",
}
```
__Body for daily deatils__
```
{
    "viewType": "daily",
    "ProductId": "p-2", 
}
```
__Body for total detail__
```
{
    "viewType": "total",
    "ProductId": "p-2", 
}
```
__Body for custom dates__
```
{
     "viewType": "custom",
    "ProductId": "p-2",
    "startDate":"2020-01-10",
    "endDate":"2020-01-13"
}
```
____
# Database 
Collection name __userView__
```
db.userView.insertMany([
	{ UserId: 'u-1', ViewDate: new ISODate('2020-01-12'), ProductId: 'p-1' },
	{ UserId: 'u-2', ViewDate: new ISODate('2020-01-12'), ProductId: 'p-2' },
	{ UserId: 'u-3', ViewDate: new ISODate('2020-02-10'), ProductId: 'p-1' },
	{ UserId: 'u-4', ViewDate: new ISODate('2020-01-13'), ProductId: 'p-2' },
	{ UserId: 'u-1', ViewDate: new ISODate('2020-01-12'), ProductId: 'p-1' },
	{ UserId: 'u-2', ViewDate: new ISODate('2020-06-12'), ProductId: 'p-2' },
	{ UserId: 'u-3', ViewDate: new ISODate('2020-04-30'), ProductId: 'p-1' },
	{ UserId: 'u-4', ViewDate: new ISODate('2020-01-21'), ProductId: 'p-2' },
	{ UserId: 'u-1', ViewDate: new ISODate('2020-07-12'), ProductId: 'p-1' },
	{ UserId: 'u-2', ViewDate: new ISODate('2020-06-12'), ProductId: 'p-2' },
	{ UserId: 'u-3', ViewDate: new ISODate('2020-04-12'), ProductId: 'p-1' },
	{ UserId: 'u-4', ViewDate: new ISODate('2020-08-12'), ProductId: 'p-2' },
	{ UserId: 'u-1', ViewDate: new ISODate('2020-10-12'), ProductId: 'p-2' },
	{ UserId: 'u-2', ViewDate: new ISODate('2020-11-12'), ProductId: 'p-1' },
	{ UserId: 'u-3', ViewDate: new ISODate('2020-03-30'), ProductId: 'p-2' },
	{ UserId: 'u-4', ViewDate: new ISODate('2020-01-12'), ProductId: 'p-1' },
	{ UserId: 'u-1', ViewDate: new ISODate('2020-01-12'), ProductId: 'p-1' },
	{ UserId: 'u-2', ViewDate: new ISODate('2020-01-12'), ProductId: 'p-1' },
	{ UserId: 'u-3', ViewDate: new ISODate('2020-01-12'), ProductId: 'p-1' },
	{ UserId: 'u-4', ViewDate: new ISODate('2020-01-12'), ProductId: 'p-1' },
]);
```
