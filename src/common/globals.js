const CatalogAPI = 'http://su.leisurify.eu:8080/api';
const OrderAPI = 'http://ngsuveülikool2018shoppinglistapi.azurewebsites.net/api';

const API = {
    smoothies: `${CatalogAPI}/smoothies`,
    components: `${CatalogAPI}/components`,
    componentsSearch: `${CatalogAPI}/components/search`,
    order: `${OrderAPI}/order`,
    shoppingList: `${OrderAPI}/shoppingList`,
    product: `${OrderAPI}/product`,
};

export default API;