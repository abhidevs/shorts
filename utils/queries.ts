export const allVideosQuery = () => {
  const query = `*[_type == "video"] | order(_createdAt desc){
    _id,
     caption,
       video{
        asset->{
          _id,
          url
        }
      },
      userId,
      postedBy->{
        _id,
        userName,
        image
      },
    likes,
    comments[]{
      text,
      _key,
      postedBy->{
      _id,
      userName,
      image
    },
    }
  }`;

  return query;
};

export const postDetailQuery = (postId: string | string[]) => {
  const query = `*[_type == "video" && _id == '${postId}']{
    _id,
     caption,
       video{
        asset->{
          _id,
          url
        }
      },
      userId,
    postedBy->{
      _id,
      userName,
      image
    },
     likes,
    comments[]{
      comment,
      _key,
      postedBy->{
        _ref,
      _id,
    },
    }
  }`;
  return query;
};

export const searchVideosQuery = (searchTerm: string | string[]) => {
  const query = `*[_type == "video" && caption match '${searchTerm}*' || topic match '${searchTerm}*'] {
    _id,
     caption,
       video{
        asset->{
          _id,
          url
        }
      },
      userId,
    postedBy->{
      _id,
      userName,
      image
    },
likes,
    comments[]{
      comment,
      _key,
      postedBy->{
      _id,
      userName,
      image
    },
    }
  }`;
  return query;
};

export const singleUserQuery = (userId: string | string[]) => {
  const query = `*[_type == "user" && _id == '${userId}']`;

  return query;
};

export const allUsersQuery = () => {
  const query = `*[_type == "user"]`;

  return query;
};

export const userCreatedVideosQuery = (userId: string | string[]) => {
  const query = `*[ _type == 'video' && userId == '${userId}'] | order(_createdAt desc){
    _id,
     caption,
       video{
        asset->{
          _id,
          url
        }
      },
      userId,
    postedBy->{
      _id,
      userName,
      image
    },
 likes,

    comments[]{
      comment,
      _key,
      postedBy->{
      _id,
      userName,
      image
    },
    }
  }`;

  return query;
};

export const userLikedVideosQuery = (userId: string | string[]) => {
  const query = `*[_type == 'video' && '${userId}' in likes[]._ref ] | order(_createdAt desc) {
    _id,
     caption,
       video{
        asset->{
          _id,
          url
        }
      },
      userId,
    postedBy->{
      _id,
      userName,
      image
    },
 likes,

    comments[]{
      comment,
      _key,
      postedBy->{
      _id,
      userName,
      image
    },
    }
  }`;

  return query;
};

export const topicVideosQuery = (topic: string | string[]) => {
  const query = `*[_type == "video" && topic match '${topic}*'] {
    _id,
     caption,
       video{
        asset->{
          _id,
          url
        }
      },
      userId,
    postedBy->{
      _id,
      userName,
      image
    },
 likes,

    comments[]{
      comment,
      _key,
      postedBy->{
      _id,
      userName,
      image
    },
    }
  }`;

  return query;
};
