function Node(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
}
function Queue() {
    this.first = null;
    this.last = null;
    this.size = 0;
}

Queue.prototype.enqueue = function enqueue(value) {
    this.size++;
    if(!this.first){
        this.last = new Node(value);
        this.first = this.last;
        return this.size;
    }

    //Crear nuevo nodo y guardar referencias de nodos afectados
    let newLast = new Node(value);
    let oldLast = this.last;

    //Actualizar referencias del antiguo último
    oldLast.prev = newLast;

    //Actualizar referencias del actual último nodo
    this.last = newLast;
    newLast.next = oldLast;

    return this.size;
}

Queue.prototype.dequeue = function dequeue(value) {
    if(this.size == 1){
        let auxVal = this.first.value;
        this.first = null;
        this.last = null;
        this.size = 0;
        return auxVal;
    }else if(this.first){
        //Guardar referencias a nodos afectados
        let removedNode = this.first;
        let newFirst = this.first.prev;

        //Actualizar referencias del nodo que quedará primero
        newFirst.next = null;

        //actualizar tamaño
        this.size--;
        
        return removedNode.value;
    }
}

Queue.prototype.peek = function peek() {
    if(this.first){
        return this.first.value;
    }

    return false;
}

Queue.prototype.print = function print() {
    
    traverseAndPrint(this.size - 1, this.first);

    function traverseAndPrint(n, node) {
        console.log(node.value);
        if(n==0){
            return;
        }

        traverseAndPrint(--n, node.prev)
    }
}