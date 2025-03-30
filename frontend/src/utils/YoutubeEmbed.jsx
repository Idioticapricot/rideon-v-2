const YoutubeEmbed = ({ url }) => {
  return (
    <div className="video-responsive">
      <iframe
        width="560"
        height="315"
        src={url}
        title="YouTube video player"
        frameBorder="0"  // ✅ Fixed casing
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen  // ✅ Fixed casing
        referrerPolicy="strict-origin-when-cross-origin"  // ✅ Fixed casing
      ></iframe>
    </div>
  );
};

export default YoutubeEmbed;
