var express = require('express')
var expect  = require('chai').expect;
var request = require('request');

it('Main page content', function(done) {
    request('http://localhost:8080/test' , function(error, response, body) {
        expect(body).to.equal('{"message":"Test 3 successful"}');
        done();
    });
});
