function Node(val) {
    this.val = val;
    this.left = null;
    this.right = null;
}

function BinarySearchTree() {
    this.root = null;
}

BinarySearchTree.prototype.insertIteratively = function insertIteratively(val) {
    if(!this.root){
        this.root = new Node(val);
        return this;
    }
    let inserted;
    let node = this.root;

    while (!inserted) {

        if(val <= node.val){

            if(node.left === null){
                inserted = true;
                node.left = new Node(val);

            }else{
                node = node.left;
            }

        }else if(val > node.val){

            if(node.right == null){
                inserted = true;
                node.right = new Node(val);
            }else{
                node = node.right;
            }

        }
    }

    return this;
}

BinarySearchTree.prototype.insertRecursively = function insertRecursively(val) {
    if(!this.root){
        this.root = new Node(val);
        return this;
    }
    
    let tree = this;
    return insert(this.root);

    function insert(node) {

        if(val <= node.val){

            if(node.left === null){
                node.left = new Node(val);
                return tree;
            }
            
            return insert(node.left);
            

        }else if(val > node.val){

            if(node.right === null){
                node.right = new Node(val);
                return tree;
            }

            return insert(node.right);

        }
    }
}

BinarySearchTree.prototype.findIteratively = function findIteratively(val) {
    if(!this.root){
        return;
    }

    let node = this.root;

    while (node !== null) {

        if(val == node.val) return node;
        
        if(val < node.val)  node = node.left;
        
        if(val > node.val)  node = node.right;

    }

}

BinarySearchTree.prototype.findRecursively = function findRecursively(val) {
    if(!this.root){
        return;
    }
    
    return find(this.root);

    function find(node) {
        //Base case
        if(node === null)    return;        

        if(val == node.val) return node;

        if(val < node.val)  return find(node.left);

        if(val > node.val)  return find(node.right);
        
    }
}

BinarySearchTree.prototype.toArray = function toArray() {
    return BinarySearchTree.prototype.DFSInOrder.call(this);
}

BinarySearchTree.prototype.DFSPreOrder = function DFSPreOrder() {
    var arr = [];
    if(!this.root){
        return;
    }
    DFSPreOrder(this.root);
    return arr;

    function DFSPreOrder(node) {
        if (node === null) return;
        //Guardar valor de nodo actual
        arr.push(node.val);

        //Captar valor de hijo izquierdo
        DFSPreOrder(node.left);


        //Guardar valor de hijo derecho
        DFSPreOrder(node.right);
    }
}

BinarySearchTree.prototype.DFSInOrder = function DFSInOrder() {
    var arr = [];
    if(!this.root){
        return;
    }
    DFSInOrder(this.root);
    return arr;

    function DFSInOrder(node) {
        if(node === null) return;

        //Captar valor de hijo izquierdo
        DFSInOrder(node.left);

        //Guardar valor de nodo actual
        arr.push(node.val);

        //Guardar valor de hijo derecho
        DFSInOrder(node.right);
    }
}

BinarySearchTree.prototype.DFSPostOrder = function DFSPostOrder() {
    var arr = [];
    if(!this.root){
        return;
    }
    DFSPostOrder(this.root);
    return arr;

    function DFSPostOrder(node) {
        if(node === null) return;
        //Captar valor de hijo izquierdo
        DFSPostOrder(node.left);
        
        
        //Guardar valor de hijo derecho
        DFSPostOrder(node.right);

        
        //Guardar valor de nodo actual
        arr.push(node.val);
    }
}

BinarySearchTree.prototype.breadthFirstSearch = function breadthFirstSearch() {
    var arr = [];
    var queue = [this.root];

    //recursivo----------------------------------

    // breadthFirstSearch();
    
    // function breadthFirstSearch() {
    //     //Base case
    //     if(queue.length == 0) return;

    //     let dequeueNode = queue.pop();

    //     arr.push(dequeueNode.val);

    //     if(dequeueNode.left !== null) queue.unshift(dequeueNode.left);
    //     if(dequeueNode.right !== null) queue.unshift(dequeueNode.right);

    //     breadthFirstSearch();

    // }

    //recursivo--------------------------------------


    // ---------------------iterativo
    while(queue.length !== 0){
        
        let dequeueNode = queue.pop();

        arr.push(dequeueNode.val);

        if(dequeueNode.left !== null) queue.unshift(dequeueNode.left);
        if(dequeueNode.right !== null) queue.unshift(dequeueNode.right);
    }

    //-----------------------------------------

    return arr;
}

BinarySearchTree.prototype.remove = function remove(val) {
    var left;
    var right;

    remove(this, this.root, "root");
    

    function remove(parentRemovedNode, removedNode, accessRemovedNode) {
        if (removedNode.val == val) {

            //Cuando el nodo no tiene hijos no existe sucesor
            if (removedNode.left == null && removedNode.right == null) {
                parentRemovedNode[accessRemovedNode] = null;
            }

            //Cuando el nodo tiene dos hijos, izquierda y derecha
            if (removedNode.left && removedNode.right) {

                let successor = successorLeftandRight(removedNode, removedNode.right, "right");

                // Reemplazando la referencia del nodo eliminado con el sucesor
                parentRemovedNode[accessRemovedNode] = successor.node;

                //Actualizando referencias del nodo sucesor
                successor.node.left = removedNode.left;
                successor.node.right = removedNode.right;

                //Quitando la referencia del padre del nodo sucesor
                successor.parent[successor.accessSuccessor] = null;
            }

            //Cuando el nodo tiene un hijo
            
            if (removedNode.left !== null) {
                parentRemovedNode[accessRemovedNode] = removedNode.left;
            }

            if(removedNode.right !== null){
                parentRemovedNode[accessRemovedNode] = removedNode.right;
            }

        }

        if (val > removedNode.val) {
            right = true;
            left = false;

            return remove(removedNode, removedNode.right, "right");
        }

        if (val < removedNode.val) {
            right = false;
            left = true;

            return remove(removedNode, removedNode.left, "left");
        }
    }

    //Función para hallar el sucesor en caso de que el nodo a eliminar contenga tanto el nodo izquierdo, como el nodo derecho
    function successorLeftandRight(parentSuccessor, successor, accessSuccessor) {
        if(successor.left === null){
            return {
                node: successor,
                parent: parentSuccessor,
                access: accessSuccessor
            }
        }

        return successorLeftandRight(successor, successor.left, "left");
    }


}