function Node(val){
    this.val = val;
    this.prev = null;
    this.next = null;
}

function DoublyLinkedList(){
    this.head = null;
    this.tail = null;
    this.length = 0;
}

DoublyLinkedList.prototype.push = function push(val) {

    //Si no hay ningún nodo
    if(!this.head){
        //Crea el primer Valor
        this.head = new Node(val);

        //Crea la primer referencia al tail
        this.tail = this.head;

        //Aumenta el tamaño en una unidad
        this.length++;

    } else {
        //Crea un nuevo nodo al final
        this.tail.next = new Node(val);

        //Este nodo guarda una referencia al anterior nodo
        this.tail.next.prev = this.tail;

        //El nodo creado ahora es el tail
        this.tail = this.tail.next;

        //Aumenta el tamaño en 1 unidad;
        this.length++;
    }

    return this;
}

DoublyLinkedList.prototype.pop = function pop() {

    if(this.length == 1){
        let auxVal = this.head.val;

        this.head = null;
        this.tail = null;
        this.length = 0;

        return auxVal;

    } else if (this.head){
        let auxVal = this.tail.val;
        this.tail.prev.next = null;
        this.tail = this.tail.prev;
        this.length--;
        
        return auxVal;

    }
}

DoublyLinkedList.prototype.unshift = function unshift(val) {
    var auxObjRef;
    
    //Si la linked list está vacía
    if(!this.head){
        this.head = new Node(val);
        this.tail = this.head;
        this.length++;
        return this;   
    }
    
    //Guardar referencia a antiguo head
    auxObjRef = this.head;

    //Crear nuevo nodo en el Head
    this.head = new Node(val);

    //Crear referencias
    this.head.next = auxObjRef;
    this.head.next.prev = this.head;

    //Aumentar tamaño
    this.length++;

    return this;
}

DoublyLinkedList.prototype.shift = function shift() {
    if(this.length == 1){
        let auxVal = this.head.val;
        this.head = null;
        this.tail = null;
        this.length = 0;

        return auxVal;
    }
    
    else if(this.head){
        //Guardando la referencia al valor
        let auxVal = this.head.val;

        //Moviendo el head al segundo nodo
        this.head = this.head.next;

        //Quitar la referencia al head que se eliminó
        this.head.prev = null;

        //Disminuir tamaño
        this.length--;

        return auxVal;
    }
}

DoublyLinkedList.prototype.set = function set(i, val) {
    if(i < 0 || !this.head || i>= this.length) return;

    //Elección de función
    let mid = this.length/2;

    if(i>=mid){
        return setInv(this.length - 1 - i, this.tail);
    }

    else{
        return set(i, this.head);
    }
    

    //Para esta función se debe comenzar por el 1er nodo
    //Esta función recorre de izquierda a derecha
    function set(n, node) {
        //base case
        if(n == 0){
            node.val = val;
            return;
        }

        set(--n, node.next);
    }

    //Esta función recorre de derecha a izquierda
    //Para esta función se debe comenzar por el último nodo
    function setInv(n, node) {
        //base case
        if(n == 0){
            node.val = val;
            return;
        }

        set(--n, node.prev);
        
    }
}

DoublyLinkedList.prototype.get = function get(i) {
    if(i < 0 || !this.head || i>= this.length) return null;

    //Elección de función
    let mid = this.length/2;

    if(i>=mid){
        return setInv(this.length - 1 - i, this.tail);
    }

    else{
        return set(i, this.head);
    }
    

    //Para esta función se debe comenzar por el 1er nodo
    //Esta función recorre de izquierda a derecha
    function set(n, node) {
        //base case
        if(n == 0){
            return node.val;
        }

        return set(--n, node.next);
    }

    //Esta función recorre de derecha a izquierda
    //Para esta función se debe comenzar por el último nodo
    function setInv(n, node) {
        //base case
        if(n == 0){
            return node.val;
        }

        return set(--n, node.prev); 
    }
}

