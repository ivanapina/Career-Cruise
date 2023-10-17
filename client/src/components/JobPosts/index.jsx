import { Link } from 'react-router-dom';

const JobPosts = ({ posts, title }) => {
  if (!posts.length) {
    return <h3>No Job Posts Yet</h3>;
  }

  return (
    <div>
      <h3 className="text-primary">{title}</h3>
      <div className="flex-row justify-space-between my-4">
        {posts &&
          posts.map((post) => (
            <div key={post._id} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0">
                  {post.name} <br />
                </h4>

                <Link
                  className="btn btn-block btn-squared btn-light text-dark"
                  to={`/profiles/${profile._id}`}
                >
                  View Profile
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default JobPosts;