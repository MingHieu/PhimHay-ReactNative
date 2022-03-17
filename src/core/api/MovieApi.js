import authorizedRequest from '../../service/api-service/authorizedRequest';

class MovieApi {
  getMovieDetail = (id, category) => {
    const queryParams = {
      id,
      category,
    };
    return authorizedRequest.get('movieDrama/get', {}, queryParams);
  };

  getMovieMedia = (category, contentId, episodeId, definition) => {
    const queryParams = {
      category,
      contentId,
      episodeId,
      definition,
    };
    return authorizedRequest.get('media/previewInfo', {}, queryParams);
  };
}

export default new MovieApi();
