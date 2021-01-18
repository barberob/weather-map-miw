/***************************************************FUNCTIONS*********************************************** */
"use strict"
let lib_params = {
    experimental : false
}

/**
 * check if element is a "pure" object
 * @param {obj} element - element to check
 * @returns {Boolean}
 */
let isObject = (element) => {
    var type = typeof obj
    return type === 'function' || type === 'object' && !!obj && Object.prototype.toString.call(obj) !== '[object Array]'
}

/**
 * check if item is or "is like" a number 
 * @param {String, Int} item
 * @returns {Boolean}
 */
let isNumber = (item) => {
    return /^[+-]?((\d*\.?\d+)|(\d+\.?\d*))$/.test(item)
}

/**
 * check if item is or "is like" a positive integer 
 * @param {String, Int} item
 * @returns {Boolean}
 */
let isPosInt = (item) => {
    return /^[+]?\d+$/.test(str)
}

/**
 * count how many c in str
 * @param {String} c - what to search for
 * @param {String} ch - where to search
 * @returns {Int}
 */
let count = (char, str) => {
    return str.split(char).length - 1
}

/**
 * @param {Number} min 
 * @param {Number} max 
 * @returns {Number}
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}


/**
 * cross browser XHR
 * @returns {XMLHttpRequest} obj
 */
function Xhr(){  // création d'un requêteHTTP en fonction du navigateur
    let obj = null
    try { 
        obj = new ActiveXObject("Microsoft.XMLHTTP");
    } catch(Error) {
        try { 
            obj = new ActiveXObject("MSXML2.XMLHTTP");
        } catch(Error) {
            try { 
                obj = new XMLHttpRequest();
            } catch(Error) {
                console.error(' Impossible de créer l\'objet XMLHttpRequest')
            }
        }
    }
    return obj
}


/**
 * 
 * @param {String} target - ajax target url / file
 * @callback callback - function to call when ajax done
 */
function ajax(target, callback){
    let req =  Xhr()
    req.onreadystatechange = function() {
        if (this.readyState == this.DONE) {
            callback(req)
        }
    }
    req.open("GET", target, true)
    req.send(null)
}        

/*********************************************OBJECT****************************************************************/

/**
 * /!\ EXPERIMENTAL
 * just a foreach but for objects and strings /!\ reversed key value for arrays and strings
 * @callback callback
 */

if (lib_params.experimental) {

    Object.prototype.each = function(callback) {
        let index = 0
        for(const [key, value] of Object.entries(this)) {
            callback(key,value, index)
            index++
        }
    }
}



/************************************************STRING*************************************************************/
/**
 * camelise a string
 * @returns {String}
 */
String.prototype.toCamelCase = function() {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase()
}


/***************************************************NODE **********************************************************/
/**
 * @param {String} element : which Node type to create
 * @param {Object} attributes : attributes to set to the element
 * @param {String} text : textNode to append to the element
 * @param {Node}   parentNode : textNode to append to the element
 * @returns {Node} el
 */
let createEl = (element, attributes, text, parentNode) => {
    let el = document.createElement(element)
    if (attributes) {
        for(const [key, value] of Object.entries(attributes)) {
            el.setAttribute(key,value)
        }
    }
    if(text) el.appendChild(document.createTextNode(text))
    if(parentNode) parentNode.appendChild(el)
    return el
}

/**
 * similar to jQuery $('')
 * @param {String} selector - css selector
 * @returns {Node || Node[]}
 */
let __ = selector => {
    if(!!selector) {
        try {
            let els = document.querySelectorAll(selector); 
            if (els.length === 0) return null;
            if (els.length === 1) return els[0];
            return els;
        } catch {
            console.error('$ ===> selector "' + selector + '" is invalid ');
        }
    }
    console.error('$ ===> empty selector');
    return null;
}

/**
 * appendChild() all Nodes of an array to the Node
 * @param {Array} array 
 */
Node.prototype.appendChildren = function(array) {
    let frag = new DocumentFragment()
    array.forEach(element => frag.appendChild(element))
    this.appendChild(frag)
}

/**
 * apply css rules given in obj
 * @param {Object} obj - css rules (camelCase)
 * @returns {Node}
 */
Node.prototype.css = function(obj) {
    for(let i in obj){
        this.style[i] = obj[i]
    }
    return this
}




/***************************************************NODELIST**********************************************************/

/**
 * apply an event listener to all element of a nodeList
 * @param {String} listener - which event to listen to
 * @param {Function} listenerCallback - which callback function to set to the event listener
 */
NodeList.prototype.listen = function(listener, listenerCallback) {
    this.forEach(el => el.addEventListener(listener, listenerCallback))
}


/*****************************************************ARRAY********************************************************/
/**
 * swap Array[a] and Array[b]
 * @param {Int} a - index 1 
 * @param {Int} b - index 2
 */
Array.prototype.swap = function(a,b) {
    let temp = this[a]
    this[a] = this[b]
    this[b] = temp
}

/**
 * merge two Arrays
 * @param {Array} array 
 * @returns {Array}
 */
Array.prototype.merge = function(array) { 
    array.forEach((i)=> this.push(array[i]))
    return this
}

/**************************************************** AJAX */


const getParams = () => {
    let result = []
    for(var i in objet) {
        result.push(i + "=" + encodeURIComponent(objet[i]))
        return result.join('&')
    }
}