export default class ScrollObserver {
    constructor (element = null, animationIn = null, animationOut = null, options = {}) {
        if(typeof element === 'string') {
            this.element = document.querySelectorAll(element)
        } else {
            this.element = element
        }
        this.animationIn = animationIn
        this.animationOut = animationOut
        this.options = options // 1.0 - (100% element scroll) 0.9 - 90%(100% element scroll)

        this.createObserver()
        this.$subscribe()
    }

    createObserver () {

        this.observer = new window.IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if(this.animationIn !== null) {
                        this.animationIn(entry.target)
                        this.observer.unobserve(entry.target)
                    }
                } else {
                    if(this.animationOut !== null) {
                        this.animationOut(entry.target)
                    }
                }
            })
        }, this.options)
        
    }

    $subscribe () {
        if(this.element instanceof NodeList) {
            this.element.forEach(el => {
                this.observer.observe(el)
            })
        } else if(this.element instanceof Array) {
            Array.from(this.element).forEach(el => {
                this.observer.observe(el)
            })
        }
        else {
            this.observer.observe(this.element)
        }
    }

    $unsubscribe () {}
    
}

// * DOC 
// import ScrollObserver from './classes/ScrollObserver.js'
// new ScrollObserver(this.scrollIsViewElements, this.isView, null, options)