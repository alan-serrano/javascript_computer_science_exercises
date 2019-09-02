//1.- Bubble Sort

function bubbleSort(arr) {
    var count;
    var n = 0;
    var contador = 0;
    while (count != 0) {
        count = 0;
        for (let i = 0; i < arr.length - 1 - n; i++) {
            let aux = arr[i];
            if (arr[i] > arr[i+1]) {
                arr[i] = arr[i+1];
                arr[i+1] = aux;
                count++;
            }

            contador++;
        }
        n++;
    }
    console.log(contador);
    return arr;
} //22 27 0

function insertionSort(arr) {

    //Contador
    var contador1 = 0;
    var contador2 = 0;
    var aux;
    var contador;
    //Fin Contador

    for (let i = 1; i < arr.length; i++) {
        const element = arr[i]; 
        let j = i;

        //Contador
        let aux;
        contador1++
        //Fin contador

        while(j>0 && arr[j-1] > element){
            
            arr[j] = arr[j-1];  
            arr[--j] = element;
            
                //Contador
                aux = 1;
                contador2++;
                //Fin contador
        }

        //Contador
        if(aux) contador1-=aux;
        //Fin Contador
        
    }


    //contador
    contador = contador1 + contador2;
    console.log(contador);
    //Fin Contador

    return arr;
}//10 13 0

function selectionSort(arr) {
    var contador = 0;
    for (let i = 0; i < arr.length - 1; i++) {
        let min = i;

        for (let j = i + 1; j < arr.length; j++) {

            if(arr[j]<arr[min]){
                min = j;
            }

            contador++;
        }

        if(arr[i] != min){
            let aux = arr[min];
            arr[min] = arr[i];
            arr[i] = aux;
        }
        
    }

    console.log(contador);

    return arr;
}//28 28 0

function selectionSort(arr) {
    var auxChange;
    for (let i = 1; i < arr.length; i++) {
        for (let j = i; j >= 0 && arr[j - 1] > arr[j]; j--) {

            auxChange = arr[j];
            arr[j] = arr[j - 1];
            arr[j - 1] = auxChange;

        }
    }

    return arr;
}

