(function(self) {
    'use strict';
    var canvas, context, wid, hei, draw, init, resized;
    var jdx, idx, frame, arr, somethingest, runThrough;

    draw = function() {
        var bW, i, tmp;

        if(resized) {
            canvas.width = wid;
            canvas.height = hei;

            resized = false;
        }

        bW = wid / arr.length;

        context.fillStyle = '#333343';
        context.fillRect(0, 0, wid, hei);

        for(i = arr.length; i --; ) {
            context.fillStyle = runThrough % 3 === 1 ? (i === idx ? '#7777ff' : '#777777') : i === idx ? '#77ff77' : i === jdx ? '#ff7777' : '#eeeeff';
            context.fillRect(bW * i, arr[i] * hei, bW, (1 - arr[i]) * hei);
        }

        if(frame = !frame) {
            if(runThrough % 3 === 0) {
                if(somethingest < 0 || arr[jdx] < arr[somethingest]) somethingest = jdx;
            } else if(runThrough % 3 === 1) {
                arr[idx] = Math.random() * 0.7 + 0.2;
                jdx = arr.length; // Ok this was a last minute idea
            } else if(runThrough % 3 === 2) {
                if(somethingest < 0 || arr[jdx] > arr[somethingest]) somethingest = jdx;
            }

            ++ jdx;
            if(jdx >= arr.length) {
                tmp = arr[somethingest];
                arr[somethingest] = arr[idx];
                arr[idx] = tmp;

                somethingest = -1;

                jdx = ++idx;
            }

            if(idx >= arr.length) {
                runThrough ++;
                idx = jdx = 0;
            }
        }

        requestAnimationFrame(draw);
    };

    init = function() {
        arr = Array.from({
            'length': 24
        }, function() {
            return Math.random() * 0.7 + 0.2;
        });

        jdx = 0;
        idx = 0;

        wid = self.innerWidth;
        hei = self.innerHeight;

        resized = true;

        somethingest = -1;
        runThrough = 0;

        draw();
    };

    self.addEventListener('DOMContentLoaded', function() {
        canvas = document.querySelector('canvas');
        context = canvas.getContext('2d', { 'alpha': false });

        init();
    });

    self.addEventListener('resize', function() {
        wid = self.innerWidth;
        hei = self.innerHeight;

        resized = true;
    });
})(this);