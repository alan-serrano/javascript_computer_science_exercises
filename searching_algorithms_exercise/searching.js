//linearSearch

function linearSearch(arr, val) {
    for (let i = 0; i < arr.length; i++) {
        if(arr[i]== val){
            return i;
        }
    }

    return -1;
}


//linearSearchRecursive

function linearSearchRecursive(arr, val) {
    var copy = arr.slice();
    var arrLength = arr.length;
    
    //Scope Helper
    function wrapper(arr) {
        //Base case, si el array está vacío se detiene
        if (arr.length == 0) return -1;

        //Si se encuentra el valor retorna el index
        if (arr[0] == val) return arrLength - arr.length ;

        //Eliminar el primer elemento y continuar recursivamente
        //Cuidado, shift es O(n), lo que hace que esta función sea más lenta
        arr.shift();
        return wrapper(arr);
    }

    return wrapper(copy);
}

function linearSearchRecursive(arr, val) {
    //Inicio y final del loop recursive
    var start = 0;
    var end = arr.length - 1;

    //Wrapper helper to change start in every step
    function wrapper(start) {

        //return -1 if the value isn't found
        if(start > end) return -1;

        //If val is found, return the index
        if(arr[start] == val) return start;

        //Otherwise, call the function again
        return wrapper(++start);
    }

    return wrapper(start);
}


//binarySearch

function binarySearch(arr, val, start = 0, end = arr.length - 1) {
    var middle;
    
    while(start <= end){
        //Hallar el index medio
        middle = Math.floor((start + end)/2);
        
        //Verificar si el valor medio es igual al valor buscado
        
        if(arr[middle] == val){ 
            return middle;  
        }else if (val > arr[middle]){
            start = middle + 1
        }else{
            end = middle - 1;
        }
    }

    return -1;
}

//binarySearchRecursive

function binarySearchRecursive(arr, val, start = 0, end = arr.length - 1) {

    var middle = Math.ceil((start + end) / 2);

    //base case
    if (start > end) return -1;

    //Comparación de valores
    if (arr[middle] == val) {
        return middle;
    }
    if (val > arr[middle]) {
        start = middle + 1;
    } else {
        end = middle - 1;
    }

    return binarySearchRecursive(arr, val, start, end);
}