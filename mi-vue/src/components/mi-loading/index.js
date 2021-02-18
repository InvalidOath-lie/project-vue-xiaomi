import Vue from 'vue';

let MiLoadingConstructor = Vue.extend(require("./loading.vue").default);
let loadingInstance =null;

export default{
        show(){
                if( loadingInstance ) return;
                loadingInstance = new MiLoadingConstructor().$mount();
                document.body.appendChild(loadingInstance.$el)
        },
        close(){
                if(!loadingInstance) return;
                loadingInstance.$destroy();
                loadingInstance.$el.parentNode.removeChild(loadingInstance.$el);
                loadingInstance = null;
        }
}










