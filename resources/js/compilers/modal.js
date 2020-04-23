(function() {
  if (process.env.NODE_ENV == "development") {
    up.log.enable();
  }

  up.modal.config.closable = false;
}.call(this));
