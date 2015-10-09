angular
    .module('application.directives', [])
    .directive('modalLink', function () {
        return {
            restrict: 'A',
            transclude: false,
            link: function ($scope, $element, $attrs, ctrl) {
                $element.bind('click', openModal);
            },
            replace: false
        };

        function openModal() {

            var tm = new TimelineMax();
            var $this = $(this);
            var modalId = $this.attr('modal-link');
            var modal = $(modalId);
            var modalWindow = modal.find('.modal__wrap');
            var modalWindowMargin = {};

            console.log(modalWindow);
            modal.css({'display': 'block'});
            madalWindowMargin = countMargin(modalWindow);

            tm.fromTo(modalWindow, 0.45,
                {
                    marginLeft: -madalWindowMargin.marginLeft,
                    marginTop: -madalWindowMargin.marginTop,
                    opacity: 0, top: '0', left: '50%'
                }, {
                    top: '50%',
                    opacity: 1,
                    ease: Power1.easeOut
                })
        }

        function countMargin(element) {

            var el = element[0],
                elMarginLeft = el.clientWidth / 2,
                elMarginTop = el.clientHeight / 2;

            return {
                marginLeft: elMarginLeft,
                marginTop: elMarginTop,
            }
        }
    })
    .directive('modalWindow', function () {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                title: '@'
            },
            template: '<div class="modal">' +
            '<div class="modal__layout" ng-click="closeModal($event)"></div>' +
            '<div class="modal__wrap">' +
             '<div class="modal__title">{{title}}</div>' +
            '<div class="modal__close" ng-click="closeModal($event)">' +
             '<div class="modal__close-hover"></div>' +
            '<i class="material-icons modal__close-icon">close</i>' +
            '</div>' +
            '<div class="modal__inner" ng-transclude></div>' +
            '</div>' +
            '</div>',
            controller: ['$scope', function ($scope) {
                $scope.closeModal = function (e) {

                    var modal = $('.modal'),
                        modalWindow = modal.find('.modal__wrap');

                    TweenMax.to(modalWindow, 0.35, {top: '0', opacity: 0});

                    TweenMax.to(modal, 0.35, {
                        opacity: 0, onComplete: (function () {
                            modal.css({'display': 'none', 'opacity': 1});
                        })
                    })
                }
            }],
            replace: true
        };

    })
    .directive('mdRiple', function () {
        return {
            restrict: 'A',
            link: function ($scope, $element, $attrs, ctrl) {
                $element.bind('click', animationRiple);
            }
        }
        function animationRiple(e) {
            var $this = $(this);

            var $offset = $this.offset();
            var height = $this.height();
            var width = $this.width();
            var $tm = new TimelineMax();

            var x = e.pageX - $offset.left;
            var y = e.pageY - $offset.top;

            var $circle = $('<div class="riple"></div>');
            //var $circleCss = ({
            //    position: 'absolute',
            //    top: y + 'px',
            //    left: x + 'px',
            //    opacity: '0',
            //    width: '0',
            //    height: '0',
            //    borderRadius: "50%",
            //    marginLeft: '-50%',
            //    marginTop: '-50%',
            //    backgroundColor: 'red'
            //});

            //$circle.css($circleCss);
            $this.append($circle)

            $tm.to($circle, 0.11, {width: width*1,height: height*1, opacity:0.5})
                .to($circle, 0.33, {width: width*4,height: height*4, opacity:0})
        }
    });