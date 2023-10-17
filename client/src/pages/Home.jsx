import { useQuery } from '@apollo/client';

import JobPosts from '../components/JobPosts';
import { QUERY_POSTS } from '../utils/queries';

const Home = () => {
    
    const { loading, data } = useQuery(QUERY_POSTS);
    const posts = data?.posts || [];
  
  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <JobPosts
              posts={posts}
              title="Here are the current Job Opportunities"
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;