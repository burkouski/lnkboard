angular.module('application.directives')
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

    });

