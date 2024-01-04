import {$authHost, $host} from "./index";


export const addBasket = async (id, basketId) => {
    const {data} = await $authHost.post('api/basket/' + id, basketId)
    return data;
}
export const deleteBasket = async (id, basketId) => {
    const {data} = await $authHost.post('api/basket/delete/' + id, basketId)
    return data;
}
export const getAll = async (basketId) => {
    const {data} = await $authHost.get('api/basket/getAll', { params: { basketId } })
    return data;
}
export const getOne = async (id, basketId) => {
    const { data } = await $authHost.get(`api/basket/getOne/${id}`, { params: { basketId } });
    return data;
}
