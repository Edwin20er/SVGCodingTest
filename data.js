function Mode(name, year_one, year_two, value){
this.name = name;
this.year_one = year_one;
this.year_two = year_two;
this.value=value;}

function data_load() {
 var collection = [];
	collection.push(new Mode("Bicycle",200,220,1));
	collection.push(new Mode("Car",100,94,1));
	collection.push(new Mode("Truck",150,168,1));
	collection.push(new Mode("Motorcycle",40,55,1));
	collection.push(new Mode("Jet",11,14,1));
	collection.push(new Mode("Unicycle",74,82,1));
return collection;
}
function dataMax() {
 return 220;
}