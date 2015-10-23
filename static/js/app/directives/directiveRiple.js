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