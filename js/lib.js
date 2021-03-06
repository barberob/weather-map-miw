"use strict"


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


/**************************************************** AJAX */


const getParams = (object) => {
    let result = []
    for(var i in object) {
        result.push(i + "=" + encodeURIComponent(object[i]))
    }
    return result.join('&')
}
