(function(self) {
    'use strict';
    self.addEventListener('DOMContentLoaded', function() {
        var button;
        button = document.querySelector('.button');
        button.addEventListener('mousedown', function(e) { e.preventDefault(); });
        button.addEventListener('mouseup', function(e) { e.preventDefault(); });
        button.addEventListener('click', function(e) {
            e.preventDefault();
            document.body.classList.toggle('brokenShow');
        });
    });
})(this);