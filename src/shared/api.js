import axios from 'axios';

const baseURL = 'http://localhost:4000';

export const toggleLike = async () => {
  try {
    const response = await axios.get(`${baseURL}/Likes/1`);
    const likeData = response.data;
    const updatedLike = {
      id: likeData.id,
      like_count: likeData.like_count + 1,
    };
    await axios.put(`${baseURL}/Likes/1`, updatedLike);
    return updatedLike;
  } catch (error) {
    console.error('에러 발생', error);
    throw error;
  }
};
