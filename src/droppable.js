import Common from './common';

export default {
    mounted(el, binding, vnode) {
        function isDropAllowed() {
            const dropTargetNamespace = Common.getNamespace(binding);
            const { namespace } = Common.transferredData[Common.dragInProgressKey];
            return !namespace || !dropTargetNamespace || namespace === dropTargetNamespace;
        }

        el.addEventListener('dragenter', function(event){
            event.preventDefault();

            if (vnode.props.onDragEnter) {
                const { dragData } = Common.transferredData[Common.dragInProgressKey];
                vnode.props.onDragEnter(dragData, isDropAllowed(), event);
            }
        }, false);


        el.addEventListener('dragover', function(event){
            const { dragData } = Common.transferredData[Common.dragInProgressKey];
            const dropAllowed = isDropAllowed();

            if (dropAllowed) {
                event.preventDefault(); // required to allow dropping
            }

            if (vnode.props.onDragOver) {
                vnode.props.onDragOver(dragData, dropAllowed, event);
            }
        }, false);


        el.addEventListener('dragleave', function(event){
            event.preventDefault();

            if (vnode.props.onDragLeave) {
                const { dragData } = Common.transferredData[Common.dragInProgressKey];
                vnode.props.onDragLeave(dragData, isDropAllowed(), event);
            }
        }, false);


        el.addEventListener('drop', function(event){
            event.stopPropagation();
            event.preventDefault();

            const transferKey = event.dataTransfer.getData('text');
            const { dragData } = Common.transferredData[transferKey];

            Common.transferredData[transferKey].onDropCallback = function(){
                if (vnode.props.onDragLeave) {
                    vnode.props.onDragLeave(dragData, true, event);
                }
                if (vnode.props.onDragDrop) {
                    vnode.props.onDragDrop(dragData, true, event);
                }
            };
        }, false);
    }
};
