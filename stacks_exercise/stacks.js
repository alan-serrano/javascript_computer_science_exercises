function Node(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
}

function Stack() {
    this.last = null;
    this.first = null;
    this.size = 0;
}

Stack.prototype.push = function push(value) {
    this.size++;

    if(!this.last){
        this.last = new Node(value);
        this.first = this.last;
        return this.size;
    }


    {
        //Crear nuevo nodo y referencia al nodo afectado
        let newFirstNode = new Node(value);
        let oldFirstNode = this.first;

        //Actualizar referencias para el nuevo nodo
        this.first = newFirstNode;
        newFirstNode.prev = oldFirstNode;

        //Actualizar referencias para el anterior nodo primero
        oldFirstNode.next = newFirstNode;

        return this.size;
    }
}

Stack.prototype.pop = function pop() {
    //Guardar el valor del nodo eliminado

    if(this.size == 1){
        let removedValue = this.first.value;
        this.last = null;
        this.first = null;
        this.size = 0;
        return removedValue;
    }else if(this.last){
        //Crear referencias a nodos afectados
        let removedNode = this.first;
        let newFirstNode = this.first.prev;

        //Actualizando referencias;
        newFirstNode.next = null;
        this.size--;
        return removedNode.value;

    }
}

Stack.prototype.peek = function peek() {
    return this.first.value;
}

Stack.prototype.print = function print() {
    
    traverseAndPrint(this.size - 1, this.first);

    function traverseAndPrint(n, node) {
        console.log(node.value);
        if(n==0){
            return;
        }

        traverseAndPrint(--n, node.prev)
    }
}