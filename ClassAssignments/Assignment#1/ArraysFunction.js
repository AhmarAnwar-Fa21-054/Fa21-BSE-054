const myFavColors = ["Orange", "Blue", "Green", "Red"];
console.log(myFavColors.length);
console.log(myFavColors.toString());
console.log(myFavColors.at(2));
console.log(myFavColors.at(-2));
console.log(myFavColors[2]);
console.log(myFavColors.join("/"));
console.log(myFavColors);
console.log(myFavColors.pop());
console.log(myFavColors);
console.log(myFavColors.push("Aqua"));
console.log(myFavColors);
console.log(myFavColors.shift());
console.log(myFavColors);
console.log(myFavColors.unshift("Purple"));
console.log(myFavColors);
myFavColors[0] = "LightBlue";
console.log(myFavColors);
myFavColors[myFavColors.length] = "Cyan";
console.log(myFavColors);
delete myFavColors[2];
console.log(myFavColors);
const myFavSports = ["Cricket", "Tennis", "FootBall"];
const myFavSubjects = ["Maths", "Programming", "Business"];
console.log(myFavColors.concat(myFavSports, myFavSubjects));
console.log(myFavColors.concat("myFavSports", myFavSubjects));
console.log(myFavSubjects);
myFavSubjects.copyWithin(2, 0); //Copy to index 2, all elements from index 0:
console.log(myFavColors);
console.log(myFavColors.copyWithin(2, 0, 2)); //Copy to index 2, the elements from index 0 to 2(excluded):
console.log(myFavColors.copyWithin(-2, 0, 2));
const myFavNumbers = [3, 7, 9, 11, 13];
console.log(myFavNumbers.copyWithin(1, -3, -1)); //2,3
const nestedArray = [
  [1, 2],
  [3, 4],
  [5, 6, [7, 8]],
]; //--->[1,2,3,4,5,6,7,8]
console.log(nestedArray[2][2][1]);
console.log(nestedArray);
console.log(nestedArray.flat(2)); //flat brings all the values at (specified depth)n-depth to depth 0
console.log(myFavSubjects);
myFavSubjects.splice(0, 1, "Data Science", "Stats");
console.log(myFavSubjects);
console.log(myFavSports);
newArrayAfterSplicing = myFavSports.toSpliced(0, 1, "Hockey");
console.log(myFavSports);
console.log(newArrayAfterSplicing);
const difficultSubjects = myFavSubjects.slice(0, 3);
console.log(difficultSubjects);
console.log("This is a Comma Seprated String " + difficultSubjects);
//map()
let func1 = function (x, y) {
  return x * y; //current item * its index value
};
let returnedArray = myFavNumbers.map(func1);
console.log(returnedArray);

//filter()
let func2 = function (x) {
  return x % 3 == 0;
};
returnedArray = myFavNumbers.filter(func2);
console.log(returnedArray);

//reduce()
let func3 = function (x, y) {
  return x + y;
};
console.log("myFavNumbers:", myFavNumbers); //[3, 9, 11, 11, 13]
let sum = myFavNumbers.reduce(func3, 100);
console.log(sum);




