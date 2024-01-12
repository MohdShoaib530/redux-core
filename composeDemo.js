import { compose } from "redux";

function removeSpacesString(string){
    return string.split(' ').join('')
};

// console.log(removeSpacesString('my name is mohd shoaib'));

function repeatString(string){
    return string.repeat(2)
};
// console.log(repeatString('shoaib'));

function converToUpperCase(string){
    return string.toUpperCase();
};
// console.log(converToUpperCase('dfld'));

let input = 'hello'

// const output = converToUpperCase(repeatString(removeSpacesString(input)));
// console.log(output);

const composeFunction = compose(removeSpacesString, repeatString, converToUpperCase);

console.log(composeFunction(input));
