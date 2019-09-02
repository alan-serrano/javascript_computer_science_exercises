//1.
function productOfArray(arr){
    var copy = arr.slice();

    if(copy.length == 0){
        return 1;
    }

    copy.shift();
    return arr[0]*productOfArray(copy);
}

//2.-

// var nestedObject = {
//     data: {
//         info: {
//             stuff: {
//                 thing: {
//                     moreStuff: {
//                         magicNumber: 44
//                     }
//                 }
//             }
//         }
//     }
// }

// contains(nestedObject, 44) // true
// contains(nestedObject, "foo") // false

function contains(obj, searchVal) {

    var resultado;
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {

            if(typeof obj[key] === "object"){

                resultado = resultado || contains(obj[key], searchVal);

            }else if (obj[key] === searchVal) {

                return true;

            }

        }
    }

    return !!resultado;
}

//Collect all the strings in a nestedObject
function collectStrings(obj) {

    var resultado = [];
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {

            if(typeof obj[key] === "object"){

                resultado = resultado.concat(collectStrings(obj[key]));

            }else if (typeof obj[key] === "string") {
                resultado.push(obj[key]);

            }

        }
    }

    return resultado;
}
// https://www.codewars.com/kata/the-real-size-of-a-multi-dimensional-array/train/javascript
// Pasaron todas las pruebas
function realSize(arr) {
    // var suma = 0;
    // arr.forEach(function arrFor(val) {
    //     if(typeof val === "object"){
    //         suma += realSize(val);
    //     }else if(typeof val === "number"){
    //         suma++;
    //     }

    // });

    if(arr.length == 0) return 0;
    // return suma;
    var copy = arr.slice();

    //SubTotal: Para arrays internos
    var subTotal;

    //Copia de array
    copy.shift();
    if(typeof arr[0] === "object"){
         subTotal = realSize(arr[0]);
         return subTotal + realSize(copy);
    }

    
    return 1 + realSize(copy);
}

//https://www.codewars.com/kata/sum-squares-of-numbers-in-list-that-may-contain-more-lists/train/javascript

function SumSquares(arr) {

    if(arr.length == 0) return 0;
    var copy = arr.slice();

    //SubTotal: Para arrays internos
    var subTotal;

    //Copia de array menos el primero para pasar al próximo Loop
    copy.shift();
    if(typeof arr[0] === "object"){
         subTotal = SumSquares(arr[0]);
         return subTotal + SumSquares(copy);
    }

    
    return arr[0] * arr[0] + SumSquares(copy);
}

/* https://www.codewars.com/kata/recursive-replication
You need to design a recursive function called replicate which will receive arguments times and number.

The function should return an array containing repetitions of the number argument. For instance, replicate(3, 5) should return [5,5,5]. If the times argument is negative, return an empty array.

As tempting as it may seem, do not use loops to solve this problem. */


function replicate(times, number) {
    var arr = [number];

    if(times<1){
        return [];
    }

    return arr.concat(replicate(--times, number));
}

function search(arr, searchVal) {
    var arrLength = arr.length;
    var copy = arr.slice();
    
    return (function innerSearch(arr) {

        if(arr.length == 0){
            return -1;
        }

        if(arr[0] != searchVal){
            arr.shift();
            return innerSearch(arr, searchVal);
        }
        
        return arrLength - arr.length;
        
        
    }(copy))

}

function binarySearch(arr, val) {
    var arrLength = arr.length;
    var copy = arr.slice();
    var index = 0;

    function innerSearch(arr) {
        //Hallando el index que se encuentra a la mitad
        var middle = Math.ceil(arr.length/2);

        //Si no se encuentra el valor devuelve -1
        if(arr.length == 0) return -1;

        //Elección de lado del array
        if(arr[middle - 1] == val){
            index = index + middle;
            return index - 1;
        }else if(arr[middle - 1] < val){
            index = index + middle;
            arr.splice(0, middle);
        }else{
            arr.splice(middle - 1);
        }

        return innerSearch(arr);
    }

    return innerSearch(copy);
}

function stringifyNumbers(obj) {
    var objeto = JSON.parse(JSON.stringify(obj));
    for (const key in objeto) {
        if (objeto.hasOwnProperty(key)) {
            if(typeof objeto[key] === "object"){
                
                objeto[key] = stringifyNumbers(objeto[key]);
            }

            if (typeof objeto[key] === "number") {
                objeto[key] = objeto[key].toString();   
            }
        }
    }

    return objeto;
}

//Hofstadter Female and Male sequences 
//https://www.codewars.com/kata/mutual-recursion/train/javascript

function F(n) {
    if(n == 0) return 1;
    return n - M(F(n-1));
}

function M(n) {
    if(n == 0) return 0;
    return n - F(M(n-1));
}

function secuencia(arr, n) {
    for (let i = 0; i < n; i++) {
        arr.push(F(i));
    }

    console.log(arr);
}