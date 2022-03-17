import authorizedRequest from '../../service/api-service/authorizedRequest';

class SearchApi {
  searchWithKeyWord = keyword => {
    const body = {
      searchKeyWord: keyword,
      size: 50,
      sort: '',
      searchType: '',
    };
    return authorizedRequest.post('search/v1/searchWithKeyWord', body);
  };

  advancedSearch = (params, category) => {
    const body = {
      size: 50,
      params: params,
      area: '',
      category: category,
      year: '',
      subtitles: '',
      order: 'up',
    };
    return authorizedRequest.post('search/v1/search', body);
  };

  searchLeaderBoard = () => {
    return authorizedRequest.get('search/v1/searchLeaderboard');
  };

  searchConfig = () => {
    return authorizedRequest.get('search/list');
  };

  topSearchKeywords = keyword => {
    const body = {
      searchKeyWord: keyword,
      size: 10,
    };
    return authorizedRequest.post('search/searchLenovo', body);
  };
}

export default new SearchApi();
