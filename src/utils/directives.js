import Vue from 'vue';

Vue.directive('dialogDrag',{
    bind(el,binding,vnode,oldVnode){
        // 返回el中第一个匹配的元素
        const dialogHeaderEl = el.querySelector('.el-dialog__header');
        const dragDom = el.querySelector(".el-dialog");

        dialogHeaderEl.style.cssText += ';cursor:move;';
        dragDom.style.cssText += ';top:0px;';

        // 获取原有属性
        const sty = (() => {
            if(window.document.currentStyle){
                return (dom,attr) => dom.currentStyle[attr];
            }else{
                return (dom,attr) => getComputedStyle(dom,false)[attr];
            }
        })();

        dialogHeaderEl.onmousedown = (e) => {
            const disX = e.clientX - dialogHeaderEl.offsetLeft;
            const disY = e.clientY - dialogHeaderEl.offsetTop;

            const screenWidth = document.body.clientWidth;
            const screenHeight = document.documentElement.clientHeight;

            const dragDomWidth = dragDom.offsetWidth;
            const dragDomheight = dragDom.offsetHeight;

            const minDragDomLeft = dragDom.offsetLeft; // 离 document 的左边距离
            const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth; // 屏幕宽度 - 离document 的左边距离 - 对话框宽度

            const minDragDomTop = dragDom.offsetTop; // 离 document 的顶部距离
            const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomheight;

            // 获取到的值带px 正则匹配替换
      let styL = sty(dragDom, "left");
      let styT = sty(dragDom, "top");

      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
      if (styL.includes("%")) {
        styL = +document.body.clientWidth * (+styL.replace(/\%/g, "") / 100);
        styT = +document.body.clientHeight * (+styT.replace(/\%/g, "") / 100);
      } else {
        styL = +styL.replace(/\px/g, "");
        styT = +styT.replace(/\px/g, "");
      }

      document.onmousemove = function (e) {
        // 通过事件委托，计算移动的距离
        let left = e.clientX - disX;
        let top = e.clientY - disY;

        // 边界处理
        if (-left > minDragDomLeft) {
          left = -minDragDomLeft;
        } else if (left > maxDragDomLeft) {
          left = maxDragDomLeft;
        }

        if (-top > minDragDomTop) {
          top = -minDragDomTop;
        } else if (top > maxDragDomTop) {
          top = maxDragDomTop;
        }

        // 移动当前元素
        dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`;
      };

      document.onmouseup = function (e) {
        document.onmousemove = null;
        document.onmouseup = null;
      };
        }
    }
})