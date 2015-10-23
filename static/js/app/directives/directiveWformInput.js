angular
    .module('application.directives')
    .directive('wformInput', function () {
        return {
            restrict: 'E',
            scope: {
                label: '@',
                type: '@'
            },
            template: '<div class="wform__input-wrap">' +
            '<input class="wform__input" type="{{type}}" required>' +
            '<span class="wform__input-highlight"></span>' +
            '<span class="wform__input-bar"></span>' +
            '<label class="wform__label">{{label}}</label>' +
            '</div>',
            link: function ($scope, $element, $attrs, ctrl) {
                $element.find('.wform__input').on('focus', animateInputTo)
                    .on('focusout',animateInputFrom);
            },
        };

        function animateInputTo(e) {

            var tm = new TimelineMax();
            var $this = $(this);
            var $thisParent = $this.parent('.wform__input-wrap');
            var $label = $thisParent.find('.wform__label');

            $label.addClass('animated');

        };
        function animateInputFrom(e) {

            var tm = new TimelineMax();
            var $this = $(this);
            var $thisParent = $this.parent('.wform__input-wrap');
            var $label = $thisParent.find('.wform__label');
            if(!$this.val()) {
                $label.removeClass('animated');
            }
        }
    });
