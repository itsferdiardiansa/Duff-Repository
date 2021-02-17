/* eslint-disable */
import http from '@service/http';

export default {
  login: params => {
    return http.request({
      url: '/login',
      method: 'POST',
      data: params,
    });
    // return new Promise((resolve) => {
    //   return resolve({
    //     data: {
    //       "message": "Success Login",
    //       "result": {
    //           "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InFhQGxva2V0LmNvbSIsImV4cCI6MTYxNDA5Nzk5MSwiaWF0IjoxNjE0MDU0NzkxfQ.9hrDnK47NYid-mxCnntOB1hxtd7JlWEdMkif8uYSvd0"
    //       }
    //     }
    //   })
    // })
  },
};
