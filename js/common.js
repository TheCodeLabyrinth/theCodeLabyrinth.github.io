(function(self) {
    'use strict';
    var prescroll, h;

    self.addEventListener('scroll', function(evt) {
        self.document.body.classList[
            (self.scrollY > self.innerHeight * (self.scrollY - prescroll < 0 ? 0.01 : 0.05)) ? 'add' : 'remove'
        ]('scrolled');
        h.style.height = Math.max(self.innerHeight * 0.2 - Math.max(self.scrollY, 0), self.innerHeight * 0.1) + 'px';
    });

    self.addEventListener('DOMContentLoaded', function() {
        var header = function(id) {
            var header = document.createElement('embed');

            header.id = id;
            header.src = 'html/' + id + '.html';

            document.body.appendChild(header);

            return header;
        };

        h = header('header');
        header('footer');

        prescroll = self.scrollY;
    });
})(this);