DoublyLinkedList.prototype.insert = function set(i,val){
    if(i < 0 || !this.head || i> this.length || typeof i != "number") return;

    if(i == 0) return DoublyLinkedList.prototype.unshift.call(this, val);
    if(i == this.length) return DoublyLinkedList.prototype.push.call(this, val);
    
    //Guardar referencia a la linked list
    var llist = this;
    

    //Elección de función
    let mid = this.length/2;

    if(i>=mid){
        return traverseRightToLeft(this.length - 1 - i, this.tail);
    }

    else{
        return traverseLeftToRight(i, this.head);
    }
    

    //Para esta función se debe comenzar por el 1er nodo
    //Esta función recorre de izquierda a derecha
    function traverseLeftToRight(n, node) {
        //base case
        if(n == 0){
            return insertNode(node);
        }

        return traverseLeftToRight(--n, node.next);
    }

    //Esta función recorre de derecha a izquierda
    //Para esta función se debe comenzar por el último nodo
    function traverseRightToLeft(n, node) {
        //base case
        if(n == 0){
            return insertNode(node);
        }

        return traverseRightToLeft(--n, node.prev);
    }

    //Función que inserta el nuevo nodo y actualiza las referencias correspondientes
    function insertNode(node) {
        //Crear nuevo nodo y guardar las referencias a nodos afectados
        var newNode = new Node(val);
        var parentNode = node.prev;
        var childNode = node;

        //Actualizar referencias del nuevo nodo
        newNode.prev = parentNode;
        newNode.next = childNode;

        //Actualizar referencias del nodo padre
        parentNode.next = newNode;

        //Actualizar referencias del nodo hijo
        childNode.prev = newNode;

        llist.length++;
        
        return;
    }
}

DoublyLinkedList.prototype.remove = function remove(i) {
    if(i < 0 || !this.head || i>= this.length || typeof i != "number") return false;
    if(i == 0) return DoublyLinkedList.prototype.shift.call(this);
    if(i == this.length) return DoublyLinkedList.prototype.pop.call(this);
    
    //Guardar referencia a la linked list
    var llist = this;
    

    //Elección de función
    let mid = this.length/2;

    if(i>=mid){
        return traverseRightToLeft(this.length - 1 - i, this.tail);
    }

    else{
        return traverseLeftToRight(i, this.head);
    }
    

    //Para esta función se debe comenzar por el 1er nodo
    //Esta función recorre de izquierda a derecha
    function traverseLeftToRight(n, node) {
        //base case
        if(n == 0){
            return removeNode(node);
        }

        return traverseLeftToRight(--n, node.next);
    }

    //Esta función recorre de derecha a izquierda
    //Para esta función se debe comenzar por el último nodo
    function traverseRightToLeft(n, node) {
        //base case
        if(n == 0){
            return removeNode(node);
        }

        return traverseRightToLeft(--n, node.prev);
    }

    //Función que inserta el nuevo nodo y actualiza las referencias correspondientes
    function removeNode(node) {
        //guardar las referencias a nodos afectados
        var leftNode = node.prev;
        var removedNode = node;
        var rightNode = node.next;

        //Actualizar referencias del nodo izquierdo
        leftNode.next = rightNode;

        //Actualizar referencias del nodo derecho
        rightNode.prev = leftNode; 

        //Actualizar tamaño del array
        llist.length--;
        
        return removedNode.val;
    }
}

DoublyLinkedList.prototype.reverse = function reverse() {
    var get = getNode.bind(this);
    var swap1;
    var swap2;
    var auxVal;

    for (let i = 0; i < (this.length - 1)/2; i++) {
        //Guardar referencia de nodos afectados
        swap1 = get(i);
        swap2 = get(this.length - 1 -i);

        //Cambiar valores
        auxVal = swap1.val;
        swap1.val = swap2.val;
        swap2.val = auxVal;

    }

    function getNode(i) {
        if (i < 0 || !this.head || i >= this.length) return null;

        //Elección de función
        let mid = this.length / 2;

        if (i >= mid) {
            return traverseRightToleft(this.length - 1 - i, this.tail);
        } else {
            return traverseLeftToRight(i, this.head);
        }


        //Para esta función se debe comenzar por el 1er nodo
        //Esta función recorre de izquierda a derecha
        function traverseLeftToRight(n, node) {
            //base case
            if (n == 0) {
                return node;
            }

            return traverseLeftToRight(--n, node.next);
        }

        //Esta función recorre de derecha a izquierda
        //Para esta función se debe comenzar por el último nodo
        function traverseRightToleft(n, node) {
            //base case
            if (n == 0) {
                return node;
            }

            return traverseRightToleft(--n, node.prev);
        }
    }
}