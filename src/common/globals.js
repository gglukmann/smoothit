const CatalogAPI = '/catalogapi';
const OrderAPI = '/orderapi';

const API = {
    smoothies: `${CatalogAPI}/smoothies`,
    components: `${CatalogAPI}/components`,
    componentsSearch: `${CatalogAPI}/components/search`,
    order: `${OrderAPI}/order`,
    shoppingList: `${OrderAPI}/shoppingList`,
    product: `${OrderAPI}/product`,
};

export default API;