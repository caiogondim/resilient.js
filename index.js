var Resilient = (function() {
  'use strict';

  function Resilient(args) {
    // enforces new
    if (!(this instanceof Resilient)) {
      return new Resilient(args);
    }

    // Properties
    // ----------

    this.mutationObserver;
    this.eventCallbacks = {};
  }

  Resilient.prototype.init = function(event) {
    this.mutationObserver = new MutationObserver(this.handleMutationEvent.bind(this));
    this.mutationObserver.observe(document.body, {
      childList: true
    });
    this.mutationObserver.observe(document.head, {
      childList: true
    });

    return this;
  };

  // Event emmiter
  // -------------

  Resilient.prototype.on = function(event, modules, callback) {
    var self = this;

    modules.forEach(function(module) {
      if (!self.eventCallbacks[event]) {
        self.eventCallbacks[event] = [];
      }
      if (!self.eventCallbacks[event][module]) {
        self.eventCallbacks[event][module] = [];
      }

      self.eventCallbacks[event][module].push(callback);
    });

    return this;
  };

  Resilient.prototype.off = function(event, modules) {
    try {
      if (modules) {
        delete this.eventCallbacks[event][modules];
      } else {
        delete this.eventCallbacks[event];
      }
    } catch (err) {

    }

    return this;
  };

  Resilient.prototype.trigger = function(event, module) {
    if (this.eventCallbacks[event] === {}) {
      return;
    }

    if (this.eventCallbacks[event][module]) {
      this.eventCallbacks[event][module].forEach(function(callback) {
        callback(module);
      })
    }
    this.eventCallbacks[event]['*'].forEach(function(callback) {
      callback(module);
    })

    return this;
  }

  // Event handlers
  // --------------

  Resilient.prototype.handleMutationEvent = function(mutations) {
    var self = this;

    mutations.forEach(function(mutation) {
      Array.prototype.forEach.call(mutation.addedNodes, function(addedNode) {
        if (addedNode.nodeName === 'SCRIPT') {
          addedNode.addEventListener('load', handleScriptLoadEvent.bind(self))
          addedNode.addEventListener('error', handleScriptErrorEvent.bind(self))
        }
      })
    });
  };

  function handleScriptLoadEvent(ev) {
    if (ev.target.dataset.module) {
      this.trigger('load', ev.target.dataset.module);
    }
  }

  function handleScriptErrorEvent(ev) {
    if (ev.target.dataset.module) {
      this.trigger('error', ev.target.dataset.module);
    }

    var newScript = document.createElement('script');
    newScript.src = ev.target.dataset.altSrc;
    newScript.dataset.module = ev.target.dataset.module;
    document.body.appendChild(newScript);
    ev.target.parentNode.removeChild(ev.target);
  }

  return Resilient;

}());
