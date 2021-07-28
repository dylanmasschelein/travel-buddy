import "./ActiveBlogPost.scss";

interface ActivePost {
  activePost: object | null;
}

const ActiveBlogPost: React.FC<ActivePost> = ({ activePost }) => {
  return (
    <div className='active-post'>
      {/* <h1 className='active-post__title'>{activePost.title}</h1>
      <span className='active-post__publish'>{activePost.timestamp}</span>
      <h3 className='active-post__author'>{activePost.author}</h3>
      <p className='active-post__article'>{activePost.article}</p>
      <button>
        <span>{likes}</span>
      </button> */}
    </div>
  );
};

export default ActiveBlogPost;
