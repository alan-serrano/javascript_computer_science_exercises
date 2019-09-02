function Node(val){
    this.val = val;
    this.next = null;
}

function SinglyLinkedList(){
    this.head = null;
    this.tail = null;
    this.length = 0;
}

SinglyLinkedList.prototype.push = function push(val) {

        this.length++;

        if (!this.head) {
            this.head = new Node(val);
            this.tail = this.head;
        } else {
            // this.tail = addNode(this.head);
            this.tail.next = new Node(val);
            this.tail = this.tail.next;
        }


        return this;
}

SinglyLinkedList.prototype.pop = function pop() {
    var valDeleted;

    if(this.length == 1){
        
        valDeleted = this.head.val;
        this.head = null;
        this.tail = null;
        this.length--;

    }
    else if(this.head){
        this.length--;
        this.tail = removeLastNode(this.head, this.head.next);
    }

    function removeLastNode(objParent, objChildren) {

        if(objChildren.next == null){
            valDeleted = objChildren.val;
            objParent.next = null;
            return objParent;
        }

        return removeLastNode(objChildren, objChildren.next);
    }

    return valDeleted;
}

SinglyLinkedList.prototype.unshift = function unshift(val) {

    //Guarda el primer Objeto
    var auxObj = this.head;

    //Reemplaza el primer objeto con uno nuevo
    this.head = new Node(val);

    //Asigna una referencia al auxObj
    this.head.next = auxObj;

    //Aumenta el tamaño en 1
    this.length++;

    return this;
}

SinglyLinkedList.prototype.shift = function shift() {
    if (this.head) {
        //Guarda el valor del primer elemento
        var firstVal = this.head.val

        //Reemplaza la referencia del primer elemento con el de segundo elemento

        this.head = this.head.next;

        //Disminuye el tamaño
        this.length--;

        return firstVal;
    }
}

SinglyLinkedList.prototype.set = function set(i, val) {

    //Si se busca un índice que no existe, retorna falso
    if(i > this.length - 1 || i < 0) return false;
    
    //Llamada de función
    return wrapper(i, this.head);
    

    //Wrapper scope helper
    function wrapper(i, obj) {

        //Cuando llegue a la posición indicada (i), cambia el valor del objeto
        if(i == 0){
            obj.val = val;
            return true;
        }
    
        return wrapper(--i, obj.next);
    }

}

SinglyLinkedList.prototype.get = function get(i) {
    //Si se busca un índice que no existe, retorna null
    if (i > this.length - 1 || i < 0) return null;

    //Llamada de función
    return wrapper(i, this.head);

    //Wrapper scope helper
    function wrapper(i, obj) {
        //Cuando llegua a la posición indicada (i), obtiene el valor del objeto
        if (i == 0) {
            return obj.val;
        }

        //Llamada recursiva
        return wrapper(--i, obj.next);
    }
}

SinglyLinkedList.prototype.insert = function insert(i, val) {
    //Si se ingresa un valor no válido retorna falso
    if (i > this.length || i < 0 || typeof i != "number") return false;

    //Si la posición es la primera, llama al método unshift
    if (i == 0) return SinglyLinkedList.prototype.unshift.call(this, val);

    //Si la posición es la final, llama al método push
    if(i == this.length) return SinglyLinkedList.prototype.push.call(this,val);

    //Guardar referencia al objeto mismo
    var llist = this;

    //En cualquier otro caso inserta y reubica el objeto
    wrapper(i, this.head, this.head.next)

    function wrapper(i, parent, children) {
        // Valor auxiliar para guardar temporalmente el objeto children
        var auxObj;
        // Al llegar al valor indicado
        if(i == 1){
            auxObj = children;
            llist.length++;
            parent.next = new Node(val);
            parent.next.next = children;
            return true;
        }

        //Si no cumple la condición, llamada recursiva
        return wrapper(--i, children, children.next);
        
    }
}

SinglyLinkedList.prototype.remove = function insert(i) {
    //Si el index no es válido retorna false
    if(i > this.length - 1 || i <0 || typeof i != "number" ) return false;

    //Si es el primer index, llama a shift()
    if(i == 0) return SinglyLinkedList.prototype.shift.call(this);

    //Si es el último index, llama a pop()
    if(i == this.length - 1) return SinglyLinkedList.prototype.pop.call(this);

    //Guarda la referencia al this
    var objPrimary = this;
    return wrapper(this.head, this.head.next, i); 

    //Función recursiva, iterará hasta llegar al índice indicado
    //Y saltará la referencia del índice indicado
    function wrapper(parent, children, n) {
        if(n == 1){
            objPrimary.length--;
            parent.next = children.next;
            return true; 
        }

        return wrapper(children, children.next, --n);
    }
}

SinglyLinkedList.prototype.reverse = function reverse() {
    if(this.length <2) return false;

    var get = getLink.bind(this);
    var j = this.length - 1;

    for (let i = 0; i < this.length/2; i++) {
        let swap1 = get(i);
        let swap2 = get(j - i);

        //Intecambio entre primeros y últimos
        let auxVal = swap1.val;
        swap1.val = swap2.val;
        swap2.val = auxVal;
        
    }

    //Obtiene el objeto del índice indicado
    function getLink(i) {
        //Si se busca un índice que no existe, retorna null
        if (i > this.length - 1 || i < 0) return null;
    
        //Llamada de función
        return wrapper(i, this.head);
    
        //Wrapper scope helper
        function wrapper(i, obj) {
            //Cuando llegua a la posición indicada (i), obtiene el valor del objeto
            if (i == 0) {
                return obj;
            }
    
            //Llamada recursiva
            return wrapper(--i, obj.next);
        }
    }
}