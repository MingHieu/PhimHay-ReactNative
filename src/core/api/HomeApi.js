import authorizedRequest from '../../service/api-service/authorizedRequest';

class HomeApi {
  getHome = page => {
    const queryParams = {
      page,
    };
    return authorizedRequest.get('homePage/getHome', {}, queryParams);
  };
}

export default new HomeApi();
