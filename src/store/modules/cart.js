export default {
    namespaced: true,
    state() {
        return {
            items: [],
            total: 0,
            qty: 0,
        };
    },
    getters: {
        items(state) {
            return state.items;
        },
        total(state) {
            return state.total.toFixed(2);
        },
        count(state) {
            return state.qty;
        },
    },
    mutations: {
        addProductToCart(state, payload) {
            const productData = payload;
            const productInCartIndex = state.items.findIndex(
                (ci) => ci.productId === productData.id
            );

            if (productInCartIndex >= 0) {
                state.items[productInCartIndex].qty++;
            } else {
                const newItem = {
                    productId: productData.id,
                    title: productData.title,
                    image: productData.image,
                    price: productData.price,
                    qty: 1,
                };
                state.items.push(newItem);
            }
            state.total += productData.price;
            state.qty++;
        },
        removeProductFromCart(state, payload) {
            const prodId = payload.prodId;
            const productInCartIndex = state.items.findIndex(
                (ci) => ci.productId === prodId
            );
            const prodData = state.items[productInCartIndex];
            state.items.splice(productInCartIndex, 1);
            state.qty -= prodData.qty;
            state.total -= prodData.price * prodData.qty;
        },
    },
    actions: {
        addToCart(context, payload) {
            const prodId = payload.prodId;
            const products = context.rootGetters['products/products'];
            const product = products.find((prod) => prod.id === prodId);
            context.commit('addProductToCart', product);
        },
        removeFromCart(context, payload) {
            context.commit('removeProductFromCart', payload);
        },
    },
};
