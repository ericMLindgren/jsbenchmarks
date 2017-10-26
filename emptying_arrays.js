var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;
 

const arrays = {a:[],b:[],c:[],d:[]};

const popArray = function() {
	while (arrays.a.length > 0)
		arrays.a.pop();

}

const lengthZero = function() {
		arrays.a.length = 0;
}

for (let ar in arrays){	
	for (let i = 0; i < 1000000; i++)
	 	arrays[ar].push('222')
}

suite.add('( While (Array.length>0) {Array.pop()} )', popArray)
.add('( Array = [] )', () => {
	arrays.a = []
})
.add('( Array.prototype.Splice )', () => {
	arrays.a.splice(0,arrays.a.length-1);
})
.add('( Array.length = 0 )', lengthZero)

.add('( Do Nothing )', () => {
	
})
.on('cycle', (event) => {
	console.log(String(event.target));
})
.on('complete', function() {
	console.log('Fastest was ' + this.filter('fastest').map('name'))
})
.run({ 'async': true })
