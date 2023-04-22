/*eslint-disable*/
import axios from 'axios';
import { APIRoutes } from '../../constants/APIRoutes';

const makeOrder = (data) => axios.post(APIRoutes.MAKE_ORDER, data);
export {
    makeOrder,
};
