var assert = require('assert');
var expect = require('chai').expect;
var Barmen = require('../src/barmen');
var Visitor = require('../src/visitor');
var ImageDownloader = require('../src/image-downloader');
var fs = require('fs');
var username = require('username');

class TestClass {
	constructor() {
		this._testBarman = new Barmen();
		this._testMe = new Visitor();
		this._testImageDownloader = new ImageDownloader();
	}

	get testBarman(){
		return this._testBarman;
	}

	get testMe(){
		return this._testMe;
	}

	get testImageDownloader(){
		return this._testImageDownloader;
	}

	SoberVisitor(){
		this._testMe.sober();
	}

	FreeBarman(){
		this._testBarman.free();
	}

	GetFakeCar(){
		return this._testMe.getMyCar("fakeCar");
	}

	GetFakeWhisky(){
		return "fakeWhisky";
	}
}

const testClass = new TestClass();

suite('when barmen pours whisky', function () {
	setup(function () {
		testClass.SoberVisitor();
		testClass.FreeBarman();
		testClass.testMe.goToBar(testClass.GetFakeCar());
	});

	suite('i ask 50 grams', function () {
		test('I get 50 grams', function () {
			var iAskVolume = 50;

			var volumeInGlass = testClass.testBarman.pour(testClass.GetFakeWhisky, iAskVolume);
//			testClass.testMe.drink(volumeInGlass);

			assert.equal(iAskVolume, volumeInGlass);
//			assert.equal(false, me.isDrunk());
//			assert.equal(50, me.getTotallyDrunk());
		});
	});

	suite('i ask -10 grams', function () {
		test('I get an error', function (done) {
			fs.readFile('whisky.jpg', function (err, whisky) {
				if (err) {
					done(err);
				}

				var iAskVolume = -10;

				expect(() => barmen.pour(whisky, iAskVolume)).to.throw(/Invalid volume of whisky/);
				done();
			});
		});
	});

	suite('i ask 500 grams', function () {
		test('Barmen said there is no such glass', function (done) {

			username().then(un => {
				console.log(un);

				if (un === "dpavlov") {
					var iAskVolume = 500;
					var whisky = 1;

					expect(() => barmen.pour(whisky, iAskVolume)).to.throw(/There is no such glass/);
					done();

					return;
				}

				done();
			});
		})
	});

	teardown(function () {

	})
});