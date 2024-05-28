import { get_job_position_service } from '@/app/pages/services/job-title-service';
import { jobPositionSlice } from './job-title-slice';

// export function store_job_position_thunk(data) {
//   return async function (dispatch, getState) {
//     const result = await store_brands_service(data)
//     dispatch(brandsSlice.actions.setBrands(result.data));
//     dispatch(brandsSlice.actions.setBrandsForm({}));
//   };
// }

export function get_job_position_thunk() {
  return async function (dispatch, getState) {
    const result = (await get_job_position_service()).data
    console.log('result',result)
    dispatch(jobPositionSlice.actions.setJobPositions(result));
  };
}

// export function delete_brands_thunk(id) {
//   return async function (dispatch, getState) {
//     const result = await delete_brand_service(id)
//     dispatch(brandsSlice.actions.setBrands(result.data));
//   };
// }

// export function update_brands_thunk(data) {
//   return async function (dispatch, getState) {

//    const result = await update_brand_service(data)
//    dispatch(brandsSlice.actions.setBrands(result.data));
//   };
// }