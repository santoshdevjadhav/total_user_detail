const express = require('express');
const { json } = require('express');
const app = express();
var MongoClient = require('mongodb').MongoClient;
const port = 3000;
var url = 'mongodb://localhost:27017/';
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/viewDetail', (req, res) => {
	MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
		if (err) throw err;
		var dbo = db.db('test');
		switch (req.body.viewType) {
			case 'week': {
				dbo.collection('test')
					.aggregate([
						{ $match: { ProductId: req.body.ProductId } },
						{ $project: { ViewDateWeek: { $week: '$ViewDate' }, UserId: '$UserId' } },
						{
							$group: {
								_id: '$ViewDateWeek',
								count: { $sum: 1 },
								uniqueUsers: { $addToSet: '$UserId' },
								UserId: { $first: '$UserId' },
								users: { $push: '$UserId' },
								WeekValue: { $first: '$ViewDateWeek' },
							},
						},
						{
							$addFields: { uniqueUserCount: { $size: '$uniqueUsers' }, totalUser: { $size: '$users' } },
						},
					])
					.toArray(function (err, result) {
						if (err) throw err;
						res.send(result);
						db.close();
					});
				break;
			}
			case 'month': {
				dbo.collection('test')
					.aggregate([
						{ $match: { ProductId: req.body.ProductId } },
						{ $project: { ViewDateWeek: { $month: '$ViewDate' }, UserId: '$UserId' } },
						{
							$group: {
								_id: '$ViewDateWeek',
								count: { $sum: 1 },
								uniqueUsers: { $addToSet: '$UserId' },
								UserId: { $first: '$UserId' },
								users: { $push: '$UserId' },
								MonthValue: { $first: '$ViewDateWeek' },
							},
						},
						{
							$addFields: { uniqueUserCount: { $size: '$uniqueUsers' }, totalUser: { $size: '$users' } },
						},
					])
					.toArray(function (err, result) {
						if (err) throw err;
						res.send(result);
						db.close();
					});
				break;
			}
			case 'custom': {
				const startDate = req.body.startDate ? new Date(req.body.startDate) : new Date('0');
				const endDate = req.body.endDate ? new Date(req.body.endDate) : new Date();
				dbo.collection('test')
					.aggregate([
						{
							$match: { ViewDate: { $gte: startDate, $lte: endDate }, ProductId: req.body.ProductId },
						},
						{ $project: { ProductId: '$ProductId', UserId: '$UserId' } },
						{
							$group: {
								_id: '$ProductId',
								viewCount: { $sum: 1 },
								uniqueUsers: { $addToSet: '$UserId' },
								users: { $push: '$UserId' },
							},
						},
						{
							$addFields: { uniqueUserCount: { $size: '$uniqueUsers' }, totalUser: { $size: '$users' } },
						},
					])
					.toArray(function (err, result) {
						if (err) throw err;
						res.send(result);
						db.close();
					});
				break;
			}
			case 'daily': {
				dbo.collection('test')
					.aggregate([
						{ $match: { ProductId: req.body.ProductId } },
						{
							$group: {
								_id: '$ViewDate',
								count: { $sum: 1 },
								uniqueUsers: { $addToSet: '$UserId' },
								UserId: { $first: '$UserId' },
								users: { $push: '$UserId' },
							},
						},
						{
							$addFields: { uniqueUserCount: { $size: '$uniqueUsers' }, totalUser: { $size: '$users' } },
						},
					])
					.toArray(function (err, result) {
						if (err) throw err;
						res.send(result);
						db.close();
					});
				break;
			}
			case 'total': {
				dbo.collection('test')
					.aggregate([
						{ $match: { ProductId: req.body.ProductId } },
						{
							$group: {
								_id: '$ProductId',
								viewCount: { $sum: 1 },
								uniqueUsers: { $addToSet: '$UserId' },
								users: { $push: '$UserId' },
							},
						},
						{
							$addFields: { uniqueUserCount: { $size: '$uniqueUsers' }, totalUser: { $size: '$users' } },
						},
					])
					.toArray(function (err, result) {
						if (err) throw err;
						res.send(result);
						db.close();
					});
				break;
			}
			default:
				res.send(null);
				break;
		}
	});
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
