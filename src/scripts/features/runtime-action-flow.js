(function(windowObj){
  'use strict';

  if(!windowObj){
    return;
  }
  windowObj.AC_FEATURES = windowObj.AC_FEATURES || {};

  function createRuntimeActionFlow(ctx = {}){
    const doc = ctx.document || windowObj.document;
    const getActionDispatcher = (typeof ctx.getActionDispatcher === 'function')
      ? ctx.getActionDispatcher
      : (() => null);
    let bound = false;

    function bindDocumentClick(){
      if(bound || !doc){
        return false;
      }
      doc.addEventListener('click', (event) => {
        const actionEl = event?.target?.closest?.('[data-action]');
        if(!actionEl){
          return;
        }
        const dispatcher = getActionDispatcher();
        if(!dispatcher || typeof dispatcher.handleAction !== 'function'){
          return;
        }
        dispatcher.handleAction(actionEl);
      });
      bound = true;
      return true;
    }

    return Object.freeze({
      bindDocumentClick
    });
  }

  windowObj.AC_FEATURES.runtimeActionFlow = Object.freeze({
    create: createRuntimeActionFlow
  });
})(window);
